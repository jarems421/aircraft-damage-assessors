"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { MAIN_NAV_LINKS } from "@/data/navigationData";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white select-none">
      {/* Top Technical Metadata Bar */}
      <div className="hidden sm:block border-b border-slate-800/80 bg-slate-950/60 py-1.5 text-[11px] font-mono text-slate-400">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>TECHNICAL AVIATION ASSESSMENT</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">INCIDENT & DAMAGE EVALUATION</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Technical Enquiries & Assessment Requests</span>
                <span className="text-blue-400">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Company Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2"
            aria-label="Aircraft Damage Assessors Ltd Home"
          >
            <div className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center font-mono font-bold text-sm tracking-widest border border-blue-500 shrink-0">
              ADA
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-white font-sans leading-tight">
                AIRCRAFT DAMAGE ASSESSORS
              </span>
              <span className="block text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                TECHNICAL AVIATION SERVICES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 xl:px-3.5 py-2 text-sm font-medium tracking-tight transition-colors duration-150 relative whitespace-nowrap ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="hidden xl:inline-block ml-1.5 text-[10px] font-mono px-1.5 py-0.5 bg-blue-900 text-blue-200 border border-blue-700 uppercase whitespace-nowrap">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="font-semibold shadow-md tracking-normal"
            >
              Request an Assessment
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex text-xs font-semibold px-3.5 py-2 bg-blue-700 text-white hover:bg-blue-800"
            >
              Assessment
            </Link>
            <button
              type="button"
              className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Accessible Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 lg:hidden bg-slate-950/90 backdrop-blur-xs">
          <div className="flex flex-col h-[calc(100vh-5rem)] bg-slate-900 border-b border-slate-800 p-6 overflow-y-auto">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {MAIN_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 text-base font-medium tracking-tight border-b border-slate-800/60 ${
                      isActive
                        ? "text-blue-400 bg-slate-850 font-semibold"
                        : "text-slate-200 hover:text-white hover:bg-slate-850"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request an Assessment
              </Button>
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5"
                >
                  <span>Technical Enquiries & Contact</span>
                  <span className="text-blue-400">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
