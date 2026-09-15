import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { LEGAL_LINKS, MAIN_NAV_LINKS } from "@/data/navigationData";
export function Footer() {
  return <footer className="site-footer"><div className="site-width">
    <div className="footer-main"><Wordmark /><p>{COMPANY_CONFIG.descriptor}</p><nav aria-label="Footer navigation">{MAIN_NAV_LINKS.map(link => <Link key={link.href} href={link.href}>{link.name}</Link>)}</nav></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {COMPANY_CONFIG.name}</span><nav aria-label="Legal pages">{LEGAL_LINKS.map(link => <Link key={link.href} href={link.href}>{link.name}</Link>)}</nav></div>
  </div></footer>;
}
