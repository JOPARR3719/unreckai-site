"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Phase = "idle" | "welcome" | "scatter" | "assemble" | "brand" | "reveal" | "done";

// Scattered offsets — symmetric around container center (96, 96)
// All sx/sy are translate() from block origin (0,0), centered at x=96
const SCATTER_OFFSETS = [
  { sx: -84,  sy: 76,  sr: -18 },  // [0,0] left
  { sx: 96,   sy: 56,  sr: 0 },    // [0,1] center
  { sx: 276,  sy: 76,  sr: 18 },   // [0,2] right
  { sx: -144, sy: 156, sr: -22 },  // [1,0] far left
  { sx: 96,   sy: 116, sr: 0 },    // [1,1] center
  { sx: 336,  sy: 156, sr: 22 },   // [1,2] far right
  { sx: -84,  sy: 256, sr: -12 },  // [2,0] left-down
  { sx: 96,   sy: 286, sr: 0 },    // [2,1] center-down
  { sx: 276,  sy: 256, sr: 12 },   // [2,2] right-down
];

// Stagger groups: corners 0ms, edges 100ms, center 220ms
const STAGGER_DELAYS = [0, 100, 0, 100, 220, 100, 0, 100, 0];

// Assembled grid positions (col * 68, row * 68)
const GRID_POSITIONS = [
  { ax: 0, ay: 0 },     { ax: 68, ay: 0 },    { ax: 136, ay: 0 },
  { ax: 0, ay: 68 },    { ax: 68, ay: 68 },   { ax: 136, ay: 68 },
  { ax: 0, ay: 136 },   { ax: 68, ay: 136 },  { ax: 136, ay: 136 },
];

/** Inject splash keyframes into the document head once. */
function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("splash-keyframes")) return;

  const style = document.createElement("style");
  style.id = "splash-keyframes";
  style.textContent = `
@keyframes splash-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes splash-fade-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-8px); }
}
@keyframes splash-scatter-in {
  from {
    opacity: 0;
    transform: translate(var(--sx), var(--sy)) rotate(var(--sr)) scale(0.5);
  }
  to {
    opacity: 0.6;
    transform: translate(var(--sx), var(--sy)) rotate(var(--sr)) scale(1);
  }
}
@keyframes splash-assemble {
  from {
    opacity: 0.6;
    transform: translate(var(--sx), var(--sy)) rotate(var(--sr));
  }
  to {
    opacity: 1;
    transform: translate(var(--ax), var(--ay)) rotate(0deg);
  }
}
@keyframes splash-brand-in {
  0%   { max-width: 0; opacity: 0; padding-left: 0; }
  50%  { max-width: 600px; opacity: 0; padding-left: 20px; }
  100% { max-width: 600px; opacity: 1; padding-left: 20px; }
}
@keyframes splash-reveal {
  from { opacity: 1; }
  to   { opacity: 0; pointer-events: none; }
}
@keyframes splash-site-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}`;
  document.head.appendChild(style);
}

export function SplashIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Check reduced motion, start animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onCompleteRef.current();
      return;
    }

    // Inject keyframes into head
    ensureKeyframes();

    // Lock scrolling
    document.body.style.overflow = "hidden";

    // Double rAF to ensure paint before animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("welcome");
      });
    });

    return () => {
      document.getElementById("splash-keyframes")?.remove();
    };
  }, []);

  // Unlock scroll and call onComplete when done
  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      onCompleteRef.current();
    }
  }, [phase]);

  // Welcome ends → pause → scatter
  const handleWelcomeEnd = useCallback(() => {
    setTimeout(() => setPhase("scatter"), 500);
  }, []);

  // Scatter ends → pause → assemble
  const handleScatterEnd = useCallback((e: React.AnimationEvent) => {
    if (e.animationName === "splash-scatter-in" && (e.target as HTMLElement).dataset.idx === "4") {
      setTimeout(() => setPhase("assemble"), 600);
    }
  }, []);

  // Assemble ends → pause → brand
  const handleAssembleEnd = useCallback((e: React.AnimationEvent) => {
    if (e.animationName === "splash-assemble" && (e.target as HTMLElement).dataset.idx === "4") {
      setTimeout(() => setPhase("brand"), 500);
    }
  }, []);

  // Brand ends → hold → reveal
  const handleBrandEnd = useCallback((e: React.AnimationEvent) => {
    if (e.animationName === "splash-brand-in") {
      setTimeout(() => setPhase("reveal"), 1800);
    }
  }, []);

  const handleRevealEnd = useCallback(() => {
    setPhase("done");
  }, []);

  if (phase === "idle" || phase === "done") return null;

  const showBlocks = phase !== "welcome";
  const showWelcome = phase === "welcome" || phase === "scatter" || phase === "assemble";
  const isBrandOrReveal = phase === "brand" || phase === "reveal";

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#0a0d10",
        animation: phase === "reveal"
          ? "splash-reveal 900ms ease-out forwards"
          : undefined,
      }}
      onAnimationEnd={phase === "reveal" ? handleRevealEnd : undefined}
    >

      {/* "Welcome to" — absolutely positioned above center, out of layout flow */}
      {showWelcome && (
        <h1
          className="absolute left-0 right-0 text-center text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium text-brand-textPrimary tracking-tight leading-[1.1]"
          style={{
            bottom: "calc(50% + 160px)",
            zIndex: 2,
            animation:
              phase === "welcome"
                ? "splash-fade-up 1200ms ease-out forwards"
                : phase === "assemble"
                ? "splash-fade-out 600ms ease-out forwards"
                : undefined,
            opacity: phase === "scatter" ? 1 : 0,
          }}
          onAnimationEnd={phase === "welcome" ? handleWelcomeEnd : undefined}
        >
          Welcome to
        </h1>
      )}

      {/* Wordmark lockup — always vertically centered by outer flex */}
      <div className="flex items-center" style={{ zIndex: 2 }}>
          {/* 9-block symbol container — border-only blocks */}
          {showBlocks && (
            <div className="relative" style={{ width: 192, height: 192 }}>
              {Array.from({ length: 9 }, (_, i) => {
                const scatter = SCATTER_OFFSETS[i];
                const grid = GRID_POSITIONS[i];
                const delay = STAGGER_DELAYS[i];

                const cssVars = {
                  "--sx": `${scatter.sx}px`,
                  "--sy": `${scatter.sy}px`,
                  "--sr": `${scatter.sr}deg`,
                  "--ax": `${grid.ax}px`,
                  "--ay": `${grid.ay}px`,
                } as React.CSSProperties;

                let animation: string | undefined;
                let transform: string | undefined;
                let opacity: number | undefined;
                const isAssembled = phase === "brand" || phase === "reveal";

                if (phase === "scatter") {
                  animation = `splash-scatter-in 1000ms ${delay}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                } else if (phase === "assemble") {
                  animation = `splash-assemble 1800ms ${delay}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
                } else {
                  // brand / reveal — stay assembled
                  transform = `translate(${grid.ax}px, ${grid.ay}px)`;
                  opacity = 1;
                }

                return (
                  <div
                    key={i}
                    data-idx={String(i)}
                    className="absolute"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      border: "2.5px solid",
                      borderColor: "transparent",
                      backgroundImage: "linear-gradient(#0a0d10, #0a0d10), linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      transition: "border-color 600ms ease-out",
                      ...cssVars,
                      animation,
                      transform,
                      opacity: opacity ?? 0,
                      willChange: "transform, opacity",
                    }}
                    onAnimationEnd={
                      phase === "scatter"
                        ? handleScatterEnd
                        : phase === "assemble"
                        ? handleAssembleEnd
                        : undefined
                    }
                  />
                );
              })}
            </div>
          )}

          {/* "UnreckAI" — max-width expansion causes flex re-center → blocks slide left */}
          {showBlocks && (
            <span
              className="text-6xl sm:text-7xl md:text-8xl font-semibold text-brand-textPrimary tracking-tight whitespace-nowrap overflow-hidden"
              style={{
                maxWidth: isBrandOrReveal ? 600 : 0,
                opacity: isBrandOrReveal ? 1 : 0,
                paddingLeft: isBrandOrReveal ? 20 : 0,
                animation:
                  phase === "brand"
                    ? "splash-brand-in 1400ms ease-in-out forwards"
                    : undefined,
              }}
              onAnimationEnd={phase === "brand" ? handleBrandEnd : undefined}
            >
              UnreckAI
            </span>
          )}
      </div>
    </div>
  );
}
