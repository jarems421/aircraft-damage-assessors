"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import type { AircraftScene, SceneAction } from "./aircraftScene";
import aircraftStill from "./aircraft-still.webp";
import styles from "./AircraftExplorer.module.css";

const CONTROLS: [SceneAction, string, string][] = [["left", "Rotate left", "↶"], ["right", "Rotate right", "↷"], ["top", "Toggle view from above", "Top"], ["reset", "Reset view", "Reset"]];
const subscribe = () => () => {};
// Small screens and data-saver connections keep the still image until the visitor asks for the 3D view.
function prefersStill() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia("(max-width: 600px)").matches || connection?.saveData === true;
}

// Lets a visitor mark every damaged area of an aircraft. Choices are checkboxes submitted to
// /contact as repeated `area` query parameters, so selection also works without JavaScript or WebGL.
export function AircraftExplorer({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const id = useId();
  const host = useRef<HTMLDivElement>(null);
  const markers = useRef<HTMLButtonElement[]>([]);
  const scene = useRef<AircraftScene | null>(null);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const stillPreferred = useSyncExternalStore(subscribe, prefersStill, () => false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "fallback">("idle");
  const [selected, setSelected] = useState<string[]>([]);
  const [attempt, setAttempt] = useState(0);
  const full = variant === "full";
  const deferred = stillPreferred && attempt === 0;
  const toggle = (zoneId: string) => setSelected(current => current.includes(zoneId) ? current.filter(item => item !== zoneId) : [...current, zoneId]);
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
        instance = mountAircraftScene(element, markers.current, () => setStatus("fallback"));
        scene.current = instance;
        setStatus("ready");
      }).catch(() => { if (!cancelled) setStatus("fallback"); }).finally(() => window.clearTimeout(timeout));
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => { cancelled = true; window.clearTimeout(timeout); observer.disconnect(); instance?.dispose(); scene.current = null; };
  }, [attempt, deferred]);
  useEffect(() => { if (status === "ready") scene.current?.highlight(selected); }, [selected, status]);
  const choose = full ? "Choose damaged areas from the list." : "Choose damaged areas below.";
  const count = selected.length;
  const summary = count === 0 ? "Select all that apply" : ASSESSMENT_ZONES.filter(zone => selected.includes(zone.id)).map(zone => full ? zone.label : zone.shortLabel).join(", ");
  const clear = count > 0 && <button type="button" className={styles.clear} onClick={() => setSelected([])}>Clear</button>;
  return (
    <form action="/contact" className={`${styles.explorer} ${full ? styles.full : ""}`} aria-label="Aircraft damage areas">
      <input type="hidden" name="service" value="damage-assessment" />
      <div className={styles.viewport} ref={host} data-status={status}>
        {ASSESSMENT_ZONES.map((zone, index) => (
          <button type="button" key={zone.id} ref={element => { if (element) markers.current[index] = element; }} className={styles.marker} hidden={status !== "ready"} aria-label={`Select ${zone.label}`} aria-pressed={selected.includes(zone.id)} title={zone.label} onClick={() => toggle(zone.id)}><span>{index + 1}</span></button>
        ))}
        {status !== "ready" && <div className={styles.placeholder} role="status">
          <Image src={aircraftStill} alt="" className={styles.still} sizes="(max-width: 980px) 100vw, 60vw" loading={full ? "lazy" : "eager"} />
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
      {full ? (
        <div className={styles.panel}>
          <p className="eyebrow">Where is the damage?</p>
          <h2>Show us where the aircraft is damaged.</h2>
          <p className={styles.lead}>Select every affected area on the model or from the list. Your selection is added to your enquiry as a starting point.</p>
          <fieldset className={styles.areas}>
            <legend className={styles.srOnly}>Damaged areas (select all that apply)</legend>
            {ASSESSMENT_ZONES.map((zone, index) => <label key={zone.id} className={styles.area}><input type="checkbox" name="area" value={zone.id} checked={selected.includes(zone.id)} onChange={() => toggle(zone.id)} /><span className={styles.number}>0{index + 1}</span><span>{zone.label}</span><span className={styles.indicator} aria-hidden="true" /></label>)}
          </fieldset>
          <div className={styles.actions}>
            <button type="submit" className="button button-light">Request an assessment <span aria-hidden="true">↗</span></button>
            {clear}
          </div>
        </div>
      ) : (
        <div className={styles.bar}>
          <div className={styles.toggleGroup} role="group" aria-labelledby={`${id}-areas`}>
            <span id={`${id}-areas`} className={styles.groupLabel}>Damage areas</span>
            {ASSESSMENT_ZONES.map((zone, index) => <label key={zone.id} className={styles.toggle}><input type="checkbox" name="area" value={zone.id} aria-label={zone.label} checked={selected.includes(zone.id)} onChange={() => toggle(zone.id)} /><span className={styles.number}>{index + 1}</span>{zone.shortLabel}</label>)}
          </div>
          <div className={styles.barFoot}>
            <p className={styles.summary} aria-live="polite">{hydrated ? summary : "Select all that apply"}{clear}</p>
            <button type="submit" className={styles.submit}>{count === 0 ? "Start an enquiry" : count === 1 ? "Enquire about this area" : "Enquire about these areas"} <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      )}
    </form>
  );
}
