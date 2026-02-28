"use client";

import {
  Wand2,
  Type,
  Layers,
  ChevronRight,
} from "lucide-react";
import { RobotIcon } from "../robot-icon";
import type { CategoryData } from "./toast-data";

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
}

export function ToastCategories({
  categories,
  onDrill,
}: ToastCategoriesProps) {
  return (
    <div className="px-3 py-1">
      {categories.map((cat, i) => {
        const Icon = ICON_MAP[cat.icon];
        const accent = ACCENT_CSS[cat.accentColor];

        return (
          <div key={cat.id}>
            <button
              onClick={() => onDrill(cat)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/[0.03] group text-left"
            >
              {/* Icon — offset up to align with title, not subtitle */}
              <div className="shrink-0 -translate-y-[6px] -translate-x-[3px]" style={{ color: accent }}>
                {Icon && <Icon size={cat.icon === "RobotIcon" ? 14 : 16} strokeWidth={2.2} />}
              </div>

              {/* Name + subtitle */}
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold leading-tight"
                  style={{ fontSize: "12.5px", color: accent }}
                >
                  {cat.name}
                </div>
                <div className="text-xs text-brand-textSecondary mt-0.5">
                  {cat.subtitle}
                </div>
              </div>

              {/* Count badge */}
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0"
                style={{
                  fontSize: 11,
                  color: accent,
                  backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                }}
              >
                {cat.fixCount}
              </span>

              {/* Chevron */}
              <ChevronRight
                size={14}
                className="text-brand-tagLabel shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </button>
            {i < categories.length - 1 && (
              <div className="h-px bg-white/[0.08] mx-3" />
            )}
          </div>
        );
      })}
    </div>
  );
}
