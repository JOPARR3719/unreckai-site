"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MinusCircle,
  Quote,
  Code2,
  TextSearch,
  FileText,
  Sparkles,
  Wand2,
  Zap,
  Shield,
  Mail,
  ExternalLink,
} from "lucide-react";
import { SETTINGS_SECTIONS, type SettingsSection, type SettingRow } from "./clipboard-data";
import { CHANGELOG_ENTRIES } from "../faq-changelog-data";

const SETTING_ICONS: Record<string, React.ElementType> = {
  "minus-circle": MinusCircle,
  "quote": Quote,
  "code-2": Code2,
  "text-search": TextSearch,
  "file-text": FileText,
  "sparkles": Sparkles,
  "shield": Shield,
  "mail": Mail,
};

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
          activeSection.id === "changelog"
            ? <ChangelogDrill onBack={onBack} />
            : activeSection.id === "support"
            ? <SupportDrill onBack={onBack} />
            : <SettingsDrill section={activeSection} onBack={onBack} />
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
                {section.id === "changelog" ? CHANGELOG_ENTRIES.length : section.settings.length}
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

      {/* Section label with icon — matches iOS dashboard */}
      {section.id === "cleaning" && (
        <div className="flex items-center gap-1.5 mb-2">
          <Wand2
            size={14}
            style={{ color: PURPLE }}
            strokeWidth={2}
          />
          <span className="text-xs font-semibold" style={{ color: PURPLE }}>
            {section.title}
          </span>
        </div>
      )}

      {/* Settings card */}
      <div
        className="rounded-xl p-[0.7px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <div className="rounded-[calc(0.75rem-0.7px)] bg-brand-cardBg overflow-hidden py-1">
          {section.settings.map((setting, i) => (
            <div
              key={setting.label}
              className={`px-3 py-2.5 ${
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

function SettingLabel({ setting }: { setting: SettingRow }) {
  const Icon = setting.icon ? SETTING_ICONS[setting.icon] : null;
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        {Icon && (
          <Icon
            size={11}
            style={{ color: PURPLE }}
            strokeWidth={2}
            className="flex-shrink-0"
          />
        )}
        <span className="text-[11px] font-medium text-brand-textPrimary whitespace-nowrap">
          {setting.label}
        </span>
      </div>
      {setting.subtitle && (
        <span className="text-[9px] text-brand-textTertiary mt-0.5 block pl-[17px]">
          {setting.subtitle}
        </span>
      )}
    </div>
  );
}

function PickerRow({ setting }: { setting: SettingRow }) {
  const [selected, setSelected] = useState(setting.value as string);

  return (
    <div>
      <SettingLabel setting={setting} />
      <div className="mt-1.5">
        <div className="flex gap-0.5 rounded-md p-0.5" style={{ backgroundColor: "var(--color-brand-bgSurface)" }}>
          {setting.options!.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className="px-2 py-1 rounded text-[10px] leading-tight transition-all"
                style={{
                  color: isSelected
                    ? PURPLE
                    : "var(--color-brand-textTertiary)",
                  fontWeight: isSelected ? 500 : 400,
                  border: isSelected
                    ? `1px solid ${PURPLE}`
                    : "1px solid var(--color-brand-border)",
                  backgroundColor: isSelected
                    ? `color-mix(in srgb, ${PURPLE} 10%, transparent)`
                    : "transparent",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ setting }: { setting: SettingRow }) {
  const [on, setOn] = useState(setting.value as boolean);

  return (
    <div className="flex items-center justify-between gap-2">
      <SettingLabel setting={setting} />
      <button
        onClick={() => setOn(!on)}
        className="relative w-8 h-[18px] rounded-full transition-colors duration-200 flex-shrink-0"
        style={{
          backgroundColor: on
            ? "var(--color-brand-accentCleaned)"
            : "var(--color-brand-bgSurface)",
          border: on
            ? "1px solid var(--color-brand-accentCleaned)"
            : "1px solid var(--color-brand-border)",
        }}
      >
        <div
          className="absolute top-[2px] w-3 h-3 rounded-full bg-white transition-all duration-200"
          style={{ left: on ? "calc(100% - 14px)" : "2px" }}
        />
      </button>
    </div>
  );
}

function SupportDrill({ onBack }: { onBack: () => void }) {
  const links = [
    { label: "Privacy Policy", icon: Shield, href: "https://unreckai.com/privacy" },
    { label: "Contact Support", icon: Mail, href: "mailto:support@unreckai.com" },
  ];

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
          Support
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"
          style={{
            backgroundColor: `color-mix(in srgb, ${PURPLE} 12%, transparent)`,
            color: PURPLE,
          }}
        >
          {links.length}
        </span>
      </button>

      {/* Support card */}
      <div
        className="rounded-xl p-[0.7px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <div className="rounded-[calc(0.75rem-0.7px)] bg-brand-cardBg overflow-hidden py-1">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <div
                key={link.label}
                className={`flex items-center gap-2.5 px-3 py-2.5 ${
                  i < links.length - 1 ? "border-b border-brand-border" : ""
                }`}
              >
                <Icon
                  size={11}
                  style={{ color: PURPLE }}
                  strokeWidth={2}
                  className="flex-shrink-0"
                />
                <span className="text-[11px] font-medium text-brand-textPrimary flex-1">
                  {link.label}
                </span>
                <ExternalLink
                  size={10}
                  className="text-brand-textTertiary flex-shrink-0"
                  strokeWidth={2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ChangelogDrill({ onBack }: { onBack: () => void }) {
  const [openVersion, setOpenVersion] = useState<number | null>(null);

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
          Changelog
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"
          style={{
            backgroundColor: `color-mix(in srgb, ${PURPLE} 12%, transparent)`,
            color: PURPLE,
          }}
        >
          {CHANGELOG_ENTRIES.length}
        </span>
      </button>

      {/* Changelog card */}
      <div
        className="rounded-xl p-[0.7px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <div className="rounded-[calc(0.75rem-0.7px)] bg-brand-cardBg overflow-hidden py-1">
          {CHANGELOG_ENTRIES.map((entry, idx) => {
            const isOpen = openVersion === idx;
            const isLatest = idx === 0;

            return (
              <div
                key={entry.version}
                className={
                  idx < CHANGELOG_ENTRIES.length - 1
                    ? "border-b border-brand-border"
                    : ""
                }
              >
                <button
                  onClick={() =>
                    setOpenVersion((prev) => (prev === idx ? null : idx))
                  }
                  className="w-full px-3 py-2.5 flex items-center gap-2"
                >
                  {/* Gradient dot for latest */}
                  {isLatest ? (
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #3be8b0, #1aafd0, #9B8FFF, #3be8b0)",
                        boxShadow:
                          "0 0 6px rgba(59,232,176,0.4), 0 0 10px rgba(155,143,255,0.2)",
                      }}
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-brand-textTertiary shrink-0 opacity-50" />
                  )}

                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: PURPLE }}
                  >
                    {entry.version}
                  </span>
                  <span className="text-[10px] text-brand-textTertiary">
                    {entry.date}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`ml-auto text-brand-textTertiary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsible items */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "max-h-[200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-3 pb-2.5 space-y-1.5">
                    {entry.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-1.5"
                      >
                        <Zap
                          size={10}
                          className="text-brand-textTertiary shrink-0 mt-[2px]"
                        />
                        <span className="text-[10px] text-brand-textSecondary leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
