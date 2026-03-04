"use client";

import { useState } from "react";
import { ChevronDown, Lock, KeyRound, CreditCard, Zap } from "lucide-react";
import {
  FAQ_CATEGORIES,
  CHANGELOG_ENTRIES,
  type FAQCategory,
} from "./faq-changelog-data";
import { Reveal } from "./reveal";

/* ------------------------------------------------------------------ */
/*  Category icons (lucide-react)                                     */
/* ------------------------------------------------------------------ */

const CATEGORY_ICONS: Record<FAQCategory["icon"], React.ElementType> = {
  lock: Lock,
  gear: KeyRound,
  card: CreditCard,
};

/* ------------------------------------------------------------------ */
/*  FAQ Accordion (nested: category > question)                       */
/* ------------------------------------------------------------------ */

function FaqAccordion() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  function toggleCategory(idx: number) {
    setOpenCategory((prev) => (prev === idx ? null : idx));
    setOpenQuestion(null);
  }

  function toggleQuestion(key: string) {
    setOpenQuestion((prev) => (prev === key ? null : key));
  }

  return (
    <div className="glow-card">
      <div className="glow-card-inner dot-tr rounded-[calc(2rem-1.5px)] p-8 shadow-2xl">
        <div className="mb-10">
          <p className="text-brand-accentPurpleDark font-semibold tracking-[0.15em] text-xs uppercase mb-3">
            Quick Answers
          </p>
          <h2 className="text-4xl font-medium tracking-tight text-brand-textPrimary mb-4">
            Frequently asked questions.
          </h2>
          <p className="text-lg text-brand-textSecondary font-normal">
            Everything you need to know about privacy, capabilities, and
            pricing.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_CATEGORIES.map((category, catIdx) => {
            const Icon = CATEGORY_ICONS[category.icon];
            const isCatOpen = openCategory === catIdx;

            return (
              <div
                key={category.title}
                className="bg-brand-cardBg border border-brand-border rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.01]"
              >
                {/* Category header (clickable) */}
                <button
                  type="button"
                  onClick={() => toggleCategory(catIdx)}
                  className="w-full px-5 py-4 flex items-center cursor-pointer"
                >
                  <Icon className={`w-[22px] h-[22px] mr-3 flex-shrink-0 ${category.color}${category.icon === "lock" ? " animate-wiggle" : ""}`} />
                  <span className="font-medium text-[15px] text-brand-textPrimary">
                    {category.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-textSecondary ml-auto flex-shrink-0 transition-transform duration-300 ${
                      isCatOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Inner question cards (revealed when category is open) */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isCatOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-4 space-y-2">
                    {category.items.map((item, itemIdx) => {
                      const key = `${catIdx}-${itemIdx}`;
                      const isQOpen = openQuestion === key;

                      return (
                        <div
                          key={key}
                          className="rounded-xl overflow-hidden p-[1px]"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(59,232,176,0.4), rgba(26,175,208,0.3), rgba(155,143,255,0.4))",
                          }}
                        >
                          <div className="bg-brand-itemBg rounded-[calc(0.75rem-1px)] overflow-hidden">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleQuestion(key);
                              }}
                              className="w-full px-4 py-3 flex justify-between items-center cursor-pointer"
                            >
                              <span className="font-medium text-[15px] text-brand-tagLabel pr-3 text-left">
                                {item.question}
                              </span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-brand-textTertiary flex-shrink-0 transition-transform duration-300 ${
                                  isQOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`px-4 text-[15px] text-brand-textSecondary leading-relaxed transition-all duration-300 overflow-hidden ${
                                isQOpen
                                  ? "max-h-48 opacity-100 pb-3"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Changelog Timeline (collapsible versions)                         */
/* ------------------------------------------------------------------ */

function ChangelogTimeline() {
  const [openVersion, setOpenVersion] = useState<number | null>(0);

  function toggleVersion(idx: number) {
    setOpenVersion((prev) => (prev === idx ? null : idx));
  }

  return (
    <div className="glow-card">
      <div className="glow-card-inner dot-tl rounded-[calc(2rem-1.5px)] p-8 shadow-2xl relative">
        {/* Header */}
        <div className="mb-4">
          <p className="text-brand-accentPurpleDark font-semibold tracking-[0.15em] text-xs uppercase mb-3">
            Changelog
          </p>
          <h3 className="text-4xl font-medium tracking-tight text-brand-textPrimary mb-4">
            Release Notes
          </h3>
          <p className="text-lg text-brand-textSecondary font-normal">
            Constant updates to handle the latest AI quirks.
          </p>
        </div>

        {/* Timeline (scrollable) */}
        <div className="max-h-[420px] overflow-y-auto slack-scroll pr-1">
          <div className="space-y-6 relative">
            {CHANGELOG_ENTRIES.map((entry, idx) => {
              const isOpen = openVersion === idx;
              const isLatest = idx === 0;

              return (
                <div key={entry.version} className="relative pl-8 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.01]">
                  {/* Timeline line + dot */}
                  <div className="absolute left-0 top-0 bottom-0">
                    {/* Dot */}
                    {isLatest ? (
                      <div
                        className="absolute left-0 top-1.5 w-3 h-3 rounded-full z-10"
                        style={{
                          background:
                            "conic-gradient(from 0deg, #3be8b0, #1aafd0, #9B8FFF, #3be8b0)",
                          boxShadow:
                            "0 0 8px rgba(59,232,176,0.4), 0 0 16px rgba(26,175,208,0.3), 0 0 24px rgba(155,143,255,0.2)",
                        }}
                      />
                    ) : (
                      <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 bg-brand-textTertiary rounded-full z-10" />
                    )}

                    {/* Vertical line (hide on last entry) */}
                    {idx < CHANGELOG_ENTRIES.length - 1 && (
                      <div
                        className="absolute top-5 bottom-[-24px] w-[2px]"
                        style={{
                          left: isLatest ? "5.5px" : "5px",
                          background: "rgba(255, 255, 255, 0.06)",
                        }}
                      />
                    )}
                  </div>

                  {/* Version + date (clickable) */}
                  <button
                    type="button"
                    onClick={() => toggleVersion(idx)}
                    className="flex items-center w-full cursor-pointer"
                  >
                    <span className="text-brand-textPrimary font-semibold text-lg mr-3">
                      {entry.version}
                    </span>
                    <span className="text-brand-textSecondary text-xs tracking-wider">
                      {entry.date}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-brand-textSecondary ml-auto flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Items (collapsible) */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "max-h-[300px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-2 mt-3">
                      {entry.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start text-[14px] text-brand-textSecondary"
                        >
                          <Zap className="w-4 h-4 text-brand-textSecondary mr-2.5 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported Section                                                  */
/* ------------------------------------------------------------------ */

export function FaqChangelog() {
  return (
    <section id="support" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <Reveal>
            <FaqAccordion />
          </Reveal>
          <Reveal delay={200}>
            <ChangelogTimeline />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
