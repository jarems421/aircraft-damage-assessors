import { renderShareImage } from "@/components/brand/shareImage";

export const alt = "Aircraft Damage Assessors Ltd — aircraft damage assessment and related aviation technical services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderShareImage("Aircraft damage. A clearer picture.");
}
