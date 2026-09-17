"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import type { AircraftScene, SceneAction } from "./aircraftScene";
import aircraftStill from "./aircraft-still.webp";
import styles from "./AircraftExplorer.module.css";

const CONTROLS: [SceneAction, string, string][] = [["left", "Rotate left", "↶"], ["right", "Rotate right", "↷"], ["top", "Toggle view from above", "Top"], ["reset", "Reset view", "Reset"]];
const subscribe = () => () => {};
// Data-saver connections keep the still image until the visitor asks for the 3D view; all other devices load it automatically.
function prefersStill() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

/**
 * Lets a visitor mark every damaged area of an aircraft. Choices are checkboxes submitted to
 * /contact as repeated `area` query parameters, so selection also works without JavaScript or WebGL.
 *
 * Both variants share one layout: the model, then the numbered area list. "page" places them side by
 * side with a heading, on the damage assessment page; "hero" stacks them in the narrower homepage column.
 */
export function AircraftExplorer({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const host = useRef<HTMLDivElement>(null);
  const markers = useRef<HTMLButtonElement[]>([]);
  const scene = useRef<AircraftScene | null>(null);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const stillPreferred = useSyncExternalStore(subscribe, prefersStill, () => false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "fallback">("idle");
  const [selected, setSelected] = useState<string[]>([]);
  const [attempt, setAttempt] = useState(0);
  const page = variant === "page";
  const deferred = stillPreferred && attempt === 0;
  const toggle = (zoneId: string) => {
    scene.current?.nudge();
    setSelected(current => current.includes(zoneId) ? current.filter(item => item !== zoneId) : [...current, zoneId]);
  };
  useEffect(() => {
    const element = host.current;
    if (!element || deferred) return;
    let cancelled = false;
    let instance: AircraftScene | null = null;
    let timeout: number | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      setStatus("loading");
      timeout = window.setTimeout(() => { if (!cancelled) setStatus("fallback"); }, 15000);
      import("./aircraftScene").then(({ mountAircraftScene }) => {
        if (cancelled) return;
        instance = mountAircraftScene(element, markers.current, () => setStatus("fallback"), { propeller: true });
        scene.current = instance;
        setStatus("ready");
      }).catch(() => { if (!cancelled) setStatus("fallback"); }).finally(() => window.clearTimeout(timeout));
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => { cancelled = true; window.clearTimeout(timeout); observer.disconnect(); instance?.dispose(); scene.current = null; };
  }, [attempt, deferred, page]);
  useEffect(() => { if (status === "ready") scene.current?.highlight(selected); }, [selected, status]);
  const choose = "Choose damaged areas from the list.";
  return (
    <form action="/contact" className={`${styles.explorer} ${page ? styles.page : styles.hero}`} aria-label="Aircraft damage areas">
      <input type="hidden" name="service" value="damage-assessment" />
      <div className={styles.viewport} ref={host} data-status={status}>
        {ASSESSMENT_ZONES.map((zone, index) => (
          <button type="button" key={zone.id} ref={element => { if (element) markers.current[index] = element; }} className={styles.marker} hidden={status !== "ready"} aria-label={`Select ${zone.label}`} aria-pressed={selected.includes(zone.id)} title={zone.label} onClick={() => toggle(zone.id)}><span>{index + 1}</span></button>
        ))}
        {status !== "ready" && <div className={styles.placeholder} role="status">
          <Image src={aircraftStill} alt="" className={styles.still} sizes="(max-width: 980px) 100vw, 60vw" loading={page ? "lazy" : "eager"} />
          <div className={styles.placeholderText}>
            {hydrated && deferred && <button type="button" className={styles.load} onClick={() => setAttempt(value => value + 1)}>View in 3D</button>}
            {status === "loading" && <p>Loading 3D view…</p>}
            {status === "fallback" && <><p>3D view unavailable. {choose}</p><button type="button" onClick={() => { setStatus("idle"); setAttempt(value => value + 1); }}>Retry 3D view</button></>}
            <noscript><p>The 3D view needs JavaScript. {choose}</p></noscript>
          </div>
        </div>}
        <div className={styles.overlay}>
          <p className={styles.caption}>Illustrative model<span> · drag to rotate</span></p>
          <div className={styles.controls} role="group" aria-label="View controls" hidden={status !== "ready"}>
            {CONTROLS.map(([action, label, text]) => <button type="button" key={action} aria-label={label} title={label} onClick={() => scene.current?.control(action)}>{text}</button>)}
          </div>
        </div>
      </div>
      <div className={styles.panel}>
        <p className="eyebrow">Where is the damage?</p>
        {page && <>
          <h2>Show us where the aircraft is damaged.</h2>
          <p className={styles.lead}>Select every affected area on the model or from the list. Your selection is added to your enquiry as a starting point.</p>
        </>}
        <fieldset className={styles.areas}>
          <legend className={styles.srOnly}>Damaged areas (select all that apply)</legend>
          {ASSESSMENT_ZONES.map((zone, index) => <label key={zone.id} className={styles.area}><input type="checkbox" name="area" value={zone.id} checked={selected.includes(zone.id)} onChange={() => toggle(zone.id)} /><span className={styles.number}>0{index + 1}</span><span>{zone.label}</span><span className={styles.indicator} aria-hidden="true" /></label>)}
        </fieldset>
        <div className={styles.actions}>
          <button type="submit" className="button button-light">Request an assessment <span aria-hidden="true">↗</span></button>
          {selected.length > 0 && <button type="button" className={styles.clear} onClick={() => setSelected([])}>Clear</button>}
        </div>
      </div>
    </form>
  );
}
