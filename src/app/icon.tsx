import { ImageResponse } from "next/og";
import { faviconDataUri } from "@/components/brand/markAsset";

// Favicon: the aircraft silhouette alone, which stays readable at 16px where a monogram would not.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={faviconDataUri()} width={64} height={64} alt="" />
    </div>,
    size,
  );
}
