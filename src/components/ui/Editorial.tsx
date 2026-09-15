import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { COMPANY_CONFIG } from "@/data/companyConfig";
export function pageMetadata(title: string, description: string): Metadata {
  return { title, description, openGraph: { title: `${title} | ${COMPANY_CONFIG.name}`, description, siteName: COMPANY_CONFIG.name, locale: "en_GB", type: "website" } };
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="text-link" href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
export function PageIntro({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <section className="page-intro"><div className="site-width"><p className="eyebrow">{label}</p><h1>{title}</h1><div className="intro-copy">{children}</div></div></section>;
}
export function EnquiryCTA() {
  return <section className="enquiry-cta"><div className="site-width"><div><p className="eyebrow">Your aircraft. Your enquiry.</p><h2>Let’s discuss the details.</h2></div><Link href="/contact" className="button button-light">Request an assessment <span aria-hidden="true">↗</span></Link></div></section>;
}
export function LegalPlaceholder({ title, description }: { title: string; description: string }) {
  return <><PageIntro label="Website information" title={title}><p>{description}</p></PageIntro><section className="section-space site-width legal-copy"><h2>Awaiting approved content</h2><p>This page is a placeholder for client review. The final {title.toLowerCase()} will be published once the relevant details and wording have been confirmed.</p><TextLink href="/">Return to the homepage</TextLink></section></>;
}
