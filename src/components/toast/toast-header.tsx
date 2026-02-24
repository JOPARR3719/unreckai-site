"use client";

import { X } from "lucide-react";
import { ScatterSymbol } from "@/components/scatter-symbol";

interface ToastHeaderProps {
  issueCount: number;
  detailsOpen: boolean;
  onToggleDetails: () => void;
}

export function ToastHeader({
  issueCount,
  detailsOpen,
  onToggleDetails,
}: ToastHeaderProps) {
  return (
    <div>
      {/* Row 1: Logo + title + badge + undo + close */}
      <div className="flex items-center gap-1.5 px-4 pt-3.5">
        <ScatterSymbol size={20} className="text-brand-textPrimary shrink-0" />
        <span className="font-semibold text-sm text-brand-textPrimary">
          UnreckAI
        </span>

        {/* Issue count badge */}
        <span
          className="ml-1 text-xs font-normal px-2 py-0.5 rounded-full"
          style={{
            color: "var(--color-brand-accentCleaned)",
            backgroundColor: "rgba(59, 232, 176, 0.12)",
            border: "1px solid rgba(59, 232, 176, 0.2)",
          }}
        >
          {issueCount}
        </span>

        <div className="flex-1" />

        {/* Undo button */}
        <button
          className="text-xs font-normal px-2.5 py-1 rounded-md text-brand-tagLabel"
          style={{
            backgroundColor: "var(--color-brand-undoBtnBg)",
            border: "1px solid var(--color-brand-undoBtnBorder)",
          }}
        >
          Undo
        </button>

        {/* Close button */}
        <button
          className="p-1 rounded-md text-brand-tagLabel"
          style={{
            border: "1px solid var(--color-brand-borderSolid)",
          }}
        >
          <X size={13} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-2.5 mx-4 h-[2px] rounded-full bg-brand-borderSolid overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: "70%",
            background: "linear-gradient(to right, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
          }}
        />
      </div>

      {/* Row 2: Timer + Details */}
      <div className="flex items-center mt-3 px-4 pb-3">
        <span className="text-xs text-brand-textSecondary">
          timer paused while viewing
        </span>
        <div className="flex-1" />
        <button
          onClick={onToggleDetails}
          className="text-xs font-normal text-brand-tagLabel rounded-md px-3 py-1"
          style={{
            width: 92,
            backgroundImage: `linear-gradient(var(--color-brand-cardBg), var(--color-brand-cardBg)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "1px solid transparent",
          }}
        >
          Details {detailsOpen ? "\u2303" : "\u2304"}
        </button>
      </div>
    </div>
  );
}
