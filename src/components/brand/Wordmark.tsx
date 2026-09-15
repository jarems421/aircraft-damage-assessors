import Link from "next/link";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { BRAND } from "./brand";

// Temporary text wordmark. Replace with client-supplied branding when available.
export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="wordmark" aria-label={`${COMPANY_CONFIG.name} home`} onClick={onClick}>
      <span className="wordmark-mark" aria-hidden="true">{BRAND.monogram}</span>
      <span className="wordmark-text">Aircraft Damage<br /><span>Assessors Ltd</span></span>
    </Link>
  );
}
