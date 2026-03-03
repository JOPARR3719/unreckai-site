"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SETTINGS_SECTIONS, type SettingsSection, type SettingRow } from "./clipboard-data";

const PURPLE = "var(--color-brand-accentFormatting)";

interface ClipboardSettingsProps {
  view: "overview" | "drill";
  drillSectionId: string | null;
  onDrill: (sectionId: string) => void;
  onBack: () => void;
}

export function ClipboardSettings({
  view,
  drillSectionId,
  onDrill,
  onBack,
}: ClipboardSettingsProps) {
  const activeSection = SETTINGS_SECTIONS.find((s) => s.id === drillSectionId);

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
        <SettingsSectionList onDrill={onDrill} />
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
          <SettingsDrill section={activeSection} onBack={onBack} />
        )}
      </div>
    </div>
  );
}

function SettingsSectionList({ onDrill }: { onDrill: (id: string) => void }) {
  return (
    <div className="space-y-4 px-4 pb-3">
      {SETTINGS_SECTIONS.map((section) => {
        if (section.standalone) {
          return (
            <div
              key={section.id}
              className="rounded-xl p-[0.7px]"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
              }}
            >
              <div className="rounded-[calc(0.75rem-0.7px)] bg-brand-cardBg p-4">
                <h3 className="text-sm font-semibold" style={{ color: PURPLE }}>
                  {section.title.includes(": ") ? (
                    <>
                      {section.title.split(": ")[0]}:{" "}
                      <span className="text-brand-accentCleaned font-bold">{section.title.split(": ")[1]}</span>
                    </>
                  ) : (
                    section.title
                  )}
                </h3>
                <p className="text-xs text-brand-textSecondary mt-0.5">
                  {section.subtitle}
                </p>
              </div>
            </div>
          );
        }

        return (
          <button
            key={section.id}
            onClick={() => onDrill(section.id)}
            className="w-full text-left rounded-xl p-[0.7px] block"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
            }}
          >
            <div className="rounded-[calc(0.75rem-0.7px)] bg-brand-cardBg p-4 flex items-center gap-3 group">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold" style={{ color: PURPLE }}>
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
                  color: PURPLE,
                  backgroundColor: `color-mix(in srgb, ${PURPLE} 12%, transparent)`,
                }}
              >
                {section.settings.length}
              </span>
              <ChevronRight
                size={14}
                className="text-brand-tagLabel shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SettingsDrill({
  section,
  onBack,
}: {
  section: SettingsSection;
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
        <span className="text-xs font-semibold" style={{ color: PURPLE }}>
          {section.title}
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"
          style={{
            backgroundColor: `color-mix(in srgb, ${PURPLE} 12%, transparent)`,
            color: PURPLE,
          }}
        >
          {section.settings.length}
        </span>
      </button>

      {/* Settings card */}
      <div
        className="rounded-xl p-[0.7px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <div className="rounded-[calc(0.75rem-0.7px)] bg-brand-cardBg overflow-hidden">
          {section.settings.map((setting, i) => (
            <div
              key={setting.label}
              className={`px-4 py-3 ${
                i < section.settings.length - 1 ? "border-b border-brand-border" : ""
              }`}
            >
              {setting.type === "picker" ? (
                <PickerRow setting={setting} />
              ) : (
                <ToggleRow setting={setting} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PickerRow({ setting }: { setting: SettingRow }) {
  const [selected, setSelected] = useState(setting.value as string);

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-brand-textSecondary shrink-0">
        {setting.label}
      </span>
      <div
        className="flex rounded-md p-0.5"
        style={{ backgroundColor: "var(--color-brand-bgSurface)" }}
      >
        {setting.options!.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className="px-2 py-1 rounded text-xs transition-all"
              style={{
                color: isSelected
                  ? "var(--color-brand-textPrimary)"
                  : "var(--color-brand-textSecondary)",
                fontWeight: isSelected ? 500 : 400,
                border: isSelected
                  ? `1px solid ${PURPLE}`
                  : "0.5px solid var(--color-brand-border)",
                backgroundColor: isSelected
                  ? "var(--color-brand-cardBg)"
                  : "transparent",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleRow({ setting }: { setting: SettingRow }) {
  const [on, setOn] = useState(setting.value as boolean);

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-brand-textSecondary">
        {setting.label}
      </span>
      <button
        onClick={() => setOn(!on)}
        className="w-9 h-5 rounded-full flex items-center px-0.5 transition-colors"
        style={{
          backgroundColor: on
            ? "var(--color-brand-accentCleaned)"
            : "var(--color-brand-borderSolid)",
        }}
      >
        <div
          className="w-4 h-4 rounded-full bg-white transition-transform"
          style={{ transform: on ? "translateX(16px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}
