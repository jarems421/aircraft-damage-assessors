import { ImageResponse } from "next/og";
import { BRAND } from "@/components/brand/brand";

// Temporary monogram favicon. Replace with client branding when supplied.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, background: BRAND.night, color: BRAND.paper, fontSize: 15, letterSpacing: 0.5 }}>{BRAND.monogram}</div>,
    size,
  );
}
