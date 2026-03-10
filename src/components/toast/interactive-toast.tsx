"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ToastHeader } from "./toast-header";
import { ToastIconBar } from "./toast-icon-bar";
import { ToastCategories } from "./toast-categories";
import { ToastDrill } from "./toast-drill";
import { ToastFooter } from "./toast-footer";
import { CorrectedPreviewCard, CorrectedPreviewDrill } from "./toast-corrected-preview";
import { IntelligenceSummaryCard, IntelligenceSummaryDrill } from "./toast-intelligence-summary";
import { TOAST_DATA, type CategoryData } from "./toast-data";

type ToastView = "categories" | "drill" | "correctedPreview" | "intelligenceSummary";

const GLOW_GRADIENT =
  "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))";

/* ── Click targets ──
   These IDs tell child components which element to pulse before a
   simulated click. null = no pulse visible. */
export type ClickTarget =
  | "details"              // Details button in header
  | "category-formatting"  // Formatting row in categories
  | "compare-em-dash"      // Compare button on em-dash card
  | "back"                 // Back chevron in drill header
  | null;

/* ── Auto-cycle steps ── */
interface CycleStep {
  detailsOpen: boolean;
  view: ToastView;
  categoryId: string | null;
  compareType: string | null;
  clickTarget: ClickTarget;  // which element to pulse
  dwell: number; // ms
}

const FORMATTING_CATEGORY = TOAST_DATA.categories.find(
  (c) => c.id === "formatting"
)!;

// Each step changes only ONE thing. "Click" steps show a pulse on the target
// element, then the next step performs the actual state change.
const CYCLE_STEPS: CycleStep[] = [
  // ── Display: categories visible (initial state on refresh) ──
  { detailsOpen: true,  view: "categories", categoryId: null,         compareType: null,     clickTarget: null, dwell: 7000 },
  // ── Click: pulse Formatting row ──
  { detailsOpen: true,  view: "categories", categoryId: null,         compareType: null,     clickTarget: "category-formatting", dwell: 900 },
  // ── Transition: slide into Formatting drill ──
  { detailsOpen: true,  view: "drill",      categoryId: "formatting", compareType: null,     clickTarget: null, dwell: 900 },
  // ── Display: drill view ──
  { detailsOpen: true,  view: "drill",      categoryId: "formatting", compareType: null,     clickTarget: null, dwell: 7000 },
  // ── Click: pulse Compare button on em-dash ──
  { detailsOpen: true,  view: "drill",      categoryId: "formatting", compareType: null,     clickTarget: "compare-em-dash", dwell: 900 },
  // ── Display: compare open on em-dash ──
  { detailsOpen: true,  view: "drill",      categoryId: "formatting", compareType: "em-dash", clickTarget: null, dwell: 10000 },
  // ── Click: pulse Compare again to close ──
  { detailsOpen: true,  view: "drill",      categoryId: "formatting", compareType: "em-dash", clickTarget: "compare-em-dash", dwell: 900 },
  // ── Unwind: close compare ──
  { detailsOpen: true,  view: "drill",      categoryId: "formatting", compareType: null,     clickTarget: null, dwell: 900 },
  // ── Click: pulse back button ──
  { detailsOpen: true,  view: "drill",      categoryId: "formatting", compareType: null,     clickTarget: "back", dwell: 900 },
  // ── Unwind: slide back to categories ──
  { detailsOpen: true,  view: "categories", categoryId: null,         compareType: null,     clickTarget: null, dwell: 900 },
  // ── Click: pulse Details button to collapse ──
  { detailsOpen: true,  view: "categories", categoryId: null,         compareType: null,     clickTarget: "details", dwell: 900 },
  // ── Unwind: collapse details ──
  { detailsOpen: false, view: "categories", categoryId: null,         compareType: null,     clickTarget: null, dwell: 900 },
  // ── Display: collapsed ──
  { detailsOpen: false, view: "categories", categoryId: null,         compareType: null,     clickTarget: null, dwell: 6000 },
  // ── Click: pulse Details button to open ──
  { detailsOpen: false, view: "categories", categoryId: null,         compareType: null,     clickTarget: "details", dwell: 900 },
  // ── Transition: open details ──
  { detailsOpen: true,  view: "categories", categoryId: null,         compareType: null,     clickTarget: null, dwell: 900 },
  // → loops back to step 0
];

const START_STEP = 0; // categories visible

export function InteractiveToast({ autoStart = false }: { autoStart?: boolean }) {
  const [view, setView] = useState<ToastView>("categories");
  const [activeCategory, setActiveCategory] = useState<CategoryData | null>(null);
  const [compareType, setCompareType] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const [floatPaused, setFloatPaused] = useState(false);
  const [clickTarget, setClickTarget] = useState<ClickTarget>(null);

  // Auto-cycle refs
  const stepIndexRef = useRef(START_STEP);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepStartedAtRef = useRef(0);
  const pausedRef = useRef(false);
  const isUserControlledRef = useRef(false);
  const remainingRef = useRef(CYCLE_STEPS[START_STEP].dwell);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const applyStep = (step: CycleStep) => {
    setDetailsOpen(step.detailsOpen);
    setView(step.view as ToastView);
    setActiveCategory(step.categoryId ? FORMATTING_CATEGORY : null);
    setCompareType(step.compareType);
    setClickTarget(step.clickTarget);
    setPreviewIndex(0);
  };

  const scheduleNext = (delayMs: number) => {
    clearTimer();
    stepStartedAtRef.current = Date.now();
    remainingRef.current = delayMs;

    timerRef.current = setTimeout(() => {
      if (pausedRef.current || isUserControlledRef.current) return;
      const nextIndex = (stepIndexRef.current + 1) % CYCLE_STEPS.length;
      stepIndexRef.current = nextIndex;
      const nextStep = CYCLE_STEPS[nextIndex];
      applyStep(nextStep);
      scheduleNext(nextStep.dwell);
    }, delayMs);
  };

  /* ── Float on mount, start cycle only when autoStart fires ── */
  const cycleStartedRef = useRef(false);

  useEffect(() => {
    setIsFloating(true);
    applyStep(CYCLE_STEPS[START_STEP]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!autoStart || cycleStartedRef.current || isUserControlledRef.current) return;
    cycleStartedRef.current = true;
    stepIndexRef.current = START_STEP;
    applyStep(CYCLE_STEPS[START_STEP]);
    scheduleNext(CYCLE_STEPS[START_STEP].dwell);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  /* ── Hover handlers ── */
  const handlePointerEnter = useCallback(() => {
    if (isUserControlledRef.current) return;
    pausedRef.current = true;
    setFloatPaused(true);
    const elapsed = Date.now() - stepStartedAtRef.current;
    remainingRef.current = Math.max(remainingRef.current - elapsed, 500);
    clearTimer();
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (isUserControlledRef.current) return;
    pausedRef.current = false;
    setFloatPaused(false);
    scheduleNext(remainingRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── User interaction override ── */
  const markUserControlled = useCallback(() => {
    if (isUserControlledRef.current) return;
    isUserControlledRef.current = true;
    setClickTarget(null);
    clearTimer();
  }, []);

  /* ── User-controlled handlers ── */
  const handleDrill = useCallback(
    (category: CategoryData) => {
      markUserControlled();
      if (!detailsOpen) setDetailsOpen(true);
      setActiveCategory(category);
      setView("drill");
      setCompareType(null);
      setPreviewIndex(0);
    },
    [markUserControlled, detailsOpen]
  );

  const handleBack = useCallback(() => {
    markUserControlled();
    setView("categories");
    setActiveCategory(null);
    setCompareType(null);
    setPreviewIndex(0);
  }, [markUserControlled]);

  const handleToggleCompare = useCallback(
    (type: string) => {
      markUserControlled();
      if (compareType === type) {
        setCompareType(null);
      } else {
        setCompareType(type);
        setPreviewIndex(0);
      }
    },
    [compareType, markUserControlled]
  );

  const handleToggleDetails = useCallback(() => {
    markUserControlled();
    setDetailsOpen((prev) => {
      if (prev) {
        setView("categories");
        setActiveCategory(null);
        setCompareType(null);
        setPreviewIndex(0);
      }
      return !prev;
    });
  }, [markUserControlled]);

  const handleCorrectedPreview = useCallback(() => {
    markUserControlled();
    setView("correctedPreview");
  }, [markUserControlled]);

  const handleIntelligenceSummary = useCallback(() => {
    markUserControlled();
    if (!detailsOpen) setDetailsOpen(true);
    setView("intelligenceSummary");
  }, [markUserControlled, detailsOpen]);

  const handleBackToCategories = useCallback(() => {
    markUserControlled();
    setView("categories");
  }, [markUserControlled]);

  const fixedCount = TOAST_DATA.categories.reduce(
    (sum, cat) => sum + cat.fixCount,
    0
  );

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        animationName: isFloating ? "toast-float" : "none",
        animationDuration: "4s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationPlayState: floatPaused ? "paused" : "running",
      }}
    >
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
          }}
        >
          {/* Header card with gradient border */}
          <div
            className="mx-2.5 mt-2.5 rounded-xl p-px"
            style={{ background: GLOW_GRADIENT }}
          >
            <div className="rounded-[calc(0.75rem-1px)] bg-brand-cardBg">
              <ToastHeader
                issueCount={TOAST_DATA.categories.reduce(
                  (sum, cat) => sum + cat.fixCount,
                  0
                )}
                detailsOpen={detailsOpen}
                onToggleDetails={handleToggleDetails}
                clickTarget={clickTarget}
              />
              {/* Icon bar — always visible in header */}
              <ToastIconBar
                categories={TOAST_DATA.categories}
                activeCategory={activeCategory?.id ?? null}
                onCategoryClick={handleDrill}
                onIntelligenceClick={handleIntelligenceSummary}
              />
            </div>
          </div>

          {/* Details panel — animated height via grid-rows */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: detailsOpen ? "1fr" : "0fr",
              transition:
                "grid-template-rows 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div
                className="mx-2.5 mt-3 rounded-xl p-px"
                style={{ background: "linear-gradient(135deg, rgba(59,232,176,0.35), rgba(155,143,255,0.35))" }}
              >
                <div className="rounded-[calc(0.75rem-1px)] bg-brand-cardBg overflow-hidden">
                  <div className="flex-1 overflow-hidden relative">
                    {/* Categories view (with icon bar + preview/summary cards) */}
                    <div
                      className="transition-all duration-700 ease-in-out"
                      style={{
                        transform:
                          view === "categories"
                            ? "translateX(0)"
                            : "translateX(-100%)",
                        opacity: view === "categories" ? 1 : 0,
                        position:
                          view === "categories" ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        pointerEvents:
                          view === "categories" ? "auto" : "none",
                      }}
                    >
                      {/* All 6 cards — uniform height and spacing */}
                      <div className="px-2.5 pt-2 pb-2 flex flex-col gap-2">
                        <CorrectedPreviewCard
                          fixedCount={fixedCount}
                          onClick={handleCorrectedPreview}
                        />
                        <IntelligenceSummaryCard
                          summaryText={TOAST_DATA.summaryText}
                          onClick={handleIntelligenceSummary}
                        />
                        <ToastCategories
                          categories={TOAST_DATA.categories}
                          onDrill={handleDrill}
                          clickTarget={clickTarget}
                        />
                      </div>
                    </div>

                    {/* Drill view */}
                    <div
                      className="transition-all duration-700 ease-in-out"
                      style={{
                        transform:
                          view === "drill"
                            ? "translateX(0)"
                            : "translateX(100%)",
                        opacity: view === "drill" ? 1 : 0,
                        position:
                          view === "drill" ? "relative" : "absolute",
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
                          clickTarget={clickTarget}
                        />
                      )}
                    </div>

                    {/* Corrected Preview drill-in */}
                    <div
                      className="transition-all duration-700 ease-in-out"
                      style={{
                        transform:
                          view === "correctedPreview"
                            ? "translateX(0)"
                            : "translateX(100%)",
                        opacity: view === "correctedPreview" ? 1 : 0,
                        position:
                          view === "correctedPreview" ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        pointerEvents: view === "correctedPreview" ? "auto" : "none",
                      }}
                    >
                      <CorrectedPreviewDrill
                        originalText={TOAST_DATA.originalText}
                        cleanedText={TOAST_DATA.cleanedText}
                        onBack={handleBackToCategories}
                      />
                    </div>

                    {/* Intelligence drill-in */}
                    <div
                      className="transition-all duration-700 ease-in-out"
                      style={{
                        transform:
                          view === "intelligenceSummary"
                            ? "translateX(0)"
                            : "translateX(100%)",
                        opacity: view === "intelligenceSummary" ? 1 : 0,
                        position:
                          view === "intelligenceSummary" ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        pointerEvents: view === "intelligenceSummary" ? "auto" : "none",
                      }}
                    >
                      <IntelligenceSummaryDrill
                        categories={TOAST_DATA.categories}
                        summaryText={TOAST_DATA.summaryText}
                        onBack={handleBackToCategories}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <ToastFooter
            sourceApp={TOAST_DATA.sourceApp}
            detailsOpen={detailsOpen}
            onIntelligenceClick={handleIntelligenceSummary}
          />
        </div>
      </div>
    </div>
  );
}
