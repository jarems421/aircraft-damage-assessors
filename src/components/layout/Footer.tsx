import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";
import { MAIN_NAV_LINKS, LEGAL_LINKS } from "@/data/navigationData";
import { ShieldAlert } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 font-sans text-sm">
      {/* Primary Footer Content */}
      <div className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Company Profile (5 cols wide on desktop) */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-mono font-bold text-xs tracking-wider rounded-xl border border-blue-400/30 shadow-sm">
                  ADA
                </div>
                <span className="font-bold text-base text-white tracking-tight">
                  {COMPANY_CONFIG.name}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                {COMPANY_CONFIG.descriptor} Technical damage assessments, repair-cost estimations, and clear reporting for insurers, brokers, owners, and operators.
              </p>
              <div className="text-xs text-slate-400">
                <Link
                  href="/contact"
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <span>Submit an assessment enquiry</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Column 2: Confirmed Services (3 cols wide) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Confirmed Services
              </h3>
              <ul className="space-y-2.5 text-sm">
                {SERVICES_DATA.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.id === "damage-assessment" ? "/damage-assessment" : `/services#${service.slug}`}
                      className="text-slate-400 hover:text-white transition-colors duration-150"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Navigation (2 cols wide) */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm">
                {MAIN_NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Assessment Action (2 cols wide) */}
            <div className="lg:col-span-2 space-y-3.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Enquiries
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Submit aircraft incident particulars for review by technical personnel.
              </p>
              <Link
                href="/contact"
                className="inline-block text-xs font-semibold px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-thock-primary"
              >
                Request an Assessment →
              </Link>
            </div>
          </div>

          {/* Explicit Regulatory & Statutory Authority Disclaimer */}
          <div className="mt-14 pt-8 border-t border-slate-800/80">
            <div className="flex items-start gap-3.5 p-5 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 font-semibold">Regulatory Position Statement: </strong>
                Aircraft Damage Assessors Ltd is a commercial company providing technical aviation damage assessments and related technical services. Aircraft Damage Assessors Ltd is not a government accident investigation authority (such as the AAIB or NTSB), statutory regulator, or official law-enforcement body. Investigations into potential cause are strictly conducted within the company&apos;s technical assessment scope.
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sub-footer: Legal & Copyright */}
      <div className="border-t border-slate-900 py-6 bg-black/40 text-xs text-slate-400">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {currentYear} {COMPANY_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-slate-300 transition-colors"
                >
                  {link.name} (Draft)
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
