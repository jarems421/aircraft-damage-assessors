import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { CheckCircle2, Info, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About | Specialist Aircraft Damage Assessors",
  description:
    "Learn about Aircraft Damage Assessors Ltd and our specialist aircraft damage assessment and aviation technical services.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#060B14] text-white pt-18 pb-20 sm:pt-24 sm:pb-24 border-b border-slate-800/80 bg-aviation-grid-dark">
        <Container>
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary">
                Company Background
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
              About Aircraft Damage Assessors Ltd
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans">
              {COMPANY_CONFIG.descriptor}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Philosophy & Company Purpose */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="neutral">
                Our Purpose
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
                Aviation Damage Assessment and Technical Services
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                When an aircraft is involved in an incident or accident, the subsequent decisions made by aircraft insurance companies, insurance brokers, aircraft owners, and aircraft operators have significant technical and financial consequences.
              </p>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                Aircraft Damage Assessors Ltd provides aircraft damage assessments. We assess damaged aircraft, document affected components, estimate costs of required parts and repair labour where repairable, evaluate repairability, and deliver detailed technical reports.
              </p>

              <div className="pt-6 border-t border-slate-200/80 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                  Core Operational Commitments
                </h3>
                <ul className="space-y-4 text-sm text-slate-700 font-sans">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900">Damage Assessment:</strong> Technical assessment and documentation of aircraft damage following incidents.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900">Cost Estimation:</strong> Identification of parts required alongside estimated parts and labour costs where the aircraft is believed to be repairable.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900">Third-Party AMO Coordination:</strong> Arranging a suitable third-party Approved Maintenance Organisation (AMO) where the current AMO does not have the required repair capability.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirmed Company Profile Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-chic-card space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Info className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950 font-sans">
                      Company Profile
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Verified operational parameters
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="p-4 bg-slate-50/80 border border-slate-200/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase font-semibold mb-1">
                      Entity
                    </span>
                    <span className="text-slate-950 font-bold text-sm font-sans">{COMPANY_CONFIG.name}</span>
                  </div>

                  <div className="p-4 bg-slate-50/80 border border-slate-200/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase font-semibold mb-1">
                      Flagship Specialism
                    </span>
                    <span className="text-slate-950 font-bold text-sm font-sans">Comprehensive Aircraft Damage Assessment</span>
                  </div>

                  <div className="p-4 bg-slate-50/80 border border-slate-200/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase font-semibold mb-1">
                      Confirmed Technical Services
                    </span>
                    <span className="text-slate-800 leading-relaxed font-sans text-xs">
                      Damage Assessment, Pre-Purchase Inspections, Aircraft Recovery, Third-Party Repair Coordination, Modification Applications & Approvals
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50/80 border border-slate-200/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase font-semibold mb-1">
                      Primary Client Audiences
                    </span>
                    <span className="text-slate-800 font-sans text-xs">
                      Aircraft Insurers, Insurance Brokers, Aircraft Owners, Aircraft Operators
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button href="/contact" variant="primary" size="md" className="w-full shadow-thock-primary font-semibold">
                    Submit Technical Enquiry →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Regulatory Stance Reminder */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <Container size="narrow">
          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 text-xs text-slate-600 leading-relaxed space-y-2">
            <div className="text-slate-950 font-bold uppercase font-mono tracking-wider">
              Regulatory Scope Disclaimer
            </div>
            <p className="font-sans">
              Aircraft Damage Assessors Ltd is a technical services company providing specialist damage assessments. We are not an official government accident investigation authority (such as the AAIB or NTSB), statutory regulator, or law-enforcement body.
            </p>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#060B14] text-white">
        <Container size="narrow">
          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-[#060B14] p-10 sm:p-14 text-center space-y-5 shadow-chic-dark">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans">
              Discuss an Aircraft Assessment
            </h2>
            <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
              Submit an enquiry to discuss your technical damage assessment or aviation inspection requirements.
            </p>
            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="shadow-thock-primary font-semibold text-base"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request an Assessment
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
