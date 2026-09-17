import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { LEGAL_LINKS, MAIN_NAV_LINKS } from "@/data/navigationData";
export function Footer() {
  return <footer className="site-footer"><div className="site-width">
    <div className="footer-main">
      <Wordmark />
      <div className="footer-about"><p>{COMPANY_CONFIG.descriptor}</p>{COMPANY_CONFIG.serviceRegion && <p>{COMPANY_CONFIG.serviceRegion}</p>}</div>
      <div className="footer-contact">{COMPANY_CONFIG.email && <a href={`mailto:${COMPANY_CONFIG.email}`}>{COMPANY_CONFIG.email}</a>}{COMPANY_CONFIG.telephone && <a href={`tel:${COMPANY_CONFIG.telephone}`}>{COMPANY_CONFIG.telephoneDisplay ?? COMPANY_CONFIG.telephone}</a>}{COMPANY_CONFIG.whatsapp && <a href={`https://wa.me/${COMPANY_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}</div>
      <nav aria-label="Footer navigation">{MAIN_NAV_LINKS.map(link => <Link key={link.href} href={link.href}>{link.name}</Link>)}</nav>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {COMPANY_CONFIG.name}</span><nav aria-label="Legal pages">{LEGAL_LINKS.map(link => <Link key={link.href} href={link.href}>{link.name}</Link>)}</nav></div>
  </div></footer>;
}
