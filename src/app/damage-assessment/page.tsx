import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
      title: "Parts Requirements",
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
      <section className="bg-slate-900 text-white pt-14 pb-20 sm:pt-20 sm:pb-24 border-b border-slate-800 bg-aviation-grid-dark relative">
        <Container>
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary">
                CORE TECHNICAL SERVICE
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              Comprehensive Aircraft Damage Assessment
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              An evidence-based technical assessment delivering clear facts, parts requirements, labour cost projections, and repairability evaluations that insurers, brokers, owners, and operators need to make informed decisions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                href="/contact?service=damage-assessment"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request an Assessment
              </Button>
              <Button
                href="#assessment-scope"
                variant="outlineDark"
                size="lg"
              >
                Explore Assessment Scope
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SCHEMATIC SPOTLIGHT */}
      <section className="py-12 bg-slate-950 border-b border-slate-800 text-slate-300">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <Badge variant="neutral">
                TECHNICAL REFERENCE
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Conceptual Airframe Reference
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
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
      <section id="assessment-scope" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <Container>
          <SectionHeader
            badgeText="TECHNICAL SCOPE"
            title="Confirmed Areas of Damage Assessment"
            description="Our damage assessment is structured across six core areas grounded directly in confirmed technical requirements to provide clear, actionable information."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {confirmedAssessmentAreas.map((area) => (
              <Card
                key={area.number}
                variant="default"
                className="p-6 sm:p-7 flex flex-col justify-between border-slate-200 hover:border-blue-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 border border-blue-200">
                      AREA {area.number}
                    </span>
                    <div className="p-2 bg-slate-100 border border-slate-200">
                      {area.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-sans mb-3">
                    {area.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5 font-sans">
                    {area.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-4 px-6">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-slate-500 block mb-1">
                    Confirmed Deliverable Element
                  </span>
                  <span className="text-xs font-semibold text-slate-800 font-sans">
                    {area.deliverablePoint}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ACCIDENT INVESTIGATION SCOPE NOTE (FACTUAL BOUNDARY) */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <Container size="narrow">
          <div className="p-6 sm:p-8 bg-white border border-slate-300 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Accident & Incident Investigation Context
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Where requested, Aircraft Damage Assessors Ltd conducts technical investigations aimed at determining the potential cause of an incident or accident.
            </p>
            <div className="p-3.5 bg-slate-100 border-l-4 border-blue-600 text-xs text-slate-700 leading-relaxed font-sans">
              <strong>Technical Position:</strong> This service constitutes a technical assessment of physical damage and component condition. Aircraft Damage Assessors Ltd is not an official government accident investigation authority (such as the AAIB or NTSB), statutory regulator, or law-enforcement agency. All findings are produced strictly within the company&apos;s technical assessment scope.
            </div>
          </div>
        </Container>
      </section>

      {/* 5. THE REPORT DELIVERABLE STRUCTURE */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800 bg-aviation-grid-dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="primary">
                TECHNICAL DELIVERABLE
              </Badge>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                The Final Deliverable: Detailed Damage Report
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                The primary output of the assessment is a detailed technical damage report. It compiles observable damage, parts requirements, estimated labour costs, recovery cost assessments, repairability conclusions, and investigation findings regarding potential cause within technical scope.
              </p>

              <div className="space-y-3 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Comprehensive Damage Assessment & Optional Supporting Material</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Itemised Parts Schedule & Estimated Costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Estimated Labour Costs (Where Repairable)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Assessment of Repairability & Recovery Costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Investigation into Potential Cause (Within Technical Scope)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Third-Party AMO Coordination Details (Where Applicable)</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  href="/contact?service=damage-assessment"
                  variant="primary"
                  size="md"
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
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="neutral">
                MAINTENANCE COORDINATION
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                Third-Party AMO Coordination Where Capability Is Lacking
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                When an aircraft is considered repairable, the current maintenance facility may not possess the required repair capability for the work needed.
              </p>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                In these circumstances, Aircraft Damage Assessors Ltd assists by arranging a suitable third-party Approved Maintenance Organisation (AMO) that possesses the verified capability to perform the repair to required standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 block mb-1 font-sans">REPAIR ARRANGEMENT</span>
                  <span className="text-xs text-slate-600 font-sans">Assisting clients by arranging suitable third-party AMOs capable of carrying out the work.</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 block mb-1 font-sans">TECHNICAL LIAISON</span>
                  <span className="text-xs text-slate-600 font-sans">Supplying our detailed damage findings and parts schedule directly to the selected facility.</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Card variant="dark" className="border-slate-800 p-6 sm:p-8 space-y-4">
                <span className="text-xs text-blue-400 uppercase tracking-wider block font-sans font-semibold">
                  SERVICE NOTE
                </span>
                <h3 className="text-lg font-bold text-white font-sans">
                  Coordination Through Third Parties
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Aircraft Damage Assessors Ltd acts to arrange and coordinate with appropriate third-party AMOs. We do not operate a maintenance facility directly, ensuring that repair facility selection remains objective and aligned with client needs.
                </p>
                <div className="pt-2">
                  <Button
                    href="/contact?service=repair-coordination"
                    variant="outlineDark"
                    size="sm"
                  >
                    Enquire About Repair Coordination
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. FINAL INTAKE CTA */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">
              Request an Aircraft Damage Assessment
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
              Submit your aircraft incident particulars, aircraft registration, and damage overview to initiate our technical assessment process.
            </p>
            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
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
