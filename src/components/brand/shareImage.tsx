import { ImageResponse } from "next/og";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { BRAND, PLANE_PATH } from "./brand";
import { markBackgroundDataUri } from "./markAsset";

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

/** Branded link-preview image. Text only uses confirmed company information. */
export function renderShareImage(title: string) {
  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: BRAND.night, color: "#eef2ee" }}>
        <svg width="620" height="349" viewBox="0 0 320 180" style={{ position: "absolute", right: 40, top: 150 }}>
          <path fill="none" stroke="#35505f" strokeWidth="1" d={PLANE_PATH} />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ position: "relative", width: 68, height: 68, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 13 }}>
            {/* Light variant: a navy mark would vanish against this navy background. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markBackgroundDataUri({ radius: 9, variant: "light" })} width={68} height={68} alt="" style={{ position: "absolute", top: 0, left: 0 }} />
            <span style={{ color: BRAND.night, fontSize: 23, fontWeight: 700, letterSpacing: -0.4 }}>{BRAND.monogram}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 28, lineHeight: 1.2 }}>
            <span>Aircraft Damage</span>
            <span style={{ color: BRAND.accent }}>Assessors Ltd</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ fontSize: 74, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 820 }}>{title}</div>
          <div style={{ width: 80, height: 1, background: BRAND.accent }} />
          <div style={{ fontSize: 26, color: BRAND.muted }}>{COMPANY_CONFIG.descriptor}</div>
        </div>
      </div>
    ),
    SHARE_IMAGE_SIZE,
  );
}
