import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { CheckCircle2, Info } from "lucide-react";

export const metadata = {
  title: "About | Specialist Aircraft Damage Assessors",
  description:
    "Learn about Aircraft Damage Assessors Ltd, our specialist technical services, evidence-based methodology, and engineering integrity.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-14 pb-16 sm:pt-20 sm:pb-20 border-b border-slate-800 bg-aviation-grid-dark">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="primary" mono>
              COMPANY BACKGROUND
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              About Aircraft Damage Assessors Ltd
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {COMPANY_CONFIG.descriptor}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Philosophy & Company Purpose */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="neutral" mono>
                OUR PURPOSE
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                Evidence-Based Technical Clarity in Aviation Damage Scenarios
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-sans">
                When an aircraft is involved in an incident or accident, the subsequent decisions made by underwriters, insurance brokers, aircraft owners, and maintenance organisations have significant technical and financial consequences.
              </p>

              <p className="text-base text-slate-700 leading-relaxed font-sans">
                Aircraft Damage Assessors Ltd provides evidence-grounded aircraft damage assessments. We assess damaged aircraft, document affected components, estimate costs of required parts and repair labour where repairable, evaluate repairability, and deliver detailed technical reports.
              </p>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold mb-3">
                  Core Operational Commitments
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Factual Precision:</strong> Every finding in our reports is grounded in observable physical evidence and technical data.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Cost Estimation:</strong> Identification of parts required alongside estimated parts and labour costs where the aircraft is believed to be repairable.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Constructive Liaison:</strong> Coordinating with third-party Approved Maintenance Organisations (AMOs) when required repair capabilities are missing locally.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirmed Company Profile Card */}
            <div className="lg:col-span-5">
              <Card variant="default" className="bg-slate-50 border-slate-200 p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-700" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
                    Company Overview
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase">REGISTERED ENTITY</span>
                    <span className="text-slate-900 font-semibold">{COMPANY_CONFIG.name}</span>
                  </div>

                  <div className="p-3 bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase">PRIMARY SERVICE</span>
                    <span className="text-slate-900 font-semibold">Comprehensive Aircraft Damage Assessment</span>
                  </div>

                  <div className="p-3 bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase">TECHNICAL SERVICES</span>
                    <span className="text-slate-800 leading-snug block">
                      Damage Assessment, Pre-Purchase Inspections, Recovery Scoping, Third-Party Repair Coordination, Modification Applications
                    </span>
                  </div>

                  <div className="p-3 bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase">CLIENT AUDIENCES</span>
                    <span className="text-slate-800">
                      Aircraft Insurers, Insurance Brokers, Aircraft Owners, Aircraft Operators
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button href="/contact" variant="outline" size="sm" className="w-full">
                    Enquire Directly →
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Regulatory Stance Reminder */}
      <section className="py-12 bg-white border-b border-slate-200">
        <Container size="narrow">
          <div className="p-6 bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
            <div className="text-slate-900 font-bold uppercase font-mono">
              Regulatory Scope Disclaimer
            </div>
            <div>
              Aircraft Damage Assessors Ltd is a technical services company providing specialist damage assessments. We are not an official government accident investigation authority (such as the AAIB or NTSB), statutory regulator, or law-enforcement body.
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-900 text-white">
        <Container size="narrow">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">
              Discuss an Aircraft Assessment
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Our team is available to discuss your requirements, provide inspection scoping, and arrange technical assessments.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="primary" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
