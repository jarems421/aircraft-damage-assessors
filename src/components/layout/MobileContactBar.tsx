import Link from "next/link";
import { COMPANY_CONFIG } from "@/data/companyConfig";

/**
 * Phone-width quick contact. An operator with a damaged aircraft should be able to call, message or
 * enquire from anywhere on the site without scrolling to the footer. Hidden above 600px, where the
 * header already carries the enquiry link.
 */
export function MobileContactBar() {
  const { telephone, telephoneDisplay, whatsapp } = COMPANY_CONFIG;
  return (
    <nav className="mobile-contact-bar" aria-label="Quick contact">
      {telephone && <a href={`tel:${telephone}`} aria-label={`Call ${telephoneDisplay ?? telephone}`}>Call</a>}
      {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
      <Link href="/contact" className="bar-enquire">Request an assessment</Link>
    </nav>
  );
}
