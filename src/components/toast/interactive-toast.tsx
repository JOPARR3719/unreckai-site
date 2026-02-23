"use client";

import { useState, useCallback } from "react";
import { ToastHeader } from "./toast-header";
import { ToastCategories } from "./toast-categories";
import { ToastDrill } from "./toast-drill";
import { ToastFooter } from "./toast-footer";
import { TOAST_DATA, type CategoryData } from "./toast-data";

type ToastView = "categories" | "drill";

export function InteractiveToast() {
  const [view, setView] = useState<ToastView>("categories");
  const [activeCategory, setActiveCategory] = useState<CategoryData | null>(
    null
  );
  const [compareType, setCompareType] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(true);

  const handleDrill = useCallback((category: CategoryData) => {
    setActiveCategory(category);
    setView("drill");
    setCompareType(null);
    setPreviewIndex(0);
  }, []);

  const handleBack = useCallback(() => {
    setView("categories");
    setActiveCategory(null);
    setCompareType(null);
    setPreviewIndex(0);
  }, []);

  const handleToggleCompare = useCallback(
    (type: string) => {
      if (compareType === type) {
        setCompareType(null);
      } else {
        setCompareType(type);
        setPreviewIndex(0);
      }
    },
    [compareType]
  );

  const handleToggleDetails = useCallback(() => {
    setDetailsOpen((prev) => !prev);
    if (detailsOpen) {
      // Collapsing — reset drill state
      setView("categories");
      setActiveCategory(null);
      setCompareType(null);
      setPreviewIndex(0);
    }
  }, [detailsOpen]);

  return (
    <div
      className="w-[360px] max-w-full rounded-xl overflow-hidden"
      style={{
        padding: 1,
        background:
          "linear-gradient(135deg, rgba(59, 232, 176, 0.3), rgba(155, 143, 255, 0.3))",
      }}
    >
      <div
        className="rounded-[calc(0.75rem-1px)] overflow-hidden flex flex-col"
        style={{
          backgroundColor: "var(--color-brand-bgSurface)",
          maxHeight: 560,
        }}
      >
        {/* Header — always visible */}
        <ToastHeader
          issueCount={TOAST_DATA.issueCount}
          detailsOpen={detailsOpen}
          onToggleDetails={handleToggleDetails}
        />

        {/* Scrollable content area with slide transitions */}
        {detailsOpen && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden slack-scroll relative">
            {/* Categories view */}
            <div
              className="transition-all duration-300 ease-in-out"
              style={{
                transform:
                  view === "categories"
                    ? "translateX(0)"
                    : "translateX(-100%)",
                opacity: view === "categories" ? 1 : 0,
                position: view === "categories" ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                pointerEvents: view === "categories" ? "auto" : "none",
              }}
            >
              <ToastCategories
                categories={TOAST_DATA.categories}
                onDrill={handleDrill}
              />
            </div>

            {/* Drill view */}
            <div
              className="transition-all duration-300 ease-in-out"
              style={{
                transform:
                  view === "drill"
                    ? "translateX(0)"
                    : "translateX(100%)",
                opacity: view === "drill" ? 1 : 0,
                position: view === "drill" ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                pointerEvents: view === "drill" ? "auto" : "none",
              }}
            >
              {activeCategory && (
                <ToastDrill
                  category={activeCategory}
                  compareType={compareType}
                  previewIndex={previewIndex}
                  onBack={handleBack}
                  onToggleCompare={handleToggleCompare}
                  onSetPreviewIndex={setPreviewIndex}
                />
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-brand-borderSolid mx-3 opacity-30" />

        {/* Footer — always visible */}
        <ToastFooter sourceApp={TOAST_DATA.sourceApp} />
      </div>
    </div>
  );
}
