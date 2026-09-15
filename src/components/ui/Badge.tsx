import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "primary" | "warning" | "dark" | "outline";
  className?: string;
  mono?: boolean;
}

export function Badge({
  children,
  variant = "neutral",
  className = "",
  mono = true,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center text-xs px-2.5 py-1 tracking-wider uppercase font-medium border";

  const variants = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    dark: "bg-slate-800 text-slate-200 border-slate-700",
    outline: "bg-transparent text-slate-600 border-slate-300",
  };

  const fontStyle = mono ? "font-mono text-[11px]" : "font-sans text-xs";

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${fontStyle} ${className}`}
    >
      {children}
    </span>
  );
}
