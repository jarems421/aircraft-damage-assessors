"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { MAIN_NAV_LINKS } from "@/data/navigationData";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap & ESC key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;

      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock scroll & restore/set focus
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        const first = drawerRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        first?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60 text-white select-none transition-all">
      {/* Main Navigation Bar */}
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Company Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl py-1.5 transition-transform active:scale-[0.99]"
            aria-label="Aircraft Damage Assessors Ltd Home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-mono font-bold text-sm tracking-wider rounded-xl border border-blue-400/30 shadow-md shrink-0">
              ADA
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-white font-sans leading-tight">
                Aircraft Damage Assessors
              </span>
              <span className="block text-[11px] font-sans text-slate-400 font-medium tracking-wide">
                Specialist Technical Services
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
                  className={`px-3.5 py-2 text-sm font-medium tracking-tight transition-all duration-150 rounded-lg relative whitespace-nowrap ${
                    isActive
                      ? "text-white font-semibold bg-slate-800/60 shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="hidden xl:inline-block ml-2 text-[10px] font-sans font-semibold px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full whitespace-nowrap">
                      {link.badge}
                    </span>
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
              className="font-semibold shadow-thock-primary tracking-normal"
            >
              Request an Assessment
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-500 transition-colors"
            >
              Assessment
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 top-20 z-40 lg:hidden bg-slate-950/90 backdrop-blur-xs"
        >
          <div className="flex flex-col h-[calc(100vh-5rem)] bg-slate-950/95 border-b border-slate-800/80 p-6 overflow-y-auto">
            <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
              {MAIN_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-4 py-3.5 text-base font-medium tracking-tight rounded-xl transition-colors ${
                      isActive
                        ? "text-blue-400 bg-slate-800/80 font-semibold"
                        : "text-slate-200 hover:text-white hover:bg-slate-800/40"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-sans font-semibold px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full text-center shadow-thock-primary font-semibold"
                onClick={closeMenu}
              >
                Request an Assessment
              </Button>
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={closeMenu}
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
