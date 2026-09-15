export interface NavLinkItem {
  name: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Damage Assessment", href: "/damage-assessment", badge: "Core Service" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const LEGAL_LINKS: NavLinkItem[] = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];
