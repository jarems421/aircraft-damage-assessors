import React from "react";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badgeText?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  badgeText,
  title,
  description,
  align = "left",
  theme = "light",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`mb-12 sm:mb-16 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"} ${className}`}
    >
      {badgeText && (
        <div className="mb-4">
          <Badge variant={isDark ? "primary" : "neutral"}>
            {badgeText}
          </Badge>
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base sm:text-lg lg:text-xl leading-relaxed font-normal ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
