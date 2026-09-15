import React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AssessmentRequestForm } from "@/components/contact/AssessmentRequestForm";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Request an Assessment | Contact",
  description:
    "Request an aircraft damage assessment, pre-purchase inspection, or aircraft recovery evaluation from Aircraft Damage Assessors Ltd.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-14 pb-16 sm:pt-20 sm:pb-20 border-b border-slate-800 bg-aviation-grid-dark">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="primary" mono>
              ASSESSMENT INTAKE
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              Request an Aircraft Assessment
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Submit your incident details, aircraft registration, and damage particulars below. Our technical team reviews submissions to initiate inspection scoping and cost estimations.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Intake Area */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Column (8 cols) */}
            <div className="lg:col-span-8">
              <AssessmentRequestForm />
            </div>

            {/* Sidebar / Direct Contact (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card variant="default" className="bg-white p-6 sm:p-7 space-y-5">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3">
                  Direct Technical Enquiries
                </h2>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 border border-blue-200 text-blue-700 shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block uppercase">
                        Technical Email
                      </span>
                      <span className="font-mono text-xs text-slate-900 font-semibold">
                        {COMPANY_CONFIG.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 border border-blue-200 text-blue-700 shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block uppercase">
                        Incident Line
                      </span>
                      <span className="font-mono text-xs text-slate-900 font-semibold">
                        {COMPANY_CONFIG.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 border border-blue-200 text-blue-700 shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block uppercase">
                        Office Location
                      </span>
                      <span className="font-mono text-xs text-slate-900">
                        {COMPANY_CONFIG.officeLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Instructions for Incident Location Details */}
              <Card variant="dark" className="border-slate-800 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                  <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-white">
                    Incident Support & Location Details
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  For incidents requiring aircraft recovery assessment or technical damage evaluation, please complete the intake form with all available aircraft location and damage details.
                </p>
                <div className="pt-2 text-[11px] font-sans text-slate-400 border-t border-slate-800">
                  Service confidentiality assured on all assessment submissions.
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
