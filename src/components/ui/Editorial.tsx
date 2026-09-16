import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { DRAFT_NOTICE, type LegalDoc } from "@/data/legalContent";
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
/** Renders a legal draft from src/data/legalContent.ts. The draft notice stays until the wording is approved. */
export function LegalDocument({ document }: { document: LegalDoc }) {
  return <><PageIntro label="Website information" title={document.title}><p>{document.intro}</p></PageIntro>
    <section className="site-width section-space legal-doc">
      <p className="pending-note">{DRAFT_NOTICE}</p>
      {document.sections.map(section => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
      </section>)}
      <p className="legal-updated">Last updated {document.updated}.</p>
    </section></>;
}
