import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES_DATA } from "@/data/servicesData";
import {
  CheckCircle2,
  ArrowRight,
  Search,
  Wrench,
  Truck,
  Layers,
  FileText,
  Sliders,
} from "lucide-react";

export const metadata = {
  title: "Aviation Technical Services",
  description:
    "Explore our confirmed services: Aircraft Damage Assessment, Pre-Purchase Inspections, Aircraft Recovery, Aircraft Repair Coordination, and Modification Applications & Approvals.",
};

export default function ServicesPage() {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "damage-assessment":
        return <FileText className="w-6 h-6 text-blue-700" />;
      case "pre-purchase-inspections":
        return <Search className="w-6 h-6 text-blue-700" />;
      case "aircraft-recovery":
        return <Truck className="w-6 h-6 text-blue-700" />;
      case "repair-coordination":
        return <Wrench className="w-6 h-6 text-blue-700" />;
      case "modification-approvals":
        return <Sliders className="w-6 h-6 text-blue-700" />;
      default:
        return <Layers className="w-6 h-6 text-blue-700" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-14 pb-16 sm:pt-20 sm:pb-20 border-b border-slate-800 bg-aviation-grid-dark">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="primary" mono>
              CONFIRMED CAPABILITIES
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              Aviation Technical Services
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Aircraft Damage Assessors Ltd provides specialist technical services supporting aircraft transactions, incident recovery, damage assessment, third-party repair arrangement, and modification applications.
            </p>
          </div>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <Container>
          <div className="space-y-16">
            {SERVICES_DATA.map((service, idx) => (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-24 border border-slate-200 p-6 sm:p-10 bg-white shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Service Overview (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 border border-blue-200">
                        {getServiceIcon(service.id)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                          SERVICE 0{idx + 1}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-slate-700 leading-relaxed font-sans">
                      {service.fullDescription}
                    </p>

                    {/* Scope Checklist */}
                    <div className="pt-2">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 mb-3">
                        Confirmed Technical Scope
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {service.scopePoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dedicated link for flagship service */}
                    {service.isFlagship && (
                      <div className="pt-4">
                        <Button
                          href="/damage-assessment"
                          variant="secondary"
                          size="md"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Explore Comprehensive Damage Assessment Scope
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Service Metadata Sidebar (5 cols) */}
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 space-y-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                        Deliverable Output
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {service.deliverableSummary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                        Primary Client Audiences
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.targetAudiences.map((aud, aIdx) => (
                          <span
                            key={aIdx}
                            className="text-xs font-sans px-2.5 py-1 bg-white border border-slate-200 text-slate-700"
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <Button
                        href={`/contact?service=${service.id}`}
                        variant="primary"
                        size="md"
                        className="w-full"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Enquire About This Service
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 bg-slate-900 text-white">
        <Container size="narrow">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">
              Need to Discuss a Specific Aircraft Incident or Requirement?
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Our team provides prompt technical reviews for insurers, brokers, owners, and operators.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="primary" size="lg">
                Submit an Enquiry
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
