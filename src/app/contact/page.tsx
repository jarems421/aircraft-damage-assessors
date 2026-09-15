import React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { AssessmentRequestForm } from "@/components/contact/AssessmentRequestForm";
import { AlertCircle, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Request an Assessment | Contact",
  description:
    "Request an aircraft damage assessment, pre-purchase inspection, or aircraft recovery evaluation from Aircraft Damage Assessors Ltd.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#060B14] text-white pt-18 pb-20 sm:pt-24 sm:pb-24 border-b border-slate-800/80 bg-aviation-grid-dark">
        <Container>
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary">
                Assessment Intake
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
              Request an Aircraft Assessment
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans">
              Submit your incident details, aircraft registration, and damage particulars below.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Intake Area */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          {/* Client Review Preview Notice Banner */}
          <div className="mb-10 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-900 text-xs sm:text-sm flex items-center gap-3 font-sans shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Client review preview</strong> — form submissions are currently simulated for review purposes.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Form Column (8 cols) */}
            <div className="lg:col-span-8">
              <AssessmentRequestForm />
            </div>

            {/* Sidebar / Technical Scope Guidance (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Instructions for Incident Location Details */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900 p-7 space-y-4 shadow-chic-dark text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                  </div>
                  <h3 className="text-base font-sans font-bold text-white">
                    Incident Particulars
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  For incidents requiring aircraft recovery assessment or technical damage evaluation, please complete the intake form with all available aircraft location and damage details.
                </p>
              </div>

              {/* Assessment Scoping Guidance Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-7 space-y-5 shadow-chic-card">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-700 shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 font-sans">
                      Intake Checklist
                    </h3>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Key details to prepare
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                    <span>Aircraft type, model, and registration</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                    <span>Airfield, hangar, or incident site coordinates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                    <span>Observable physical damage description</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                    <span>Optional supporting photographs or defect notes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
