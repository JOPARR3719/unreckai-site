"use client";

import { useState } from "react";
import {
  FAQ_CATEGORIES,
  CHANGELOG_ENTRIES,
  type FAQCategory,
} from "./faq-changelog-data";
import { Reveal } from "./reveal";

/* ------------------------------------------------------------------ */
/*  Category icon SVGs (inline, matching mockup)                      */
/* ------------------------------------------------------------------ */

const CATEGORY_ICONS: Record<FAQCategory["icon"], React.ReactNode> = {
  lock: (
    <svg
      className="w-5 h-5 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
  gear: (
    <svg
      className="w-5 h-5 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  card: (
    <svg
      className="w-5 h-5 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  FAQ Accordion                                                     */
/* ------------------------------------------------------------------ */

function FaqAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-brand-accentFormatting font-semibold tracking-[0.15em] text-xs uppercase mb-3">
          Clear Answers
        </p>
        <h2 className="text-4xl font-medium tracking-tight text-brand-textPrimary mb-4">
          Frequently asked questions.
        </h2>
        <p className="text-lg text-brand-textSecondary font-normal">
          Everything you need to know about privacy, capabilities, and
          licensing.
        </p>
      </div>

      <div className="space-y-6">
        {FAQ_CATEGORIES.map((category, catIdx) => (
          <div key={category.title} className={catIdx > 0 ? "pt-2" : ""}>
            <h3 className={`font-medium text-lg mb-3 flex items-center ${category.color}`}>
              {CATEGORY_ICONS[category.icon]}
              <span className="text-brand-textPrimary">{category.title}</span>
            </h3>

            <div className="space-y-3">
              {category.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = openKey === key;

                return (
                  <div
                    key={key}
                    className="bg-brand-cardBg border border-brand-border rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => toggle(key)}
                  >
                    <div className="px-5 py-4 flex justify-between items-center">
                      <span className="font-medium text-[15px] text-brand-textPrimary pr-4">
                        {item.question}
                      </span>
                      <svg
                        className={`w-4 h-4 text-brand-textSecondary flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <div
                      className={`px-5 text-[14px] text-brand-textSecondary leading-relaxed transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "max-h-48 opacity-100 pb-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Changelog Timeline                                                */
/* ------------------------------------------------------------------ */

function ChangelogTimeline() {
  return (
    <div className="glow-card">
      <div className="glow-card-inner rounded-[calc(2rem-1.5px)] p-8 shadow-2xl relative">
        {/* Live Log badge */}
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-itemBg border border-brand-border px-4 py-1.5 rounded-full flex items-center shadow-lg">
          <div className="w-2 h-2 rounded-full bg-brand-accentCleaned animate-pulse mr-2" />
          <span className="text-xs font-semibold text-brand-textPrimary tracking-wide">
            Live Log
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-medium text-brand-textPrimary mb-2">
            What&apos;s New
          </h3>
          <p className="text-sm text-brand-textSecondary">
            Constant updates to handle the latest AI quirks.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative">
          {CHANGELOG_ENTRIES.map((entry, idx) => (
            <div key={entry.version} className="relative pl-8">
              {/* Timeline line + dot */}
              <div className="absolute left-0 top-0 bottom-0">
                {/* Dot */}
                {idx === 0 ? (
                  <div
                    className="absolute left-0 top-1.5 w-3 h-3 bg-brand-accentCleaned rounded-full z-10"
                    style={{
                      boxShadow: "0 0 10px rgba(59, 232, 176, 0.5)",
                    }}
                  />
                ) : (
                  <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 bg-brand-border rounded-full z-10 border border-brand-textSecondary/50" />
                )}

                {/* Vertical line (hide on last entry) */}
                {idx < CHANGELOG_ENTRIES.length - 1 && (
                  <div
                    className="absolute top-5 bottom-[-32px] w-[2px]"
                    style={{
                      left: idx === 0 ? "5.5px" : "5px",
                      background: "rgba(255, 255, 255, 0.06)",
                    }}
                  />
                )}
              </div>

              {/* Version + date */}
              <div className="flex items-baseline mb-2">
                <span className="text-brand-textPrimary font-semibold text-lg mr-3">
                  {entry.version}
                </span>
                <span className="text-brand-textSecondary text-xs tracking-wider">
                  {entry.date}
                </span>
              </div>

              {/* Items */}
              <ul className="space-y-2 mt-3">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start text-[14px] text-[#c9d1d9]"
                  >
                    <svg
                      className="w-4 h-4 text-brand-textSecondary mr-2.5 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-brand-border text-center">
          <a
            href="https://unreckai.com/changelog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-textPrimary hover:text-brand-accentCleaned transition-colors inline-flex items-center"
          >
            View full changelog
            <svg
              className="w-4 h-4 ml-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
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
