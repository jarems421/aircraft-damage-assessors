import { BRAND, PLANE_PATH, PLANE_TRANSFORM, markColours, type MarkVariant } from "./brand";

/** The company mark: monogram above a faint aircraft silhouette. Decorative unless given a title. */
export function LogoMark({ size = 42, variant = "dark", title }: { size?: number; variant?: MarkVariant; title?: string }) {
  const { background, ink } = markColours(variant);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" focusable="false" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {title && <title>{title}</title>}
      <rect width="64" height="64" rx="8" fill={background} />
      <g transform={PLANE_TRANSFORM}>
        <path d={PLANE_PATH} fill={ink} opacity="0.22" />
      </g>
      <text x="32" y="35" textAnchor="middle" fill={ink} fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="21" fontWeight="700" letterSpacing="-0.3">{BRAND.monogram}</text>
    </svg>
  );
}
