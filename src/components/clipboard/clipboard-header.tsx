"use client";

import { ScatterSymbol } from "@/components/scatter-symbol";

interface ClipboardHeaderProps {
  onIntelligenceClick?: () => void;
}

export function ClipboardHeader({ onIntelligenceClick }: ClipboardHeaderProps) {
  return (
    <div className="px-4 pt-5 pb-3">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <ScatterSymbol size={20} className="text-brand-textPrimary shrink-0" />
          <span className="text-sm font-semibold text-brand-textPrimary">
            UnreckAI
          </span>
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{
              color: "var(--color-brand-bg)",
              backgroundColor: "var(--color-brand-accentCleaned)",
            }}
          >
            PRO
          </span>
        </div>
        <div className="flex-1" />
        {/* Intelligence button */}
        <button
          onClick={onIntelligenceClick}
          className="flex items-center justify-center transition-transform hover:scale-105"
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg, rgba(59,232,176,0.08), rgba(155,143,255,0.08))",
            border: "1px solid color-mix(in srgb, #3be8b0 40%, #9B8FFF)",
            boxShadow: "0 0 6px rgba(59,232,176,0.15), 0 0 8px rgba(155,143,255,0.10)",
          }}
        >
          <span
            className="text-[13px] bg-clip-text text-transparent leading-none"
            style={{
              backgroundImage: "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
            }}
          >
            &#x2728;
          </span>
        </button>
      </div>
    </div>
  );
}
