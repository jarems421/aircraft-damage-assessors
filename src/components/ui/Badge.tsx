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
    "inline-flex items-center text-xs px-3.5 py-1 tracking-wide font-medium border rounded-full select-none";

  const variants = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200/90 shadow-xs",
    primary: "bg-blue-600/15 text-blue-400 border-blue-500/30 shadow-xs",
    warning: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    dark: "bg-slate-800/90 text-slate-200 border-slate-700/80 shadow-xs",
    outline: "bg-transparent text-slate-300 border-slate-700/80",
  };

  const fontStyle = mono ? "font-sans text-xs font-semibold" : "font-sans text-xs font-medium";

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${fontStyle} ${className}`}
    >
      {children}
    </span>
  );
}
