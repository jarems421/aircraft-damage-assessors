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
      <section className="bg-[#060B14] text-white pt-18 pb-20 sm:pt-24 sm:pb-24 border-b border-slate-800/80 bg-aviation-grid-dark">
        <Container>
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary">
                Confirmed Capabilities
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
              Aviation Technical Services
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans">
              Aircraft Damage Assessors Ltd provides specialist technical services supporting aircraft transactions, incident recovery, damage assessment, third-party repair arrangement, and modification applications.
            </p>
          </div>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <Container>
          <div className="space-y-12">
            {SERVICES_DATA.map((service, idx) => (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 rounded-2xl border border-slate-200/80 p-8 sm:p-12 bg-white shadow-chic-card hover:shadow-lg transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Service Overview (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        {getServiceIcon(service.id)}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                          SERVICE 0{idx + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 font-sans">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-slate-600 leading-relaxed font-sans">
                      {service.fullDescription}
                    </p>

                    {/* Scope Checklist */}
                    <div className="pt-2">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-3">
                        Confirmed Technical Scope
                      </h3>
                      <ul className="space-y-2.5 text-sm text-slate-700 font-sans">
                        {service.scopePoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
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
                          className="font-semibold shadow-thock-light"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Explore Comprehensive Damage Assessment Scope
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Service Metadata Sidebar (5 cols) */}
                  <div className="lg:col-span-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 p-6 sm:p-8 space-y-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                        Deliverable Output
                      </span>
                      <p className="text-sm text-slate-800 leading-relaxed font-medium font-sans">
                        {service.deliverableSummary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                        Primary Client Audiences
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.targetAudiences.map((aud, aIdx) => (
                          <span
                            key={aIdx}
                            className="text-xs font-medium font-sans px-3 py-1 bg-white border border-slate-200/80 rounded-full text-slate-700 shadow-xs"
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80">
                      <Button
                        href={`/contact?service=${service.id}`}
                        variant="primary"
                        size="md"
                        className="w-full shadow-thock-primary font-semibold"
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

      {/* Bottom CTA */}
      <section className="py-20 bg-[#060B14] text-white">
        <Container size="narrow">
          <div className="text-center space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans">
              Need a Specialist Aviation Inspection?
            </h2>
            <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
              Discuss your aircraft requirements directly with Aircraft Damage Assessors Ltd.
            </p>
            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="shadow-thock-primary font-semibold text-base"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Contact Technical Services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
