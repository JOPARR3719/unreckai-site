"use client";

import { useState } from "react";
import {
  Wand2,
  Type,
  Layers,
  LayoutGrid,
  Settings,
  Quote,
  FileText,
  Sparkles,
  TextSearch,
  MinusCircle,
  Code2,
} from "lucide-react";
import { RobotIcon } from "../robot-icon";

// ---------------------------------------------------------------------------
// Inline helpers
// ---------------------------------------------------------------------------

function ScatterDots({ size = 16 }: { size?: number }) {
  const s = size / 5;
  const g = size / 10;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(3, ${s}px)`,
        gap: `${g}px`,
        width: size,
        height: size,
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[1px] bg-brand-textPrimary"
          style={{ width: s, height: s }}
        />
      ))}
    </div>
  );
}

function GradientCard({
  children,
  className = "",
  innerBg = "bg-brand-cardBg",
}: {
  children: React.ReactNode;
  className?: string;
  innerBg?: string;
}) {
  return (
    <div
      className={`rounded-xl p-[0.7px] ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
      }}
    >
      <div className={`rounded-[calc(0.75rem-0.7px)] ${innerBg}`}>
        {children}
      </div>
    </div>
  );
}

function GradientPill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full p-[0.7px] inline-flex ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
      }}
    >
      <div className="rounded-full bg-brand-cardBg px-2 py-0.5 text-[9px] text-brand-textPrimary">
        {children}
      </div>
    </div>
  );
}

function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
      }}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Segmented Picker
// ---------------------------------------------------------------------------

function SegmentedPicker({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-0.5 bg-brand-cardBg rounded-md p-0.5">
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              px-1.5 py-[3px] rounded text-[10px] leading-tight transition-all duration-150
              ${
                isActive
                  ? "font-medium"
                  : "text-brand-textTertiary hover:text-brand-textSecondary"
              }
            `}
            style={
              isActive
                ? {
                    border: "1px solid var(--color-brand-accentFormatting)",
                    backgroundColor: "color-mix(in srgb, var(--color-brand-accentFormatting) 10%, transparent)",
                    color: "var(--color-brand-accentFormatting)",
                  }
                : {
                    border: "1px solid var(--color-brand-borderLight)",
                  }
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grid Picker (2×3 for Em Dashes)
// ---------------------------------------------------------------------------

function GridPicker({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1 bg-brand-cardBg rounded-md p-1">
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              px-1.5 py-[3px] rounded text-[10px] leading-tight transition-all duration-150
              ${
                isActive
                  ? "font-medium text-brand-textPrimary"
                  : "text-brand-textTertiary hover:text-brand-textSecondary"
              }
            `}
            style={
              isActive
                ? {
                    border: "1px solid var(--color-brand-accentFormatting)",
                    backgroundColor: "color-mix(in srgb, var(--color-brand-accentFormatting) 10%, transparent)",
                  }
                : {
                    border: "1px solid var(--color-brand-borderLight)",
                  }
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-8 h-[18px] rounded-full transition-colors duration-200 flex-shrink-0"
      style={{
        backgroundColor: value
          ? "var(--color-brand-accentCleaned)"
          : "var(--color-brand-cardBg)",
        border: value
          ? "1px solid var(--color-brand-accentCleaned)"
          : "1px solid var(--color-brand-border)",
      }}
    >
      <div
        className="absolute top-[2px] w-3 h-3 rounded-full bg-white transition-all duration-200"
        style={{
          left: value ? "calc(100% - 14px)" : "2px",
        }}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Category data
// ---------------------------------------------------------------------------

interface CategoryRow {
  id: string;
  name: string;
  icon: React.ElementType;
  iconSize: number;
  color: string;
  count: number;
}

const CATEGORIES: CategoryRow[] = [
  {
    id: "cleaned",
    name: "Deep Clean",
    icon: Wand2,
    iconSize: 14,
    color: "var(--color-brand-accentCleaned)",
    count: 7,
  },
  {
    id: "formatting",
    name: "Formatting",
    icon: Type,
    iconSize: 14,
    color: "var(--color-brand-accentFormatting)",
    count: 22,
  },
  {
    id: "ai-content",
    name: "AI Content",
    icon: RobotIcon,
    iconSize: 12,
    color: "var(--color-brand-accentAi)",
    count: 7,
  },
  {
    id: "document",
    name: "Structure",
    icon: Layers,
    iconSize: 14,
    color: "var(--color-brand-accentDocument)",
    count: 8,
  },
];

// ---------------------------------------------------------------------------
// Dashboard View
// ---------------------------------------------------------------------------

function DashboardView() {
  return (
    <div className="flex flex-col gap-2.5 mt-2">
      {/* Header */}
      <div className="flex items-center gap-1.5 mt-5">
        <ScatterDots size={16} />
        <span className="font-semibold text-sm text-brand-textPrimary">
          UnreckAI
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          style={{
            border: "1px solid var(--color-brand-accentCleaned)",
            color: "var(--color-brand-accentCleaned)",
          }}
        >
          PRO
        </span>
      </div>

      {/* Hero card */}
      <GradientCard>
        <div className="flex flex-col items-center py-3 px-3 gap-1">
          <span className="text-[11px] text-brand-textSecondary">
            Total Issues Fixed
          </span>
          <GradientText className="text-4xl font-bold leading-none">
            2,405
          </GradientText>
          <div className="mt-1">
            <GradientPill>Today: 0</GradientPill>
          </div>
        </div>
      </GradientCard>
      <div className="grid grid-cols-2 gap-2">
        <GradientCard>
          <div className="flex flex-col items-center py-4 px-2 gap-0.5">
            <span className="text-2xl font-bold leading-none text-brand-textPrimary">
              128
            </span>
            <span className="text-[10px]" style={{ color: "var(--color-brand-accentCleaned)" }}>
              Pastes Cleaned
            </span>
            <div className="mt-0.5">
              <GradientPill>Today: 0</GradientPill>
            </div>
          </div>
        </GradientCard>
        <GradientCard>
          <div className="flex flex-col items-center py-4 px-2 gap-0.5">
            <span className="text-2xl font-bold leading-none text-brand-textPrimary">
              2,405
            </span>
            <span className="text-[10px]" style={{ color: "var(--color-brand-accentDocument)" }}>
              Issues Fixed
            </span>
            <div className="mt-0.5">
              <GradientPill>Today: 0</GradientPill>
            </div>
          </div>
        </GradientCard>
      </div>

      {/* Apple Intelligence badge */}
      <GradientCard>
        <div className="flex items-center gap-2 px-3 py-2.5">
          {/* Hidden SVG gradient def for icon stroke */}
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id="ios-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3be8b0" />
                <stop offset="50%" stopColor="#1aafd0" />
                <stop offset="100%" stopColor="#9B8FFF" />
              </linearGradient>
            </defs>
          </svg>
          <Sparkles
            size={14}
            strokeWidth={2}
            className="flex-shrink-0"
            style={{ stroke: "url(#ios-brand-grad)" }}
          />
          <span
            className="text-[12px] font-medium flex-1 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
            }}
          >
            Apple Intelligence
          </span>
          <span
            className="text-[12px] font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
            }}
          >
            23
          </span>
        </div>
      </GradientCard>

      {/* Category Breakdown */}
      <div className="mt-1.5">
        <h3 className="text-xs font-semibold text-brand-textPrimary mb-3">
          Category Breakdown
        </h3>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isRobot = cat.id === "ai-content";
            return (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cat.color} 6%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${cat.color} 20%, transparent)`,
                }}
              >
                <Icon
                  size={cat.iconSize}
                  style={{ color: cat.color }}
                  {...(!isRobot ? { strokeWidth: 2 } : {})}
                  className="flex-shrink-0"
                />

                {/* Name */}
                <span className="text-[13px] font-medium text-brand-textPrimary flex-1">
                  {cat.name}
                </span>

                {/* Count */}
                <span
                  className="text-[13px] font-bold"
                  style={{ color: cat.color }}
                >
                  {cat.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// ---------------------------------------------------------------------------
// Settings View
// ---------------------------------------------------------------------------

function SettingsView() {
  const [emDash, setEmDash] = useState("hyphen");
  const [smartQuotes, setSmartQuotes] = useState("code");
  const [aiStyle, setAiStyle] = useState("flag");
  const [codeContext, setCodeContext] = useState("auto");
  const [pdfRepair, setPdfRepair] = useState(true);
  const [aiSlop, setAiSlop] = useState(true);

  return (
    <div className="flex flex-col gap-2.5">
      {/* Header */}
      <h2 className="text-lg font-semibold text-brand-textPrimary mt-3 mb-1">
        Settings
      </h2>

      {/* UnreckAI Rules section */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Wand2
            size={14}
            style={{ color: "var(--color-brand-accentFormatting)" }}
            strokeWidth={2}
          />
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--color-brand-accentFormatting)" }}
          >
            UnreckAI Rules
          </span>
        </div>
        <GradientCard>
          <div className="py-1 flex flex-col gap-0.5">
            <SettingRow label="Em Dashes" subtitle="Replace — dashes in AI text" icon={MinusCircle} last={false}>
              <SegmentedPicker
                options={[
                  { label: "Hyphen", value: "hyphen" },
                  { label: "Semi", value: "semicolon" },
                  { label: "Comma", value: "comma" },
                ]}
                value={emDash}
                onChange={setEmDash}
              />
            </SettingRow>

            <SettingRow label="Smart Quotes" subtitle="Straighten curly quotes" icon={Quote} last={false}>
              <SegmentedPicker
                options={[
                  { label: "Off", value: "off" },
                  { label: "Code only", value: "code" },
                  { label: "Always", value: "always" },
                ]}
                value={smartQuotes}
                onChange={setSmartQuotes}
              />
            </SettingRow>

<SettingRow label="Code Context" subtitle="How to handle code-like content" icon={Code2} last={false}>
              <SegmentedPicker
                options={[
                  { label: "Auto", value: "auto" },
                  { label: "Never", value: "never" },
                  { label: "Always", value: "always" },
                ]}
                value={codeContext}
                onChange={setCodeContext}
              />
            </SettingRow>

            <SettingRow label="AI Style Detection" subtitle="Spot AI writing habits" icon={TextSearch} last={false}>
              <SegmentedPicker
                options={[
                  { label: "Off", value: "off" },
                  { label: "Flag only", value: "flag" },
                  { label: "Auto-fix", value: "autofix" },
                ]}
                value={aiStyle}
                onChange={setAiStyle}
              />
            </SettingRow>

            <SettingRow label="PDF Repair" subtitle="Fix broken lines from PDFs" icon={FileText} inline last={false}>
              <Toggle value={pdfRepair} onChange={setPdfRepair} />
            </SettingRow>

            <SettingRow label="AI Slop Removal" subtitle="Strip chatbot intros & closers" icon={Sparkles} inline last>
              <Toggle value={aiSlop} onChange={setAiSlop} />
            </SettingRow>
          </div>
        </GradientCard>
      </div>

    </div>
  );
}

function SettingRow({
  label,
  subtitle,
  icon: Icon,
  inline,
  last,
  children,
}: {
  label: string;
  subtitle?: string;
  icon?: React.ElementType;
  inline?: boolean;
  last: boolean;
  children: React.ReactNode;
}) {
  if (inline) {
    return (
      <div
        className={`flex items-center justify-between px-3 py-2.5 gap-2 ${
          !last ? "border-b border-brand-border" : ""
        }`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {Icon && (
              <Icon
                size={11}
                style={{ color: "var(--color-brand-accentFormatting)" }}
                strokeWidth={2}
                className="flex-shrink-0"
              />
            )}
            <span className="text-[11px] font-medium text-brand-textPrimary whitespace-nowrap">
              {label}
            </span>
          </div>
          {subtitle && (
            <span className="text-[9px] text-brand-textTertiary mt-0.5 block pl-[17px]">
              {subtitle}
            </span>
          )}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`px-3 py-2.5 ${
        !last ? "border-b border-brand-border" : ""
      }`}
    >
      <div className="flex items-center gap-1.5">
        {Icon && (
          <Icon
            size={11}
            style={{ color: "var(--color-brand-accentFormatting)" }}
            strokeWidth={2}
            className="flex-shrink-0"
          />
        )}
        <span className="text-[11px] font-medium text-brand-textPrimary whitespace-nowrap">
          {label}
        </span>
      </div>
      {subtitle && (
        <span className="text-[9px] text-brand-textTertiary mt-0.5 mb-1 block pl-[17px]">
          {subtitle}
        </span>
      )}
      {!subtitle && <div className="mb-1" />}
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Floating Tab Bar
// ---------------------------------------------------------------------------

function FloatingTabBar({
  activeTab,
  onChange,
}: {
  activeTab: "dashboard" | "settings";
  onChange: (tab: "dashboard" | "settings") => void;
}) {
  const tabs: { id: "dashboard" | "settings"; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="px-4 pt-0 pb-0">
      <div className="flex justify-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-1.5 py-1.5"
          style={{ border: "1px solid var(--color-brand-border)" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-full text-[9px] font-medium transition-all ${
                  isActive
                    ? "text-brand-textPrimary"
                    : "text-brand-textTertiary hover:text-brand-textSecondary"
                }`}
                style={isActive ? {
                  border: "1px solid transparent",
                  backgroundImage: "linear-gradient(var(--color-brand-bg), var(--color-brand-bg)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                } : { border: "1px solid var(--color-brand-border)" }}
              >
                <Icon size={16} strokeWidth={1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

// Fixed content height so Dashboard and Settings render identically tall —
// the phone frame never jumps when switching tabs.
const CONTENT_HEIGHT = 570;

export function IosDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "settings">(
    "dashboard"
  );

  return (
    <div className="flex flex-col">
      <div className="px-3 pt-1 pb-0 overflow-hidden" style={{ height: CONTENT_HEIGHT }}>
        {activeTab === "dashboard" ? <DashboardView /> : <SettingsView />}
      </div>

      {/* Tab bar pinned at bottom */}
      <FloatingTabBar activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
