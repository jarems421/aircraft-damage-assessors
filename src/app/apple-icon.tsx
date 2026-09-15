import { ImageResponse } from "next/og";
import { BRAND } from "@/components/brand/brand";

// Temporary monogram home-screen icon. Replace with client branding when supplied.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.night, color: BRAND.paper, fontSize: 70, letterSpacing: 3 }}>{BRAND.monogram}</div>,
    size,
  );
}
