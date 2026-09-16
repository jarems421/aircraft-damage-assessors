import { ImageResponse } from "next/og";
import { markDataUri } from "@/components/brand/markAsset";

// Home-screen icon: the full mark. iOS applies its own rounding, so the square is drawn flat.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={markDataUri({ radius: 0 })} width={180} height={180} alt="" />
    </div>,
    size,
  );
}
