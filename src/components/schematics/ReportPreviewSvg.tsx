import React from "react";

export function ReportPreviewSvg() {
  return (
    <div className="w-full bg-white border border-slate-300 p-6 sm:p-8 text-slate-800 font-mono text-xs shadow-md">
      {/* Document Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-widest text-slate-500 uppercase">
              CONFIDENTIAL TECHNICAL DELIVERABLE
            </div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-slate-950 font-sans">
              AIRCRAFT DAMAGE ASSESSORS LTD
            </div>
            <div className="text-xs text-slate-600 font-sans mt-0.5">
              Comprehensive Aircraft Damage Assessment Report
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-600">
            <div><span className="text-slate-400">DOC REF:</span> ADA-DAR-SPECIMEN</div>
            <div><span className="text-slate-400">ISSUED TO:</span> INSURER / BROKER / OWNER</div>
            <div><span className="text-slate-400">SCOPE:</span> DAMAGE & REPAIRABILITY</div>
          </div>
        </div>
      </div>

      {/* Report Table of Contents / Structural Breakdown */}
      <div className="space-y-2.5 font-sans text-xs">
        <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-blue-700 font-semibold">SEC 01</span>
            <span className="font-medium text-slate-900">Aircraft & Incident Particulars</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">INTAKE DATA</span>
        </div>

        <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-blue-700 font-semibold">SEC 02</span>
            <span className="font-medium text-slate-900">Aircraft Damage Assessment</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">SURVEY FINDINGS</span>
        </div>

        <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-blue-700 font-semibold">SEC 03</span>
            <span className="font-medium text-slate-900">Parts Requirements & Estimated Costs</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">PARTS SCHEDULE</span>
        </div>

        <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-blue-700 font-semibold">SEC 04</span>
            <span className="font-medium text-slate-900">Repairability & Labour Cost Estimation</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">LABOUR PROJECTIONS</span>
        </div>

        <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-blue-700 font-semibold">SEC 05</span>
            <span className="font-medium text-slate-900">Aircraft Recovery Cost Assessment</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">RECOVERY PLANNING</span>
        </div>

        <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-blue-700 font-semibold">SEC 06</span>
            <span className="font-medium text-slate-900">Investigation into Potential Cause & AMO Coordination</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">TECHNICAL SCOPE</span>
        </div>
      </div>

      {/* Document Footer Verification */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
        <div>FORMAT: DETAILED TECHNICAL DAMAGE REPORT</div>
        <div className="text-blue-700 font-semibold">AIRCRAFT DAMAGE ASSESSORS LTD</div>
      </div>
    </div>
  );
}
