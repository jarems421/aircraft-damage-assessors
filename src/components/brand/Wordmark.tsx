import Link from "next/link";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { LogoMark } from "./LogoMark";

// Site logo lockup: the mark beside the company name. Replace with client branding when supplied.
export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="wordmark" aria-label={`${COMPANY_CONFIG.name} home`} onClick={onClick}>
      <LogoMark size={42} />
      <span className="wordmark-text">Aircraft Damage<br /><span>Assessors Ltd</span></span>
    </Link>
  );
}
