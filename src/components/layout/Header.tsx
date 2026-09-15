"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { MAIN_NAV_LINKS } from "@/data/navigationData";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="site-width header-inner">
      <Wordmark onClick={() => setOpen(false)} />
      <nav className="desktop-nav" aria-label="Main navigation">{MAIN_NAV_LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.name}</Link>)}</nav>
      <Link href="/contact" className="header-enquiry">Request an assessment <span aria-hidden="true">↗</span></Link>
      <button className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}>
      {MAIN_NAV_LINKS.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.name}<span aria-hidden="true">↗</span></Link>)}
    </nav>
  </header>;
}
