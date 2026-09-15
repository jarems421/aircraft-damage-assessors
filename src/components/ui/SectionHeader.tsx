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
      className={`mb-10 sm:mb-14 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"} ${className}`}
    >
      {badgeText && (
        <div className="mb-3">
          <Badge variant={isDark ? "dark" : "neutral"} mono>
            {badgeText}
          </Badge>
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
