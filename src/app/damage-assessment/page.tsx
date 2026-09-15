import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AircraftSchematic } from "@/components/schematics/AircraftSchematic";
import { ReportPreviewSvg } from "@/components/schematics/ReportPreviewSvg";
import {
  CheckCircle2,
  ArrowRight,
  Search,
  Wrench,
  Truck,
  AlertTriangle,
  Building,
  FileSpreadsheet,
} from "lucide-react";

export const metadata = {
  title: "Aircraft Damage Assessment | Specialist Technical Service",
  description:
    "Comprehensive aircraft damage assessment, repairability evaluations, parts and labour cost estimates, recovery planning, and technical cause investigations for insurers and operators.",
};

export default function DamageAssessmentPage() {
  const confirmedAssessmentAreas = [
    {
      number: "01",
      title: "Aircraft Damage Assessment",
      icon: <Search className="w-5 h-5 text-blue-600" />,
      description:
        "Comprehensive technical assessment of aircraft damage resulting from an incident or accident, providing assessment and documentation of aircraft damage across affected components.",
      deliverablePoint: "Assessment and documentation of aircraft damage.",
    },
    {
      number: "02",
      title: "Parts Requirements & Estimated Costs",
      icon: <FileSpreadsheet className="w-5 h-5 text-blue-600" />,
      description:
        "Identification of parts and components required for rectification, paired with estimated costs of required parts and components.",
      deliverablePoint: "Identification of parts required and estimated parts costs.",
    },
    {
      number: "03",
      title: "Repairability & Labour Cost Estimation",
      icon: <Wrench className="w-5 h-5 text-blue-600" />,
      description:
        "Objective technical evaluation of whether the aircraft is considered repairable. Where the aircraft is believed to be repairable, we project required maintenance labour and estimated labour costs.",
      deliverablePoint: "Assessment of repairability and estimated labour costs.",
    },
    {
      number: "04",
      title: "Aircraft Recovery Cost Assessment",
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      description:
        "Evaluation of aircraft recovery requirements and estimated recovery costs to reposition the aircraft from the incident location.",
      deliverablePoint: "Aircraft recovery requirements and estimated recovery costs.",
    },
    {
      number: "05",
      title: "Investigation Into Potential Cause",
      icon: <AlertTriangle className="w-5 h-5 text-blue-600" />,
      description:
        "Investigation aimed at determining the potential cause of an incident or accident within the company's technical assessment scope, based on objective examination of physical damage and component condition.",
      deliverablePoint: "Technical cause observations within technical assessment scope.",
    },
    {
      number: "06",
      title: "Detailed Report & Third-Party AMO Coordination",
      icon: <Building className="w-5 h-5 text-blue-600" />,
      description:
        "Delivery of a detailed technical damage report consolidating all findings. Where the current maintenance facility lacks the required repair capability, we assist by arranging a suitable third-party Approved Maintenance Organisation (AMO).",
      deliverablePoint: "Detailed technical damage report and third-party AMO arrangement.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. SERVICE HERO */}
      <section className="bg-[#060B14] text-white pt-18 pb-22 sm:pt-24 sm:pb-28 border-b border-slate-800/80 bg-aviation-grid-dark relative">
        <Container>
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary">
                Core Technical Service
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
              Comprehensive Aircraft Damage Assessment
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans">
              An evidence-based technical assessment delivering clear facts, parts requirements, labour cost projections, and repairability evaluations that insurers, brokers, owners, and operators need to make informed decisions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                href="/contact?service=damage-assessment"
                variant="primary"
                size="lg"
                className="shadow-thock-primary font-semibold text-base"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request an Assessment
              </Button>
              <Button
                href="#assessment-scope"
                variant="outlineDark"
                size="lg"
                className="font-medium text-base"
              >
                Explore Assessment Scope
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SCHEMATIC SPOTLIGHT */}
      <section className="py-16 sm:py-20 bg-[#0A111F] border-b border-slate-800/80 text-slate-300">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-4">
              <Badge variant="neutral">
                Technical Reference
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                Conceptual Airframe Reference
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Our damage assessment evaluates observable physical damage, affected components, and overall condition following an incident or accident.
              </p>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Illustrative diagram representing general aircraft structure. Assessment scope and inspection focus are determined on an incident-by-incident basis.
              </p>
            </div>
            <div className="lg:col-span-8">
              <AircraftSchematic />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. THE 6 CONFIRMED ASSESSMENT AREAS */}
      <section id="assessment-scope" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          <SectionHeader
            badgeText="Technical Scope"
            title="Confirmed Areas of Damage Assessment"
            description="Our damage assessment is structured across six core areas grounded directly in confirmed technical requirements to provide clear, actionable information."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {confirmedAssessmentAreas.map((area) => (
              <div
                key={area.number}
                className="rounded-2xl bg-white border border-slate-200/80 p-7 sm:p-8 flex flex-col justify-between shadow-chic-card hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200/60">
                      AREA {area.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                      {area.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 font-sans mb-3">
                    {area.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                    {area.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 bg-slate-50/70 -mx-7 -mb-7 sm:-mx-8 sm:-mb-8 p-4 px-7 sm:px-8 rounded-b-2xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Confirmed Deliverable Element
                  </span>
                  <span className="text-xs font-semibold text-slate-800 font-sans block">
                    {area.deliverablePoint}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ACCIDENT INVESTIGATION SCOPE NOTE (FACTUAL BOUNDARY) */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <Container size="narrow">
          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <h3 className="text-base font-bold text-amber-950 font-sans">
                Accident & Incident Investigation Context
              </h3>
            </div>
            <p className="text-sm text-amber-900 leading-relaxed font-sans">
              Where requested, Aircraft Damage Assessors Ltd conducts technical investigations aimed at determining the potential cause of an incident or accident.
            </p>
            <div className="p-4 bg-white/80 border border-amber-200/60 rounded-xl text-xs text-amber-950 leading-relaxed font-sans">
              <strong>Technical Position:</strong> This service constitutes a technical assessment of physical damage and component condition. Aircraft Damage Assessors Ltd is not an official government accident investigation authority (such as the AAIB or NTSB), statutory regulator, or law-enforcement agency. All findings are produced strictly within the company&apos;s technical assessment scope.
            </div>
          </div>
        </Container>
      </section>

      {/* 5. THE REPORT DELIVERABLE STRUCTURE */}
      <section className="py-24 sm:py-32 bg-[#070D18] text-white border-b border-slate-800/80 bg-aviation-grid-dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="primary">
                Technical Deliverable
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
                The Final Deliverable: Detailed Damage Report
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                The primary output of the assessment is a detailed technical damage report. It compiles observable damage, parts requirements, estimated labour costs, recovery cost assessments, repairability conclusions, and investigation findings regarding potential cause within technical scope.
              </p>

              <div className="space-y-3.5 text-sm text-slate-300 font-sans pt-2">
                {[
                  "Comprehensive Damage Assessment & Optional Supporting Material",
                  "Itemised Parts Schedule & Estimated Costs",
                  "Estimated Labour Costs (Where Repairable)",
                  "Assessment of Repairability & Recovery Costs",
                  "Investigation into Potential Cause (Within Technical Scope)",
                  "Third-Party AMO Coordination Details (Where Applicable)",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  href="/contact?service=damage-assessment"
                  variant="primary"
                  size="lg"
                  className="shadow-thock-primary font-semibold"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request a Damage Assessment
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ReportPreviewSvg />
            </div>
          </div>
        </Container>
      </section>

      {/* 6. THIRD-PARTY AMO REPAIR ARRANGEMENT */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="neutral">
                Maintenance Coordination
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans">
                Third-Party AMO Coordination
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                When an aircraft is believed to be repairable, the current maintenance facility may not possess the required repair capability for the work needed.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                In these circumstances, Aircraft Damage Assessors Ltd assists by arranging a suitable third-party Approved Maintenance Organisation (AMO).
              </p>
              <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-chic-card">
                <span className="text-xs font-bold text-slate-950 block mb-1 font-sans">
                  Third-Party AMO Placement
                </span>
                <span className="text-xs sm:text-sm text-slate-600 font-sans">
                  Arrangement of a suitable third-party Approved Maintenance Organisation (AMO) where the current facility lacks required repair capability.
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900 p-8 sm:p-10 space-y-4 shadow-chic-dark text-white">
                <span className="text-xs text-blue-400 uppercase tracking-wider block font-mono font-bold">
                  Confirmed Service Scope
                </span>
                <h3 className="text-2xl font-bold font-sans">
                  Third-Party Repair Coordination
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Arrangement of a suitable third-party Approved Maintenance Organisation (AMO) where the current AMO does not have the required repair capability.
                </p>
                <div className="pt-3">
                  <Button
                    href="/contact?service=repair-coordination"
                    variant="outlineDark"
                    size="md"
                  >
                    Enquire About Repair Coordination
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. FINAL INTAKE CTA */}
      <section className="py-20 sm:py-28 bg-[#060B14] text-white">
        <Container size="narrow">
          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-[#060B14] p-10 sm:p-16 text-center space-y-6 shadow-chic-dark">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans">
              Request an Aircraft Damage Assessment
            </h2>
            <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
              Submit your aircraft incident particulars, aircraft registration, and damage overview to initiate our technical assessment process.
            </p>
            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="shadow-thock-primary font-semibold text-base"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Complete Assessment Intake Form
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
