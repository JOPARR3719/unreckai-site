"use client";

import {
  Wand2,
  Type,
  Layers,
  ChevronRight,
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

            <ChevronRight size={18} className="text-brand-tagLabel shrink-0" />
          </button>
        );
      })}
    </div>
  );
}
