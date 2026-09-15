import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "bordered" | "interactive";
  datum?: boolean;
}

export function Card({
  children,
  className = "",
  variant = "default",
  datum = false,
}: CardProps) {
  const baseStyles = "relative p-6 sm:p-8 rounded-2xl transition-all duration-200";

  const variants = {
    default: "bg-white border border-slate-200/80 text-slate-900 shadow-chic-card hover:border-slate-300/80",
    dark: "bg-slate-900/90 border border-slate-800 text-white shadow-chic-dark backdrop-blur-xs",
    bordered: "bg-slate-50/50 border border-slate-200/80 text-slate-900",
    interactive:
      "bg-white border border-slate-200/80 text-slate-900 shadow-chic-card hover:border-blue-500/50 hover:shadow-md",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${datum ? "technical-datum" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
