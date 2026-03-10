"use client";

import { ScatterSymbol } from "@/components/scatter-symbol";

export function ClipboardHeader() {
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
      </div>
    </div>
  );
}
