import React from "react";

export function ReportPreviewSvg() {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 text-slate-800 font-sans shadow-chic-card">
      {/* Document Header */}
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-semibold tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Technical Deliverable Specimen
            </div>
            <div className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 font-sans">
              Aircraft Damage Assessors Ltd
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Comprehensive Aircraft Damage Assessment Report
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500 font-mono space-y-0.5">
            <div><span className="text-slate-400">DOC REF:</span> ADA-DAR-SPECIMEN</div>
            <div><span className="text-slate-400">RECIPIENT:</span> INSURER / BROKER / OWNER</div>
            <div><span className="text-slate-400">STATUS:</span> COMPLETE DELIVERABLE</div>
          </div>
        </div>
      </div>

      {/* Report Table of Contents / Structural Breakdown */}
      <div className="space-y-2.5 text-xs">
        {[
          { sec: "01", title: "Aircraft & Incident Particulars", tag: "INTAKE DATA", desc: "Airframe details, operating history & incident circumstances" },
          { sec: "02", title: "Aircraft Damage Assessment", tag: "SURVEY FINDINGS", desc: "Detailed itemisation of direct & consequential damage" },
          { sec: "03", title: "Parts Requirements & Estimated Costs", tag: "PARTS SCHEDULE", desc: "Identification of required components with cost scoping" },
          { sec: "04", title: "Repairability & Labour Cost Estimation", tag: "LABOUR ESTIMATE", desc: "Repairability opinion and realistic technician hours" },
          { sec: "05", title: "Aircraft Recovery Cost Assessment", tag: "RECOVERY PLANNING", desc: "Specialist logistics and salvage transport estimates" },
          { sec: "06", title: "Cause Investigation & Third-Party AMO Coordination", tag: "TECHNICAL SCOPE", desc: "Potential cause analysis & qualified repair facility placement" },
        ].map((item) => (
          <div
            key={item.sec}
            className="p-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-blue-600 font-bold px-2 py-0.5 bg-blue-50 border border-blue-200/60 rounded-lg text-[11px]">
                SEC {item.sec}
              </span>
              <div className="min-w-0">
                <span className="font-medium text-slate-900 block truncate">{item.title}</span>
                <span className="text-[11px] text-slate-500 block truncate hidden sm:block">{item.desc}</span>
              </div>
            </div>
            <span className="text-slate-400 font-mono text-[10px] uppercase font-semibold shrink-0">
              {item.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Document Footer Verification */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
        <div>STANDARD: COMPREHENSIVE DAMAGE REPORT</div>
        <div className="text-blue-700 font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          AIRCRAFT DAMAGE ASSESSORS LTD
        </div>
      </div>
    </div>
  );
}
