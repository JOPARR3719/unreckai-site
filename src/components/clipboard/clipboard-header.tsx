"use client";

import { ScatterSymbol } from "@/components/scatter-symbol";

export function ClipboardHeader() {
  return (
    <div className="px-4 pt-4 pb-3">
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
        <div className="flex items-center gap-3">
          {/* Toggle — on state */}
          <div
            className="w-9 h-5 rounded-full flex items-center px-0.5"
            style={{ backgroundColor: "var(--color-brand-accentCleaned)" }}
          >
            <div className="w-4 h-4 rounded-full bg-white ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
