import { ImageResponse } from "next/og";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { BRAND } from "./brand";

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

/** Branded link-preview image. Text only uses confirmed company information. */
export function renderShareImage(title: string) {
  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: BRAND.night, color: "#eef2ee" }}>
        <svg width="620" height="349" viewBox="0 0 320 180" style={{ position: "absolute", right: 40, top: 150 }}>
          <path fill="none" stroke="#35505f" strokeWidth="1" d="M157 18 Q160 8 163 18 L174 80 293 103 293 116 173 104 167 147 202 159 202 167 160 161 118 167 118 159 153 147 147 104 27 116 27 103 146 80Z" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.paper, color: BRAND.night, fontSize: 22, letterSpacing: 1 }}>{BRAND.monogram}</div>
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
