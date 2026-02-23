"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EXCLUSION_SECTIONS, type ExclusionSection } from "./clipboard-data";

interface ClipboardExcludedProps {
  view: "overview" | "drill";
  drillSectionId: string | null;
  onDrill: (sectionId: string) => void;
  onBack: () => void;
}

const CYAN = "var(--color-brand-accentDocument)";

export function ClipboardExcluded({
  view,
  drillSectionId,
  onDrill,
  onBack,
}: ClipboardExcludedProps) {
  const activeSection = EXCLUSION_SECTIONS.find((s) => s.id === drillSectionId);

  return (
    <div className="relative overflow-hidden">
      {/* Overview */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          transform: view === "overview" ? "translateX(0)" : "translateX(-100%)",
          opacity: view === "overview" ? 1 : 0,
          position: view === "overview" ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: view === "overview" ? "auto" : "none",
        }}
      >
        <SectionList onDrill={onDrill} />
      </div>

      {/* Drill */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          transform: view === "drill" ? "translateX(0)" : "translateX(100%)",
          opacity: view === "drill" ? 1 : 0,
          position: view === "drill" ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: view === "drill" ? "auto" : "none",
        }}
      >
        {activeSection && (
          <ExclusionDrill section={activeSection} onBack={onBack} />
        )}
      </div>
    </div>
  );
}

function SectionList({ onDrill }: { onDrill: (id: string) => void }) {
  return (
    <div className="space-y-3 px-4 pb-3">
      {EXCLUSION_SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => onDrill(section.id)}
          className="w-full text-left rounded-xl p-[1px] block"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
          }}
        >
          <div className="rounded-[calc(0.75rem-1px)] bg-brand-cardBg p-4 flex items-center gap-3 group">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold" style={{ color: CYAN }}>
                {section.title}
              </h3>
              <p className="text-xs text-brand-textSecondary mt-0.5">
                {section.subtitle}
              </p>
            </div>
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0"
              style={{
                fontSize: 11,
                color: CYAN,
                backgroundColor: `color-mix(in srgb, ${CYAN} 12%, transparent)`,
              }}
            >
              {section.apps.length}
            </span>
            <ChevronRight
              size={14}
              className="text-brand-tagLabel shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </button>
      ))}
    </div>
  );
}

function ExclusionDrill({
  section,
  onBack,
}: {
  section: ExclusionSection;
  onBack: () => void;
}) {
  return (
    <div className="px-4 pb-3">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded-md transition-colors hover:bg-white/[0.03]"
        style={{
          border: "1px solid transparent",
          backgroundImage: `linear-gradient(var(--color-brand-bgSurface), var(--color-brand-bgSurface)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <ChevronLeft size={14} className="text-brand-tagLabel" />
        <span className="text-xs font-semibold" style={{ color: CYAN }}>
          {section.title}
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"
          style={{
            backgroundColor: `color-mix(in srgb, ${CYAN} 12%, transparent)`,
            color: CYAN,
          }}
        >
          {section.apps.length}
        </span>
      </button>

      {/* App list card */}
      <div
        className="rounded-xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <div className="rounded-[calc(0.75rem-1px)] bg-brand-cardBg overflow-hidden">
          {section.apps.map((app, i) => (
            <div
              key={app.name}
              className={`flex items-center gap-3 px-4 py-3 ${
                i < section.apps.length - 1 ? "border-b border-brand-border" : ""
              }`}
            >
              {/* Cyan dot */}
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: CYAN }}
              />
              <span className="text-sm text-brand-textPrimary flex-1">
                {app.name}
              </span>
              <button className="w-5 h-5 rounded-full flex items-center justify-center text-brand-textTertiary hover:text-brand-textSecondary hover:bg-white/[0.05] transition-colors">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reset button */}
      <button
        className="w-full mt-3 py-2 rounded-lg text-xs font-medium text-brand-textSecondary transition-colors hover:bg-white/[0.03]"
        style={{
          border: "1px solid var(--color-brand-borderSolid)",
          backgroundColor: "var(--color-brand-neutralBtnBg)",
        }}
      >
        Reset to defaults
      </button>
    </div>
  );
}
