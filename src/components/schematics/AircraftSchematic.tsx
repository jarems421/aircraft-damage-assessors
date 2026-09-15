import React from "react";

export function AircraftSchematic() {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 p-6 sm:p-8 text-slate-300 font-mono text-xs overflow-hidden relative">
      {/* Header technical coordinates */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-5 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 shrink-0" />
          <span className="text-white font-medium tracking-wide font-sans text-xs">Conceptual Airframe Reference</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          <span>Illustrative Diagram</span>
        </div>
      </div>

      {/* SVG Diagram Container */}
      <div className="relative w-full max-w-2xl mx-auto py-2">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-auto text-slate-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid Background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Centerline Datum */}
          <line x1="100" y1="250" x2="700" y2="250" stroke="#334155" strokeDasharray="6 4" strokeWidth="1.5" />
          <text x="710" y="254" fill="#64748B" fontSize="10" fontFamily="sans-serif">CENTERLINE</text>

          {/* Wing Station Datums */}
          <line x1="400" y1="60" x2="400" y2="440" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          <text x="405" y="55" fill="#64748B" fontSize="10" fontFamily="sans-serif">WING REFERENCE</text>

          {/* Fuselage Outline */}
          <path
            d="M 160 250 
               C 170 235, 200 230, 260 230 
               L 520 230 
               C 590 232, 650 242, 680 250 
               C 650 258, 590 268, 520 270 
               L 260 270 
               C 200 270, 170 265, 160 250 Z"
            stroke="#94A3B8"
            strokeWidth="2"
            fill="rgba(30, 41, 59, 0.6)"
          />

          {/* Cockpit Windshield */}
          <path
            d="M 210 240 L 235 238 L 245 244 L 215 245 Z"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="rgba(96, 165, 250, 0.2)"
          />
          <path
            d="M 210 260 L 235 262 L 245 256 L 215 255 Z"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="rgba(96, 165, 250, 0.2)"
          />

          {/* Main Wings */}
          {/* Left Wing */}
          <path
            d="M 360 230 
               L 410 80 
               L 450 80 
               L 430 230 Z"
            stroke="#94A3B8"
            strokeWidth="2"
            fill="rgba(30, 41, 59, 0.4)"
          />
          {/* Right Wing */}
          <path
            d="M 360 270 
               L 410 420 
               L 450 420 
               L 430 270 Z"
            stroke="#94A3B8"
            strokeWidth="2"
            fill="rgba(30, 41, 59, 0.4)"
          />

          {/* Engine Nacelles */}
          <rect x="375" y="145" width="70" height="24" rx="4" stroke="#60A5FA" strokeWidth="1.5" fill="rgba(15, 23, 42, 0.8)" />
          <ellipse cx="375" cy="157" rx="3" ry="12" stroke="#60A5FA" strokeWidth="1.5" />
          <rect x="375" y="331" width="70" height="24" rx="4" stroke="#60A5FA" strokeWidth="1.5" fill="rgba(15, 23, 42, 0.8)" />
          <ellipse cx="375" cy="343" rx="3" ry="12" stroke="#60A5FA" strokeWidth="1.5" />

          {/* Horizontal Stabilizers */}
          <path
            d="M 620 245 L 660 170 L 685 170 L 670 248 Z"
            stroke="#94A3B8"
            strokeWidth="1.5"
            fill="rgba(30, 41, 59, 0.5)"
          />
          <path
            d="M 620 255 L 660 330 L 685 330 L 670 252 Z"
            stroke="#94A3B8"
            strokeWidth="1.5"
            fill="rgba(30, 41, 59, 0.5)"
          />

          {/* Controls / Flaps */}
          <line x1="422" y1="169" x2="435" y2="230" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="422" y1="331" x2="435" y2="270" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />

          {/* General Zone Markers (Neutral conceptual labels) */}
          <circle cx="160" cy="250" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="160" y1="250" x2="110" y2="190" stroke="#60A5FA" strokeWidth="1" />
          <rect x="25" y="165" width="135" height="24" fill="#0F172A" stroke="#3B82F6" strokeWidth="1" />
          <text x="32" y="181" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif">FORWARD AIRFRAME</text>

          <circle cx="410" cy="157" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="410" y1="157" x2="460" y2="115" stroke="#60A5FA" strokeWidth="1" />
          <rect x="460" y="100" width="145" height="24" fill="#0F172A" stroke="#3B82F6" strokeWidth="1" />
          <text x="468" y="116" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif">MID AIRFRAME SECTION</text>

          <circle cx="420" cy="80" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="420" y1="80" x2="420" y2="30" stroke="#60A5FA" strokeWidth="1" />
          <rect x="330" y="15" width="155" height="24" fill="#0F172A" stroke="#3B82F6" strokeWidth="1" />
          <text x="338" y="31" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif">WING ASSEMBLY</text>

          <circle cx="395" cy="250" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="395" y1="250" x2="320" y2="320" stroke="#60A5FA" strokeWidth="1" />
          <rect x="235" y="320" width="155" height="24" fill="#0F172A" stroke="#3B82F6" strokeWidth="1" />
          <text x="242" y="336" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif">CENTER AIRFRAME</text>

          <circle cx="660" cy="250" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="660" y1="250" x2="690" y2="310" stroke="#60A5FA" strokeWidth="1" />
          <rect x="635" y="310" width="145" height="24" fill="#0F172A" stroke="#3B82F6" strokeWidth="1" />
          <text x="642" y="326" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif">AFT AIRFRAME SECTION</text>
        </svg>
      </div>

      {/* Neutral Conceptual Caption */}
      <div className="border-t border-slate-800 pt-3 mt-4 text-slate-400 text-xs text-center font-sans">
        Illustrative airframe diagram representing general aircraft structure. Assessment scope and inspection focus are determined on an incident-by-incident basis.
      </div>
    </div>
  );
}
