/**
 * BRAND ASSETS. The client has not supplied a logo, so this mark was designed for the site and is
 * deliberately simple: a monogram over a faint aircraft silhouette. Everything brand-related reads
 * from here, so a client-supplied logo can replace it in one place.
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
/** "dark" sits on light backgrounds, "light" on navy ones. */
export type MarkVariant = "dark" | "light";
export function markColours(variant: MarkVariant) {
  return variant === "light"
    ? { background: BRAND.paper, ink: BRAND.night }
    : { background: BRAND.night, ink: BRAND.paper };
}
/** Silhouette placed below the monogram so the wings never cross the letters. */
export const PLANE_TRANSFORM = "translate(32 47) rotate(-20) scale(0.125) translate(-160 -90)";
