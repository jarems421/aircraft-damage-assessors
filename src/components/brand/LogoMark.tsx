import { MARK, PLANE_PATH, markColours, type MarkVariant } from "./brand";

/** The company mark: an aircraft outline held in inspection brackets. Decorative unless given a title. */
export function LogoMark({ size = 42, variant = "dark", title }: { size?: number; variant?: MarkVariant; title?: string }) {
  const { background, ink, bracket } = markColours(variant);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" focusable="false" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {title && <title>{title}</title>}
      <rect width="64" height="64" rx={MARK.radius} fill={background} />
      {MARK.brackets.map(path => <path key={path} d={path} fill="none" stroke={bracket} strokeWidth={MARK.bracketStroke} strokeLinecap="round" opacity={MARK.bracketOpacity} />)}
      <g transform={MARK.planeTransform}>
        <path d={PLANE_PATH} fill={ink} fillOpacity={MARK.planeFillOpacity} stroke={ink} strokeWidth={MARK.planeStroke} strokeLinejoin="round" />
      </g>
    </svg>
  );
}
