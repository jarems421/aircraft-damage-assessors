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
import { CheckCircle2, ArrowRight, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-800 bg-aviation-grid-dark overflow-hidden">
        {/* Subtle radial ambient gradient */}
        <div className="absolute inset-0 bg-radial-[at_top_right] from-blue-900/30 via-transparent to-transparent pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
            {/* Hero Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Badge variant="primary" mono>
                  TECHNICAL AVIATION SERVICES
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
                When Aircraft Are Damaged, <br className="hidden sm:inline" />
                <span className="text-blue-400">Decisions Need Evidence.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl">
                {COMPANY_CONFIG.name} provides specialist aircraft damage assessment, repair-cost estimation, recovery support, and comprehensive technical reporting for aircraft insurers, insurance brokers, aircraft owners, and operators.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="font-semibold shadow-lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request an Assessment
                </Button>
                <Button
                  href="/services"
                  variant="outlineDark"
                  size="lg"
                >
                  Explore Our Services
                </Button>
              </div>

              {/* Core Evidence Checklist */}
              <div className="pt-6 border-t border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Technical Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Repair & Parts Scoping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Detailed Report</span>
                </div>
              </div>
            </div>

            {/* Hero Visual: Vector Technical Schematic (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative">
                <AircraftSchematic />
                <div className="mt-3 flex items-center justify-between text-[11px] font-sans text-slate-400">
                  <span>Conceptual Airframe Reference</span>
                  <span className="text-slate-500">Illustrative Layout</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. TRUST & OBJECTIVITY BAR */}
      <section className="bg-slate-950 border-b border-slate-800 py-6 text-slate-300 font-mono text-xs">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="border-l-2 border-blue-500 pl-3">
              <span className="text-slate-400 block text-[10px] uppercase">TECHNICAL FOCUS</span>
              <span className="text-white font-semibold font-sans text-sm">Evidence-Based Findings</span>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <span className="text-slate-400 block text-[10px] uppercase">PRIMARY AUDIENCES</span>
              <span className="text-white font-semibold font-sans text-sm">Insurers & Operators</span>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <span className="text-slate-400 block text-[10px] uppercase">ASSESSMENT SCOPE</span>
              <span className="text-white font-semibold font-sans text-sm">Airframes, Systems, Parts</span>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <span className="text-slate-400 block text-[10px] uppercase">REPAIR LIAISON</span>
              <span className="text-white font-semibold font-sans text-sm">Third-Party AMO Coordination</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. COMPANY INTRODUCTION & CONTEXT */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="neutral" mono>
                COMPANY PURPOSE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 font-sans">
                Objective Technical Data to Support Aviation Loss Evaluation
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                Following an aviation incident or accident, determining the full extent of damage is a complex technical challenge. Insurers, brokers, aircraft owners, and operators require clear, documented facts rather than conjecture to make informed decisions.
              </p>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                Aircraft Damage Assessors Ltd performs comprehensive damage assessments, identifies required parts, estimates labour and recovery costs, evaluates repairability, and provides detailed technical reports.
              </p>
              <div className="pt-2">
                <Button href="/about" variant="outline" size="md">
                  Learn About Our Company →
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Card variant="default" className="bg-slate-50 border-slate-200 p-6 sm:p-8">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-700" />
                  Core Technical Principles
                </h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                    <div>
                      <strong className="text-slate-900 font-semibold block">Fact-Based Damage Documentation</strong>
                      Assessment and documentation of aircraft damage, affected components, and overall condition.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                    <div>
                      <strong className="text-slate-900 font-semibold block">Granular Parts & Labour Scoping</strong>
                      Identification of parts and components required, with estimated labour costs projected where the aircraft is believed to be repairable.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                    <div>
                      <strong className="text-slate-900 font-semibold block">Objective Technical Perspective</strong>
                      Objective engineering findings formulated without bias toward repair facility, insurer, or operator.
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. "WHAT YOU RECEIVE" DELIVERABLES (STANDOUT SECTION) */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white border-b border-slate-800 bg-aviation-grid-dark relative">
        <Container>
          <SectionHeader
            badgeText="DELIVERABLES SPECIFICATION"
            title="What You Receive: The Assessment Deliverables"
            description="Every damage assessment produces concrete, evidence-based technical deliverables designed for presentation to insurance adjusters, underwriters, owners, and technical directors."
            theme="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIRMED_DELIVERABLES.slice(0, 6).map((item) => (
              <Card
                key={item.id}
                variant="dark"
                className="bg-slate-850/80 border-slate-800 hover:border-blue-500/50 transition-colors p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-blue-400 font-semibold">
                      {item.referenceTag}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Scope Details
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.includedElements.map((el, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full shrink-0" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* 7th Deliverable: The Master Technical Report Showcase */}
          <div className="mt-8">
            <Card variant="dark" className="bg-slate-950 border-blue-600/40 p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <Badge variant="primary">
                      TECHNICAL DELIVERABLE
                    </Badge>
                    <span className="text-xs text-slate-400 font-sans">
                      Formal Damage Report
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                    Detailed Technical Damage Report
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    A comprehensive, evidence-based technical report compiling all damage inspection observations, itemised parts schedules, estimated labour costs, repairability conclusions, recovery cost projections, and investigation findings regarding potential cause within technical scope.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Button
                      href="/damage-assessment"
                      variant="primary"
                      size="md"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Detailed Damage Assessment Offering
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
            </Card>
          </div>
        </Container>
      </section>

      {/* 5. 5-STAGE ASSESSMENT PROCESS */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <Container>
          <SectionHeader
            badgeText="OPERATIONAL TIMELINE"
            title="The Assessment Process"
            description="A structured workflow designed to transition from initial incident notification to the delivery of a detailed technical report."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {CONFIRMED_PROCESS_STAGES.map((stage, idx) => (
              <div
                key={stage.stepNumber}
                className="bg-white border border-slate-200 p-5 flex flex-col justify-between relative shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200">
                      STAGE {stage.stepNumber}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">0{idx + 1}/05</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans mb-2 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {stage.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-sans space-y-1">
                  {stage.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-blue-600 shrink-0">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. CONFINED SERVICES OVERVIEW */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <Container>
          <SectionHeader
            badgeText="CONFIRMED SERVICES"
            title="Aviation Technical Capabilities"
            description="Our confirmed scope of technical services supporting aircraft transactions, incidents, recovery, and maintenance coordination."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service) => (
              <Card
                key={service.id}
                variant="interactive"
                className={`flex flex-col justify-between ${
                  service.isFlagship ? "border-blue-300 bg-blue-50/20" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {service.isFlagship ? (
                      <Badge variant="primary" mono>
                        FLAGSHIP SERVICE
                      </Badge>
                    ) : (
                      <Badge variant="neutral" mono>
                        TECHNICAL SERVICE
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-sans mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                      Confirmed Scope
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {service.scopePoints.slice(0, 3).map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <Link
                    href={service.id === "damage-assessment" ? "/damage-assessment" : `/services#${service.slug}`}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. WHO WE WORK WITH (CONFIRMED AUDIENCES ONLY) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <Container>
          <SectionHeader
            badgeText="CONFIRMED AUDIENCES"
            title="Who We Work With"
            description="We provide technical assessments and damage reports for key stakeholders across the aviation and aviation insurance sectors."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONFIRMED_AUDIENCES.map((audience, idx) => (
              <Card key={idx} variant="default" className="bg-white p-6">
                <div className="w-10 h-10 bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center mb-4 font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 font-sans mb-2">
                  {audience.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {audience.description}
                </p>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-500 text-center font-sans">
            Third-party Approved Maintenance Organisations (AMOs) are arranged and coordinated where the current facility lacks the required repair capability.
          </p>
        </Container>
      </section>

      {/* 8. FINAL URGENT ASSESSMENT ENQUIRY CTA */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative bg-aviation-grid-dark">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <Badge variant="primary" mono>
              RAPID INCIDENT INTAKE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Have an Aircraft Requiring Technical Damage Assessment?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Contact Aircraft Damage Assessors Ltd to register an incident, discuss an aircraft inspection, or request a detailed damage evaluation.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-semibold shadow-md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request an Assessment
              </Button>
              <Button
                href="/damage-assessment"
                variant="outlineDark"
                size="lg"
                className="w-full sm:w-auto"
              >
                Review Assessment Scope
              </Button>
            </div>

            <p className="pt-6 text-xs text-slate-400 font-sans">
              Technical enquiries are reviewed directly by aviation assessment personnel.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
