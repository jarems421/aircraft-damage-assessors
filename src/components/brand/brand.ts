/**
 * BRAND ASSETS. The client has not supplied a logo, so this mark was designed for the site:
 * an aircraft outline held inside inspection brackets — assessment, not decoration.
 * Everything brand-related reads from here, so a client logo can replace it in one place.
 * Downloadable versions live in public/brand/.
 */
export const BRAND = {
  monogram: "ADA",
  night: "#101e28",
  paper: "#e8eeeb",
  accent: "#93afc1",
  muted: "#a8bac5",
};
/** Top view of a light aircraft, in a 320x180 box. The same outline is used across the site. */
export const PLANE_PATH = "M157 18 Q160 8 163 18 L174 80 293 103 293 116 173 104 167 147 202 159 202 167 160 161 118 167 118 159 153 147 147 104 27 116 27 103 146 80Z";
/** Mark geometry, all in a 64x64 box. */
export const MARK = {
  radius: 12,
  /** Aircraft climbing to the right, drawn as a fine outline. */
  planeTransform: "translate(32 32) rotate(-45) scale(0.14) translate(-160 -90)",
  /** Stroke width in the aircraft's own path units, so it scales with the transform. */
  planeStroke: 5.5,
  planeFillOpacity: 0.14,
  /** Opposing corner brackets: the aircraft under inspection. */
  brackets: ["M9.5 19 V13.5 A4 4 0 0 1 13.5 9.5 H19", "M54.5 45 V50.5 A4 4 0 0 1 50.5 54.5 H45"],
  bracketStroke: 1.4,
  bracketOpacity: 0.85,
};
/** "dark" sits on light backgrounds, "light" on navy ones. */
export type MarkVariant = "dark" | "light";
export function markColours(variant: MarkVariant) {
  return variant === "light"
    ? { background: BRAND.paper, ink: BRAND.night, bracket: "#4a6a7d" }
    : { background: BRAND.night, ink: BRAND.paper, bracket: BRAND.accent };
}
