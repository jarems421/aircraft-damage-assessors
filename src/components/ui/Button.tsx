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
    "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl tracking-tight select-none active:scale-[0.98] active:translate-y-[1px]";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 border border-blue-400/40 shadow-thock-primary focus:ring-blue-500",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 active:bg-black border border-slate-700/80 shadow-thock-dark focus:ring-slate-700",
    outline:
      "bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100 border border-slate-300 shadow-thock-light focus:ring-blue-600",
    outlineDark:
      "bg-slate-800/80 text-white hover:bg-slate-700 hover:border-slate-400/60 active:bg-slate-900 border border-slate-700/80 focus:ring-blue-400 shadow-sm backdrop-blur-xs",
    dark:
      "bg-slate-800/90 text-slate-100 hover:bg-slate-700 active:bg-slate-900 border border-slate-600/50 shadow-thock-dark focus:ring-blue-400",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-transparent focus:ring-blue-600",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 min-h-[38px] gap-2",
    md: "text-sm px-5 py-2.5 min-h-[44px] gap-2 font-medium",
    lg: "text-base px-7 py-3.5 min-h-[50px] gap-2.5 font-semibold",
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
