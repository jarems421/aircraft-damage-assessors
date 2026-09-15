import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "outlineDark" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  external = false,
  icon,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-none tracking-tight";

  const variants = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 border border-blue-600 focus:ring-blue-600 shadow-xs",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 border border-slate-800 focus:ring-slate-700 shadow-xs",
    outline:
      "bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100 border border-slate-300 focus:ring-blue-600",
    outlineDark:
      "bg-slate-800/80 text-white hover:bg-slate-700 active:bg-slate-900 border border-slate-500 focus:ring-blue-400 shadow-xs",
    dark:
      "bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 focus:ring-blue-400",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-transparent focus:ring-blue-600",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2 min-h-[36px] gap-1.5",
    md: "text-sm px-5 py-2.5 min-h-[44px] gap-2",
    lg: "text-base px-6 py-3 min-h-[48px] gap-2.5 font-semibold",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          {icon && <span className="shrink-0">{icon}</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
