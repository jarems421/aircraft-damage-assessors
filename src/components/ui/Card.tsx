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
  const baseStyles = "relative p-6 sm:p-7 transition-all duration-150";

  const variants = {
    default: "bg-white border border-slate-200 text-slate-900 shadow-xs",
    dark: "bg-slate-900 border border-slate-800 text-white",
    bordered: "bg-transparent border border-slate-200 text-slate-900",
    interactive:
      "bg-white border border-slate-200 text-slate-900 hover:border-blue-500 hover:shadow-sm",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${datum ? "technical-datum" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
