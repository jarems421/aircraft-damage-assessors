import React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export const metadata = {
  title: "Cookie Policy (Draft)",
  description: "Draft Cookie Policy for Aircraft Damage Assessors Ltd pending legal review.",
};

export default function CookiesPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <Container size="narrow">
        <div className="space-y-8 font-sans text-slate-800">
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono">
            <strong>DRAFT WEBSITE CONTENT:</strong> This cookie policy is a development draft prepared for website presentation purposes and remains subject to formal legal review and confirmation by {COMPANY_CONFIG.name}.
          </div>

          <div>
            <Badge variant="neutral" mono>
              LEGAL NOTICE
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2 font-sans">
              Cookie Policy (Draft)
            </h1>
            <p className="text-xs font-mono text-slate-500 mt-2">
              Last Updated: Development Version | Subject to Client Legal Review
            </p>
          </div>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that websites place on your device as you browse. They are processed and stored by your web browser and serve essential functions such as maintaining navigation session states.
            </p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">2. Cookies Used on This Website</h2>
            <p>
              This website currently utilizes strictly essential session cookies required for core routing, navigation, and security. No third-party behavioral advertising or profiling trackers are deployed in this development environment.
            </p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">3. Inquiries</h2>
            <p>
              If you have any questions regarding our use of cookies, please contact us via our online assessment enquiry form.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
