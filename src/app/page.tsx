import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AircraftSchematic } from "@/components/schematics/AircraftSchematic";
import { ReportPreviewSvg } from "@/components/schematics/ReportPreviewSvg";
import { COMPANY_CONFIG, CONFIRMED_AUDIENCES } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";
import { CONFIRMED_DELIVERABLES, CONFIRMED_PROCESS_STAGES } from "@/data/deliverablesData";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#060B14] text-white pt-20 pb-24 sm:pt-28 sm:pb-32 border-b border-slate-800/80 bg-aviation-grid-dark overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
            {/* Hero Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2">
                <Badge variant="primary">
                  Specialist Aviation Technical Services
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-sans">
                When Aircraft Are Damaged, <br className="hidden sm:inline" />
                <span className="text-blue-400">Decisions Need Evidence.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl">
                {COMPANY_CONFIG.name} provides specialist aircraft damage assessment, repair-cost estimation, recovery support, and comprehensive technical reporting for aircraft insurers, insurance brokers, aircraft owners, and operators.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="font-semibold shadow-thock-primary text-base"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request an Assessment
                </Button>
                <Button
                  href="/services"
                  variant="outlineDark"
                  size="lg"
                  className="font-medium text-base"
                >
                  Explore Our Services
                </Button>
              </div>

              {/* Core Evidence Capsule Strip */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "Damage Assessment", desc: "Detailed structural survey" },
                  { title: "Repair & Parts Scoping", desc: "Line-item cost estimates" },
                  { title: "Technical Damage Report", desc: "Actionable deliverable" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3 backdrop-blur-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-900/50 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white font-sans truncate">{item.title}</div>
                      <div className="text-[11px] text-slate-400 font-sans truncate">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual: Vector Technical Schematic (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative">
                <AircraftSchematic />
                <div className="mt-3 flex items-center justify-between text-xs font-sans text-slate-400 px-1">
                  <span className="font-medium">Conceptual Airframe Reference</span>
                  <span className="text-slate-500">Illustrative Layout</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. TRUST & OBJECTIVITY BAR */}
      <section className="bg-[#0A111F] border-b border-slate-800/80 py-8 text-slate-300 font-sans">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
            <div className="pl-4 border-l-2 border-blue-500">
              <span className="text-slate-400 block text-[11px] font-mono uppercase tracking-wider mb-1">
                Technical Focus
              </span>
              <span className="text-white font-bold text-sm sm:text-base">
                Evidence-Based Findings
              </span>
            </div>
            <div className="pl-4 border-l-2 border-blue-500">
              <span className="text-slate-400 block text-[11px] font-mono uppercase tracking-wider mb-1">
                Primary Audiences
              </span>
              <span className="text-white font-bold text-sm sm:text-base">
                Insurers, Brokers & Owners
              </span>
            </div>
            <div className="pl-4 border-l-2 border-blue-500">
              <span className="text-slate-400 block text-[11px] font-mono uppercase tracking-wider mb-1">
                Assessment Scope
              </span>
              <span className="text-white font-bold text-sm sm:text-base">
                Direct & Latent Damage
              </span>
            </div>
            <div className="pl-4 border-l-2 border-blue-500">
              <span className="text-slate-400 block text-[11px] font-mono uppercase tracking-wider mb-1">
                Repair Liaison
              </span>
              <span className="text-white font-bold text-sm sm:text-base">
                Third-Party AMO Arrangement
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. COMPANY INTRODUCTION & CONTEXT */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="neutral">
                Company Purpose
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
                Objective Technical Data to Support Aviation Loss Evaluation
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                Following an aviation incident or accident, determining the full extent of damage is a complex technical challenge. Insurers, brokers, aircraft owners, and operators require clear, documented facts rather than conjecture to make informed decisions.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                Aircraft Damage Assessors Ltd performs comprehensive damage assessments, identifies required parts, estimates labour and recovery costs, evaluates repairability, and provides detailed technical reports.
              </p>
              <div className="pt-2">
                <Button href="/about" variant="outline" size="md" className="shadow-thock-light font-medium">
                  Learn About Our Company →
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-chic-card space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-sans">
                      Core Technical Principles
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Built for aviation insurance and technical clarity
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans">
                        Fact-Based Damage Documentation
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans mt-0.5">
                        Comprehensive assessment and documentation of aircraft damage, affected components, and structural condition.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans">
                        Granular Parts & Labour Scoping
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans mt-0.5">
                        Identification of parts and components required, with estimated labour costs projected where the aircraft is believed to be repairable.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans">
                        Independent Technical Reporting
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans mt-0.5">
                        Technical damage assessment and reporting delivered strictly within the company&apos;s defined technical scope.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. "WHAT YOU RECEIVE" DELIVERABLES (STANDOUT SECTION) */}
      <section className="py-24 sm:py-32 bg-[#070D18] text-white border-b border-slate-800/80 bg-aviation-grid-dark relative">
        <Container>
          <SectionHeader
            badgeText="Deliverables Specification"
            title="What You Receive: The Assessment Deliverables"
            description="Every damage assessment produces concrete technical deliverables to support decision-making for aircraft insurers, brokers, owners, and operators."
            theme="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CONFIRMED_DELIVERABLES.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700/80 transition-all p-7 flex flex-col justify-between shadow-chic-dark"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 font-mono text-xs text-blue-400 font-bold">
                      {item.referenceTag}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                    Scope Breakdown
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    {item.includedElements.map((el, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* 7th Deliverable: The Master Technical Report Showcase */}
          <div className="mt-10">
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 p-8 sm:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2">
                    <Badge variant="primary">
                      Technical Deliverable Specimen
                    </Badge>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-sans leading-tight">
                    Detailed Technical Damage Report
                  </h3>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
                    A comprehensive, evidence-based technical report compiling all damage inspection observations, itemised parts schedules, estimated labour costs, repairability conclusions, recovery cost projections, and investigation findings regarding potential cause within technical scope.
                  </p>
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Button
                      href="/damage-assessment"
                      variant="primary"
                      size="md"
                      className="shadow-thock-primary font-semibold"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Damage Assessment Scope
                    </Button>
                    <Button
                      href="/contact"
                      variant="outlineDark"
                      size="md"
                    >
                      Request an Assessment
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <ReportPreviewSvg />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. 5-STAGE ASSESSMENT PROCESS */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          <SectionHeader
            badgeText="Operational Workflow"
            title="The Assessment Process"
            description="A structured workflow designed to transition from initial incident notification to the delivery of a detailed technical report."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {CONFIRMED_PROCESS_STAGES.map((stage, idx) => (
              <div
                key={stage.stepNumber}
                className="rounded-2xl bg-white border border-slate-200/80 p-6 flex flex-col justify-between shadow-chic-card hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
                      STAGE {stage.stepNumber}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">0{idx + 1}/05</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 font-sans mb-2 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5 font-sans">
                    {stage.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-sans space-y-1.5">
                  {stage.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-blue-600 shrink-0 font-bold">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. CONFIRMED SERVICES OVERVIEW */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <Container>
          <SectionHeader
            badgeText="Confirmed Services"
            title="Aviation Technical Capabilities"
            description="Our confirmed scope of technical services supporting aircraft transactions, incidents, recovery, and maintenance coordination."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <Card
                key={service.id}
                variant="interactive"
                className={`flex flex-col justify-between p-8 ${
                  service.isFlagship ? "border-blue-300/80 bg-blue-50/20" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {service.isFlagship ? (
                      <Badge variant="primary">
                        Flagship Service
                      </Badge>
                    ) : (
                      <Badge variant="neutral">
                        Technical Service
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 font-sans mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Confirmed Scope
                    </span>
                    <ul className="space-y-2 text-xs text-slate-700 font-sans">
                      {service.scopePoints.slice(0, 3).map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={service.id === "damage-assessment" ? "/damage-assessment" : `/services#${service.slug}`}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 font-sans"
                  >
                    <span>View Service Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. WHO WE WORK WITH (CONFIRMED AUDIENCES ONLY) */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          <SectionHeader
            badgeText="Client Audiences"
            title="Who We Work With"
            description="We provide technical assessments and damage reports for key stakeholders across the aviation and aviation insurance sectors."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONFIRMED_AUDIENCES.map((audience, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 p-7 shadow-chic-card space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/70 flex items-center justify-center font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-950 font-sans">
                  {audience.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate-500 text-center font-sans max-w-xl mx-auto">
            Third-party Approved Maintenance Organisations (AMOs) are arranged and coordinated where the current facility lacks the required repair capability.
          </p>
        </Container>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 sm:py-28 bg-[#060B14] text-white relative bg-aviation-grid-dark">
        <Container size="narrow">
          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-[#060B14] p-10 sm:p-16 text-center space-y-6 shadow-chic-dark">
            <div className="inline-flex items-center gap-2 mx-auto">
              <Badge variant="primary">
                Assessment Intake
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
              Have an Aircraft Requiring Technical Damage Assessment?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto font-sans">
              Contact Aircraft Damage Assessors Ltd to register an incident, discuss an aircraft inspection, or request a detailed damage evaluation.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-semibold shadow-thock-primary text-base"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request an Assessment
              </Button>
              <Button
                href="/damage-assessment"
                variant="outlineDark"
                size="lg"
                className="w-full sm:w-auto text-base"
              >
                Review Assessment Scope
              </Button>
            </div>

            <p className="pt-4 text-xs text-slate-400 font-sans">
              Technical enquiries are reviewed directly by aviation assessment personnel.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
