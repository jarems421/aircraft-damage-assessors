import { renderShareImage } from "@/components/brand/shareImage";

export const alt = "About Aircraft Damage Assessors Ltd";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderShareImage("About the company");
}
