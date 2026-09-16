import { BRAND, PLANE_PATH, PLANE_TRANSFORM, markColours, type MarkVariant } from "./brand";

/**
 * Mark backgrounds as data URIs, for generated images (favicon, Apple icon, share images) where the
 * letters are drawn as text instead. Server-only: these use Buffer.
 */
const encode = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

/** The square and silhouette, without the monogram. */
export function markBackgroundDataUri({ radius = 8, variant = "dark" as MarkVariant, planeOpacity = 0.22 } = {}) {
  const { background, ink } = markColours(variant);
  return encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="${background}"/><g transform="${PLANE_TRANSFORM}"><path d="${PLANE_PATH}" fill="${ink}" opacity="${planeOpacity}"/></g></svg>`);
}
/** Favicon: the aircraft alone, at full contrast. Three letters turn to mush at 16px; this does not. */
export function faviconDataUri() {
  return encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="${BRAND.night}"/><g transform="translate(32 32) rotate(-45) scale(0.165) translate(-160 -90)"><path d="${PLANE_PATH}" fill="${BRAND.paper}"/></g></svg>`);
}
