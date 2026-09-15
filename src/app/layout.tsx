import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_CONFIG.name} | Specialist Aviation Damage Assessment`,
    template: `%s | ${COMPANY_CONFIG.name}`,
  },
  description:
    "Specialist aircraft damage assessment, repair-cost estimation, aircraft recovery coordination, and technical reporting for aircraft insurance companies, brokers, owners, and operators.",
  keywords: [
    "aircraft damage assessment",
    "aviation damage assessment",
    "aircraft repair assessment",
    "aircraft recovery",
    "pre-purchase aircraft inspection",
    "aircraft damage report",
  ],
  authors: [{ name: COMPANY_CONFIG.name }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${COMPANY_CONFIG.name} | Specialist Aviation Damage Assessment`,
    description:
      "Specialist aircraft damage assessment, repair-cost estimation, aircraft recovery coordination, and technical reporting for insurers, brokers, owners, and operators.",
    siteName: COMPANY_CONFIG.name,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
        <Header />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
