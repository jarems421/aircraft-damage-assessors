import React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
              Submit your incident details, aircraft registration, and damage particulars below.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Intake Area */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <Container>
          {/* Client Review Preview Notice Banner */}
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-center gap-2.5 font-sans">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Client review preview</strong> — form submissions are not currently transmitted.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Column (8 cols) */}
            <div className="lg:col-span-8">
              <AssessmentRequestForm />
            </div>

            {/* Sidebar / Technical Scope Guidance (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Instructions for Incident Location Details */}
              <Card variant="dark" className="border-slate-800 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                  <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-white">
                    Incident Particulars
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  For incidents requiring aircraft recovery assessment or technical damage evaluation, please complete the intake form with all available aircraft location and damage details.
                </p>
              </Card>

              {/* Assessment Scoping Guidance Card */}
              <Card variant="default" className="bg-white p-6 space-y-4 border-slate-200">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
                    Intake Checklist
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>Aircraft type and registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>Airfield, hangar, or incident site coordinates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>Observable physical damage description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>Optional supporting photographs or documentation</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
