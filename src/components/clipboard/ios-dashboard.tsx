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
  ChevronLeft,
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
    count: 412,
  },
  {
    id: "formatting",
    name: "Formatting",
    icon: Type,
    iconSize: 14,
    color: "var(--color-brand-accentFormatting)",
    count: 1197,
  },
  {
    id: "ai-content",
    name: "AI Content",
    icon: RobotIcon,
    iconSize: 12,
    color: "var(--color-brand-accentAi)",
    count: 318,
  },
  {
    id: "document",
    name: "Structure",
    icon: Layers,
    iconSize: 14,
    color: "var(--color-brand-accentDocument)",
    count: 478,
  },
];

// ---------------------------------------------------------------------------
// Dashboard View
// ---------------------------------------------------------------------------

function DashboardView({ onIntelligenceClick }: { onIntelligenceClick?: () => void }) {
  return (
    <div className="flex flex-col gap-3 mt-2">
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
        <div className="flex-1" />
        <button
          onClick={onIntelligenceClick}
          className="flex items-center justify-center transition-transform hover:scale-105"
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: "linear-gradient(135deg, rgba(59,232,176,0.08), rgba(155,143,255,0.08))",
            border: "1px solid color-mix(in srgb, #3be8b0 40%, #9B8FFF)",
          }}
        >
          <span
            className="text-[13px] bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
            }}
          >
            &#x2728;
          </span>
        </button>
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
            <GradientPill>Today: 112</GradientPill>
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
              <GradientPill>Today: 5</GradientPill>
            </div>
          </div>
        </GradientCard>
        <GradientCard>
          <div className="flex flex-col items-center py-4 px-2 gap-0.5">
            <span className="text-2xl font-bold leading-none text-brand-textPrimary">
              19
            </span>
            <span className="text-[10px]" style={{ color: "var(--color-brand-accentDocument)" }}>
              Avg per Paste
            </span>
            <div className="mt-0.5">
              <GradientPill>Avg today: 38</GradientPill>
            </div>
          </div>
        </GradientCard>
      </div>

      {/* Category Breakdown */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-brand-textPrimary mb-3">
          Category Breakdown
        </h3>
        <div className="flex flex-col gap-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isRobot = cat.id === "ai-content";
            return (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-3 py-3 rounded-lg"
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
// Intelligence Summary (iOS)
// ---------------------------------------------------------------------------

const IOS_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Deep Clean": "Invisible characters, whitespace normalization, and encoding fixes that silently break formatting across apps.",
  "Formatting": "Em dashes, smart quotes, and typographic artifacts that AI tools insert but most destinations don't handle well.",
  "AI Content": "Chatbot greetings, filler phrases, sycophantic openers, and AI writing patterns that make text feel generated.",
  "Structure": "Structure translation for headings, lists, code blocks, and tables so they render as native formatting.",
};

const IOS_CAT_ORDER = [
  { name: "Formatting", count: 1197, color: "var(--color-brand-accentFormatting)" },
  { name: "Structure", count: 478, color: "var(--color-brand-accentDocument)" },
  { name: "Deep Clean", count: 412, color: "var(--color-brand-accentCleaned)" },
  { name: "AI Content", count: 318, color: "var(--color-brand-accentAi)" },
];

function IosIntelligenceSummary({ onBack }: { onBack: () => void }) {
  const total = 2405;
  const pastes = 128;
  const topCat = IOS_CAT_ORDER[0];
  const topPct = Math.round((topCat.count / total) * 100);
  const secondCat = IOS_CAT_ORDER[1];
  const secondPct = Math.round((secondCat.count / total) * 100);

  const prose = `UnreckAI has cleaned ${total.toLocaleString()} issues across ${pastes} pastes. ${topCat.name} corrections account for the majority at ${topPct}%, followed by ${secondCat.name} at ${secondPct}%.`;

  return (
    <div className="flex flex-col gap-3 mt-2 px-1">
      {/* Back + title inline */}
      <div className="flex items-center gap-2 mt-5">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-6 h-6 rounded-md transition-colors hover:bg-white/[0.05] shrink-0"
        >
          <ChevronLeft size={14} className="text-brand-textSecondary" />
        </button>
        <span
          className="text-xs bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
          }}
        >
          &#x2728;
        </span>
        <span className="text-[13px] font-normal text-brand-textPrimary">
          Intelligence Summary
        </span>
      </div>

      {/* Summary card */}
      <GradientCard>
        <div className="p-3.5 space-y-3">
          <p className="text-[11px] text-brand-textSecondary leading-relaxed">
            {prose}
          </p>

          {/* Gradient divider */}
          <div
            className="h-px opacity-40"
            style={{
              background:
                "linear-gradient(to right, var(--color-brand-accentCleaned), var(--color-brand-accentDocument), var(--color-brand-accentFormatting))",
            }}
          />

          {/* Per-category sections */}
          <div className="space-y-2.5">
            {IOS_CAT_ORDER.map((cat) => {
              const pct = Math.round((cat.count / total) * 100);
              return (
                <div key={cat.name}>
                  <p className="text-[11px] font-medium" style={{ color: cat.color }}>
                    {cat.name}: {cat.count} issues - {pct}%
                  </p>
                  <p className="text-[10px] text-brand-textSecondary leading-relaxed mt-0.5">
                    {IOS_CATEGORY_DESCRIPTIONS[cat.name]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </GradientCard>

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
  const [showIntelligence, setShowIntelligence] = useState(false);

  const handleTabChange = (tab: "dashboard" | "settings") => {
    setShowIntelligence(false);
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
      <div className="px-3 pt-1 pb-0 overflow-hidden" style={{ height: CONTENT_HEIGHT }}>
        {activeTab === "dashboard" ? (
          <div className="relative overflow-hidden" style={{ height: CONTENT_HEIGHT }}>
            {/* Dashboard */}
            <div
              className="transition-all duration-300 ease-in-out"
              style={{
                transform: showIntelligence ? "translateX(-100%)" : "translateX(0)",
                opacity: showIntelligence ? 0 : 1,
                position: showIntelligence ? "absolute" : "relative",
                top: 0,
                left: 0,
                width: "100%",
                pointerEvents: showIntelligence ? "none" : "auto",
              }}
            >
              <DashboardView onIntelligenceClick={() => setShowIntelligence(true)} />
            </div>
            {/* Intelligence Summary */}
            <div
              className="transition-all duration-300 ease-in-out"
              style={{
                transform: showIntelligence ? "translateX(0)" : "translateX(100%)",
                opacity: showIntelligence ? 1 : 0,
                position: showIntelligence ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                pointerEvents: showIntelligence ? "auto" : "none",
              }}
            >
              <IosIntelligenceSummary onBack={() => setShowIntelligence(false)} />
            </div>
          </div>
        ) : (
          <SettingsView />
        )}
      </div>

      {/* Tab bar pinned at bottom */}
      <FloatingTabBar activeTab={activeTab} onChange={handleTabChange} />
    </div>
  );
}
