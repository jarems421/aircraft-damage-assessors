import { BRAND, MARK, PLANE_PATH, markColours, type MarkVariant } from "./brand";

/**
 * The mark as a data URI, for generated images (favicon, Apple icon, share images).
 * Server-only: these use Buffer.
 */
const encode = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

export function markDataUri({ radius = MARK.radius, variant = "dark" as MarkVariant, brackets = true } = {}) {
  const { background, ink, bracket } = markColours(variant);
  const bracketPaths = brackets ? MARK.brackets.map(path => `<path d="${path}" fill="none" stroke="${bracket}" stroke-width="${MARK.bracketStroke}" stroke-linecap="round" opacity="${MARK.bracketOpacity}"/>`).join("") : "";
  return encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="${background}"/>${bracketPaths}<g transform="${MARK.planeTransform}"><path d="${PLANE_PATH}" fill="${ink}" fill-opacity="${MARK.planeFillOpacity}" stroke="${ink}" stroke-width="${MARK.planeStroke}" stroke-linejoin="round"/></g></svg>`);
}
/** Favicon: a solid aircraft, because a fine outline disappears at 16px. */
export function faviconDataUri() {
  return encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="${BRAND.night}"/><g transform="translate(32 32) rotate(-45) scale(0.165) translate(-160 -90)"><path d="${PLANE_PATH}" fill="${BRAND.paper}"/></g></svg>`);
}
