import React from "react";

interface PlaceholderNoticeProps {
  label: string;
  className?: string;
  context?: string;
}

export function PlaceholderNotice({
  label,
  className = "",
  context,
}: PlaceholderNoticeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 border border-dashed border-slate-300 bg-slate-50 text-slate-600 font-mono text-xs ${className}`}
      title="Placeholder awaiting confirmation from client"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
      <span className="tracking-wide">{label}</span>
      {context && <span className="text-slate-400 font-sans text-[11px]">({context})</span>}
    </div>
  );
}
