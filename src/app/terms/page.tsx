import React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export const metadata = {
  title: "Terms of Service (Draft)",
  description: "Draft Terms of Service for Aircraft Damage Assessors Ltd pending legal review.",
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <Container size="narrow">
        <div className="space-y-8 font-sans text-slate-800">
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono">
            <strong>DRAFT WEBSITE CONTENT:</strong> These terms of service are a development draft prepared for website presentation purposes and remain subject to formal legal review and confirmation by {COMPANY_CONFIG.name}.
          </div>

          <div>
            <Badge variant="neutral" mono>
              LEGAL NOTICE
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2 font-sans">
              Terms of Service (Draft)
            </h1>
            <p className="text-xs font-mono text-slate-500 mt-2">
              Last Updated: Development Version | Subject to Client Legal Review
            </p>
          </div>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">1. Website Use</h2>
            <p>
              This website is operated by {COMPANY_CONFIG.name}. By accessing or using this website, you acknowledge that all content is provided for general informational purposes relating to technical aviation damage assessments.
            </p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">2. Technical Assessments & Engagement</h2>
            <p>
              Submission of an assessment inquiry or request through this website does not automatically constitute a binding contract or commitment to perform an assessment. Official technical surveys, reports, and third-party AMO arrangements are governed by specific engagement agreements issued directly to clients.
            </p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">3. Regulatory Status</h2>
            <p>
              Aircraft Damage Assessors Ltd provides specialist technical damage assessment services. Aircraft Damage Assessors Ltd is not a government accident investigation authority (such as the AAIB or NTSB), statutory regulator, or official law-enforcement agency.
            </p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">4. Applicable Law</h2>
            <p>
              Formal contract terms and governing law details will be specified within individual written engagement agreements.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
