import { ImageResponse } from "next/og";
import { BRAND } from "@/components/brand/brand";
import { markBackgroundDataUri } from "@/components/brand/markAsset";

// Home-screen icon: the full mark. iOS applies its own rounding, so the square is drawn flat.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 38 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={markBackgroundDataUri({ radius: 0, planeOpacity: 0.26 })} width={180} height={180} alt="" style={{ position: "absolute", top: 0, left: 0 }} />
      <span style={{ color: BRAND.paper, fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{BRAND.monogram}</span>
    </div>,
    size,
  );
}
