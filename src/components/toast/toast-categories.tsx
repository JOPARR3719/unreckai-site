"use client";

import {
  Wand2,
  Type,
  Layers,
} from "lucide-react";
import { RobotIcon } from "../robot-icon";
import type { CategoryData } from "./toast-data";
import type { ClickTarget } from "./interactive-toast";

const ICON_MAP: Record<string, React.ElementType> = {
  Wand2,
  Type,
  RobotIcon,
  Layers,
};

const ACCENT_CSS: Record<string, string> = {
  "brand-accentCleaned": "var(--color-brand-accentCleaned)",
  "brand-accentFormatting": "var(--color-brand-accentFormatting)",
  "brand-accentAi": "var(--color-brand-accentAi)",
  "brand-accentDocument": "var(--color-brand-accentDocument)",
};

interface ToastCategoriesProps {
  categories: CategoryData[];
  onDrill: (category: CategoryData) => void;
  clickTarget?: ClickTarget;
}

export function ToastCategories({
  categories,
  onDrill,
  clickTarget,
}: ToastCategoriesProps) {
  return (
    <div className="flex flex-col gap-2">
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.icon];
        const accent = ACCENT_CSS[cat.accentColor];

        return (
          <button
            key={cat.id}
            onClick={() => onDrill(cat)}
            className="w-full flex items-center gap-2.5 rounded-lg transition-colors hover:bg-white/[0.03] group text-left"
            style={{
              padding: "9px 12px",
              backgroundColor: "var(--color-brand-fixCardBg)",
              border: "0.5px solid var(--color-brand-border)",
              animation: clickTarget === `category-${cat.id}` ? "toast-click-pulse 900ms ease-out" : undefined,
            }}
          >
            {/* Icon */}
            <div className="shrink-0" style={{ color: accent }}>
              {Icon && <Icon size={cat.icon === "RobotIcon" ? 14 : 16} strokeWidth={2.2} />}
            </div>

            {/* Name */}
            <span
              className="font-semibold flex-1 min-w-0"
              style={{ fontSize: "12.5px", color: accent }}
            >
              {cat.name}
            </span>

            {/* Count */}
            <span
              className="text-xs font-bold shrink-0"
              style={{ fontSize: 13, color: accent }}
            >
              {cat.fixCount}
            </span>

            {/* Filled gradient checkmark circle */}
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <defs>
                <linearGradient id={`check-grad-${cat.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3be8b0" />
                  <stop offset="50%" stopColor="#1aafd0" />
                  <stop offset="100%" stopColor="#9B8FFF" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="11" fill={`url(#check-grad-${cat.id})`} />
              <path d="m9 12 2 2 4-4" stroke="var(--color-brand-bgSurface)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
