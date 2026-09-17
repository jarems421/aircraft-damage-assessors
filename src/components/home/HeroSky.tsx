"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { PLANE_PATH } from "@/components/brand/brand";

/**
 * Faint aircraft drifting behind the hero, all the same silhouette on the same heading: bottom left
 * to top right. Decoration only: aria-hidden, no pointer events, and it never animates on its own —
 * the planes fly in once on load and then move only as the visitor scrolls.
 *
 * Positions are fixed rather than random so the sky matches on the server and the client. `speed` is
 * the depth: larger values travel further per pixel scrolled, which reads as being nearer.
 */
const PLANES = [
  { x: 3, y: 16, size: 49, opacity: 0.16, speed: 0.22 },
  { x: 9, y: 54, size: 29, opacity: 0.12, speed: 0.38 },
  { x: 14, y: 82, size: 38, opacity: 0.1, speed: 0.3 },
  { x: 18, y: 28, size: 64, opacity: 0.13, speed: 0.15 },
  { x: 23, y: 66, size: 23, opacity: 0.15, speed: 0.48 },
  { x: 28, y: 11, size: 32, opacity: 0.11, speed: 0.34 },
  { x: 32, y: 44, size: 44, opacity: 0.09, speed: 0.2 },
  { x: 36, y: 90, size: 26, opacity: 0.14, speed: 0.42 },
  { x: 41, y: 24, size: 36, opacity: 0.12, speed: 0.28 },
  { x: 45, y: 61, size: 55, opacity: 0.1, speed: 0.17 },
  { x: 49, y: 8, size: 22, opacity: 0.16, speed: 0.5 },
  { x: 53, y: 77, size: 30, opacity: 0.12, speed: 0.36 },
  { x: 57, y: 37, size: 41, opacity: 0.1, speed: 0.24 },
  { x: 61, y: 88, size: 23, opacity: 0.15, speed: 0.46 },
  { x: 64, y: 19, size: 58, opacity: 0.11, speed: 0.16 },
  { x: 68, y: 58, size: 28, opacity: 0.13, speed: 0.4 },
  { x: 72, y: 33, size: 35, opacity: 0.1, speed: 0.26 },
  { x: 76, y: 72, size: 46, opacity: 0.12, speed: 0.21 },
  { x: 80, y: 13, size: 25, opacity: 0.15, speed: 0.44 },
  { x: 84, y: 50, size: 39, opacity: 0.11, speed: 0.3 },
  { x: 87, y: 85, size: 29, opacity: 0.13, speed: 0.37 },
  { x: 90, y: 30, size: 52, opacity: 0.1, speed: 0.18 },
  { x: 93, y: 64, size: 22, opacity: 0.16, speed: 0.52 },
  { x: 96, y: 45, size: 33, opacity: 0.12, speed: 0.32 },
  { x: 6, y: 38, size: 26, opacity: 0.14, speed: 0.43 },
  { x: 21, y: 95, size: 32, opacity: 0.1, speed: 0.27 },
  { x: 39, y: 70, size: 23, opacity: 0.14, speed: 0.47 },
  { x: 70, y: 96, size: 38, opacity: 0.1, speed: 0.23 },
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
          style={{ left: `${plane.x}%`, top: `${plane.y}%`, width: plane.size, opacity: plane.opacity, animationDelay: `${index * 40}ms`, "--speed": plane.speed } as CSSProperties}
        >
          <path d={PLANE_PATH} fill="#ffffff" />
        </svg>
      ))}
    </div>
  );
}
