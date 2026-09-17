"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { PLANE_PATH } from "@/components/brand/brand";

/**
 * Faint aircraft drifting behind the hero. Decoration only: aria-hidden, no pointer events, and it
 * never animates on its own — the planes fade in once and then move only as the visitor scrolls.
 * Positions are fixed rather than random so the sky is identical on the server and the client.
 */
const PLANES = [
  { x: 4, y: 14, size: 38, tilt: -16, opacity: 0.16, speed: 0.22 },
  { x: 17, y: 62, size: 22, tilt: 8, opacity: 0.11, speed: 0.36 },
  { x: 26, y: 26, size: 50, tilt: -26, opacity: 0.13, speed: 0.14 },
  { x: 33, y: 82, size: 28, tilt: 14, opacity: 0.1, speed: 0.3 },
  { x: 44, y: 9, size: 20, tilt: -8, opacity: 0.14, speed: 0.4 },
  { x: 52, y: 47, size: 32, tilt: 20, opacity: 0.09, speed: 0.18 },
  { x: 61, y: 74, size: 24, tilt: -14, opacity: 0.13, speed: 0.34 },
  { x: 69, y: 18, size: 42, tilt: 10, opacity: 0.11, speed: 0.16 },
  { x: 76, y: 56, size: 18, tilt: -22, opacity: 0.16, speed: 0.44 },
  { x: 83, y: 88, size: 30, tilt: 6, opacity: 0.1, speed: 0.26 },
  { x: 89, y: 34, size: 22, tilt: -10, opacity: 0.14, speed: 0.38 },
  { x: 94, y: 68, size: 40, tilt: 18, opacity: 0.09, speed: 0.2 },
  { x: 12, y: 40, size: 18, tilt: 24, opacity: 0.15, speed: 0.46 },
  { x: 58, y: 92, size: 21, tilt: -18, opacity: 0.12, speed: 0.32 },
  { x: 38, y: 58, size: 16, tilt: 12, opacity: 0.12, speed: 0.5 },
  { x: 8, y: 86, size: 24, tilt: -6, opacity: 0.1, speed: 0.28 },
  { x: 71, y: 42, size: 17, tilt: 28, opacity: 0.13, speed: 0.42 },
  { x: 47, y: 30, size: 14, tilt: -30, opacity: 0.11, speed: 0.52 },
];

export function HeroSky() {
  const sky = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = sky.current;
    if (!element) return;
    element.dataset.ready = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    // One custom property per frame; each plane multiplies it by its own depth in CSS.
    const apply = () => { frame = 0; element.style.setProperty("--sky-shift", `${-window.scrollY}px`); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);
  return (
    <div className="hero-sky" ref={sky} aria-hidden="true">
      {PLANES.map((plane, index) => (
        <svg
          key={`${plane.x}-${plane.y}`}
          viewBox="0 0 320 180"
          style={{ left: `${plane.x}%`, top: `${plane.y}%`, width: plane.size, opacity: plane.opacity, animationDelay: `${index * 60}ms`, "--speed": plane.speed, "--tilt": `${plane.tilt}deg` } as CSSProperties}
        >
          <path d={PLANE_PATH} fill="#ffffff" />
        </svg>
      ))}
    </div>
  );
}
