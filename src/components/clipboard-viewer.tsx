"use client";

import { Wand2, Type, Layers } from "lucide-react";
import { RobotIcon } from "./robot-icon";
import { Reveal } from "./reveal";
import { InteractiveClipboard } from "./clipboard/interactive-clipboard";

const categories = [
  {
    title: "Deep Clean",
    accent: "var(--color-brand-accentCleaned)",
    icon: Wand2,
    iconSize: 20,
    description:
      "Removes hidden junk that causes weird spacing and copy-paste glitches.",
    tags: ["hidden characters", "broken spacing", "encoding fixes", "whitespace"],
  },
  {
    title: "Formatting",
    accent: "var(--color-brand-accentFormatting)",
    icon: Type,
    iconSize: 20,
    description:
      "Fixes annoying dashes, weird quotes, and overdone bold that AI tools add.",
    tags: ["smart quotes", "em dashes", "bold cleanup", "title case"],
  },
  {
    title: "AI Content",
    accent: "var(--color-brand-accentAi)",
    icon: RobotIcon,
    iconSize: 18,
    description:
      'Strips the "Sure! Here\'s..." openers that scream AI-generated.',
    tags: ['"Sure! Here\'s..."', '"Let me know..."', "filler phrases", "AI vocabulary"],
  },
  {
    title: "Structure",
    accent: "var(--color-brand-accentDocument)",
    icon: Layers,
    iconSize: 20,
    description:
      "Repairs words that got split or mangled when you copied from PDFs.",
    tags: ["split words", "broken hyphens", "garbled text", "line breaks"],
  },
];

export function ClipboardViewer() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
          <div className="glow-card-inner dot-tl pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-12 pb-6 sm:pb-10 md:pb-12">
            <div className="space-y-8 sm:space-y-10">
              {/* Header */}
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentBlue">
                  Total Visibility
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                  Four categories. Total control.
                </h2>
                <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                  Every issue categorized. Every fix tracked. Right from your
                  Mac menu bar.
                </p>
              </div>

              {/* Interactive hint — centered over clipboard column */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ marginTop: '-1.5rem', marginBottom: '0.75rem' }}>
                <div className="hidden lg:block lg:col-span-2" />
                <div className="flex items-center justify-center gap-2 lg:col-span-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accentCleaned animate-gentle-pulse" />
                  <span className="text-xs text-brand-textTertiary whitespace-nowrap">
                    Interactive: click to explore
                  </span>
                </div>
              </div>

              {/* 3-column grid: 2 cols category cards + 1 col popup */}
              <Reveal>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left: 2x2 category cards */}
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <div
                          key={cat.title}
                          className="bg-brand-cardBg border border-brand-border rounded-[1.5rem] p-6 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                        >
                          {/* Icon + Title */}
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${cat.accent} 10%, transparent)`,
                                border: `1px solid color-mix(in srgb, ${cat.accent} 20%, transparent)`,
                              }}
                            >
                              <Icon
                                size={cat.iconSize}
                                style={{ color: cat.accent }}
                              />
                            </div>
                            <span
                              className="font-semibold text-[15px]"
                              style={{ color: cat.accent }}
                            >
                              {cat.title}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-brand-textSecondary text-[0.95rem] leading-relaxed min-h-[3rem]">
                            {cat.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {cat.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-mono px-2.5 py-1 rounded-md"
                                style={{
                                  color: cat.accent,
                                  backgroundColor: `color-mix(in srgb, ${cat.accent} 10%, transparent)`,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right: Interactive popup */}
                  <div className="lg:col-span-1">
                    {/* Mobile/tablet hint */}
                    <div className="flex lg:hidden items-center justify-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accentCleaned animate-gentle-pulse" />
                      <span className="text-xs text-brand-textTertiary">
                        Interactive: click to explore
                      </span>
                    </div>
                    <div className="flex justify-center lg:justify-end lg:sticky lg:top-24">
                      <InteractiveClipboard />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
