"use client";

import { useState } from "react";
import { Wand2, Type, Layers, Lightbulb } from "lucide-react";
import { ScatterSymbol } from "./scatter-symbol";
import { TOAST_DATA, type CategoryData } from "./toast/toast-data";

interface CategoryIconConfig {
  icon: React.ElementType;
  size: number;
  strokeWidth?: number;
}

const CATEGORY_ICONS: Record<string, CategoryIconConfig> = {
  cleaned: { icon: Wand2, size: 22, strokeWidth: 1.5 },
  formatting: { icon: Type, size: 22, strokeWidth: 1.5 },
  "ai-content": { icon: Lightbulb, size: 20 },
  document: { icon: Layers, size: 22, strokeWidth: 1.5 },
};

const CATEGORY_COLORS: Record<string, string> = {
  cleaned: "var(--color-brand-accentCleaned)",
  formatting: "var(--color-brand-accentFormatting)",
  "ai-content": "var(--color-brand-accentAi)",
  document: "var(--color-brand-accentDocument)",
};

function IconSquare({
  isActive,
  color,
  onClick,
  children,
}: {
  isActive: boolean;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
      style={{
        backgroundColor: "var(--color-brand-itemBg)",
        border: isActive
          ? `1.5px solid ${color ?? "var(--color-brand-accentCleaned)"}`
          : "1.5px solid transparent",
        boxShadow: isActive
          ? `0 0 12px color-mix(in srgb, ${color ?? "var(--color-brand-accentCleaned)"} 35%, transparent)`
          : "none",
      }}
    >
      {children}
    </button>
  );
}

function CategoryIcon({
  categoryId,
  isActive,
}: {
  categoryId: string;
  isActive: boolean;
}) {
  const cfg = CATEGORY_ICONS[categoryId];
  if (!cfg) return null;
  const Icon = cfg.icon;
  const color = CATEGORY_COLORS[categoryId];

  return (
    <Icon
      size={cfg.size}
      style={{ color: isActive ? color : "var(--color-brand-tagLabel)" }}
      {...(cfg.strokeWidth ? { strokeWidth: cfg.strokeWidth } : {})}
    />
  );
}

function SummaryView({
  categories,
  onSelectCategory,
}: {
  categories: CategoryData[];
  onSelectCategory: (id: string) => void;
}) {
  const totalFixes = categories.reduce((sum, c) => sum + c.fixCount, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1 pb-1">
        <span className="text-xs font-semibold text-brand-textPrimary">
          UnreckAI
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-brand-accentCleaned) 15%, transparent)",
            color: "var(--color-brand-accentCleaned)",
          }}
        >
          {totalFixes} fixes
        </span>
      </div>
      {categories.map((cat) => {
        const cfg = CATEGORY_ICONS[cat.id];
        if (!cfg) return null;
        const Icon = cfg.icon;
        const color = CATEGORY_COLORS[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-brand-itemBg text-left"
            style={{
              backgroundColor: "var(--color-brand-cardBg)",
              border: "1px solid var(--color-brand-borderSolid)",
            }}
          >
            <Icon
              size={14}
              style={{ color }}
              {...(cfg.strokeWidth ? { strokeWidth: cfg.strokeWidth } : {})}
            />
            <span className="text-xs font-semibold flex-1" style={{ color }}>
              {cat.name}
            </span>
            <span className="text-[10px] text-brand-textSecondary">
              {cat.fixCount} fixes
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-brand-tagLabel)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function CategoryDetailView({
  category,
  onBack,
}: {
  category: CategoryData;
  onBack: () => void;
}) {
  const color = CATEGORY_COLORS[category.id];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1 pb-1">
        <button
          onClick={onBack}
          className="text-brand-tagLabel hover:text-brand-textPrimary transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="text-xs font-semibold" style={{ color }}>
          {category.name}
        </span>
        <span className="text-[10px] text-brand-textSecondary">
          {category.fixCount} fixes
        </span>
      </div>
      {category.issues.map((issue) => (
        <div
          key={issue.type}
          className="rounded-lg px-3 py-2.5"
          style={{
            backgroundColor: "var(--color-brand-cardBg)",
            border: "1px solid var(--color-brand-borderSolid)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-brand-textSecondary flex-1">
              {issue.label}
            </span>
            {issue.count > 1 && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  color,
                  backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                }}
              >
                {issue.count}
              </span>
            )}
          </div>
          {issue.previews && issue.previews[0] && (
            <div className="mt-2 space-y-1.5">
              <div className="text-[9px] font-bold uppercase tracking-wider text-brand-textTertiary">
                Before
              </div>
              <div
                className="text-[11px] text-brand-textSecondary px-2 py-1.5 rounded"
                style={{
                  backgroundColor: "var(--color-brand-bgSurface)",
                  border: "1px solid var(--color-brand-border)",
                }}
              >
                {issue.previews[0].before || (
                  <span className="italic text-brand-textTertiary">empty</span>
                )}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-brand-textTertiary">
                After
              </div>
              <div
                className="text-[11px] text-brand-textSecondary px-2 py-1.5 rounded"
                style={{
                  backgroundColor: "var(--color-brand-bgSurface)",
                  border: "1px solid var(--color-brand-border)",
                }}
              >
                {issue.previews[0].after || (
                  <span className="italic text-brand-accentCleaned">
                    Removed entirely
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function KeyboardPanelDemo() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = TOAST_DATA.categories;
  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="flex flex-col" style={{ minHeight: 280 }}>
      {/* Icon bar -- matches iOS IconBarView */}
      <div className="flex items-center justify-center gap-4 py-3 px-3">
        <IconSquare
          isActive={!activeCategory}
          color="var(--color-brand-accentCleaned)"
          onClick={() => setActiveCategory(null)}
        >
          <ScatterSymbol size={18} />
        </IconSquare>

        {categories.map((cat) => {
          const color = CATEGORY_COLORS[cat.id];
          const isActive = activeCategory === cat.id;

          return (
            <IconSquare
              key={cat.id}
              isActive={isActive}
              color={color}
              onClick={() => setActiveCategory(isActive ? null : cat.id)}
            >
              <CategoryIcon categoryId={cat.id} isActive={isActive} />
            </IconSquare>
          );
        })}
      </div>

      {/* Content area */}
      <div className="flex-1 px-3 pb-3 overflow-y-auto">
        {activeCat ? (
          <CategoryDetailView
            category={activeCat}
            onBack={() => setActiveCategory(null)}
          />
        ) : (
          <SummaryView
            categories={categories}
            onSelectCategory={setActiveCategory}
          />
        )}
      </div>

      {/* Fix All button */}
      <div className="px-3 pb-2">
        <div
          className="w-full py-2 rounded-lg text-center text-xs font-semibold"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-brand-accentCleaned) 15%, transparent)",
            color: "var(--color-brand-accentCleaned)",
            border:
              "1px solid color-mix(in srgb, var(--color-brand-accentCleaned) 30%, transparent)",
          }}
        >
          Fix All
        </div>
      </div>
    </div>
  );
}
