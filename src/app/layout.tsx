import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { COMPANY_CONFIG, SEARCH_INDEXING_ENABLED, SITE_URL } from "@/data/companyConfig";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: { default: COMPANY_CONFIG.name, template: `%s | ${COMPANY_CONFIG.name}` },
  description: COMPANY_CONFIG.descriptor,
  robots: SEARCH_INDEXING_ENABLED ? { index: true, follow: true } : { index: false, follow: false },
  // Each page declares itself canonical on the custom domain, so copies served from deployment URLs
  // consolidate onto it rather than competing with it.
  alternates: { canonical: "./" },
  openGraph: { title: COMPANY_CONFIG.name, description: COMPANY_CONFIG.descriptor, siteName: COMPANY_CONFIG.name, locale: "en_GB", type: "website" },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#101e28" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}
