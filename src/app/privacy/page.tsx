import React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export const metadata = {
  title: "Privacy Policy (Draft)",
  description: "Draft Privacy Policy for Aircraft Damage Assessors Ltd pending legal review.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <Container size="narrow">
        <div className="space-y-8 font-sans text-slate-800">
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono">
            <strong>DRAFT WEBSITE CONTENT:</strong> This privacy policy is a development draft prepared for website presentation purposes and remains subject to formal legal review and confirmation by {COMPANY_CONFIG.name}.
          </div>

          <div>
            <Badge variant="neutral" mono>
              LEGAL NOTICE
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2 font-sans">
              Privacy Policy (Draft)
            </h1>
            <p className="text-xs font-mono text-slate-500 mt-2">
              Last Updated: Development Version | Subject to Client Legal Review
            </p>
          </div>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">1. Data Controller Information</h2>
            <p>
              The data controller for information processed through this website is {COMPANY_CONFIG.name}, with registered office details pending confirmation: {COMPANY_CONFIG.officeLocation}.
            </p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
            <p>
              When you use our assessment request form or contact us, we may collect technical and identification details necessary to process your inquiry:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details: Name, company name, business email address, telephone number.</li>
              <li>Aircraft details: Aircraft type, aircraft registration, aircraft location.</li>
              <li>Incident information: Date of incident, description of incident and damage, insurance or broker references.</li>
              <li>Supporting files: Photographs, documents, or survey files submitted via our upload portal.</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">3. Purpose of Processing</h2>
            <p>
              Information supplied is processed strictly for the purpose of scoping, preparing, conducting, and delivering aircraft damage assessments and technical reports, or responding to direct service inquiries.
            </p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">4. Contact & Inquiries</h2>
            <p>
              For data protection questions, please contact our designated privacy representative at {COMPANY_CONFIG.email}.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
