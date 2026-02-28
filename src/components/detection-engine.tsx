import { TextSearch, ShieldCheck, Check, Settings2 } from "lucide-react";
import { Reveal } from "./reveal";

const nodes = [
  {
    icon: TextSearch,
    iconSize: 26,
    accent: "var(--color-brand-accentDocument)",
    accentClass: "text-brand-accentDocument",
    title: "Hidden Signatures",
    description: "Analyzes the clipboard wrapper.",
    items: [
      "Reads formatting tags.",
      "Spots invisible characters.",
      "Identifies app footprints.",
    ],
  },
  {
    icon: ShieldCheck,
    iconSize: 28,
    accent: "var(--color-brand-accentFormatting)",
    accentClass: "text-brand-accentFormatting",
    title: "Strict Rules",
    description: "Logic, not guesswork.",
    items: [
      "Zero AI scanning.",
      "Predictable local logic.",
      "Instant exact results.",
    ],
  },
  {
    icon: Settings2,
    iconSize: 26,
    accent: "var(--color-brand-accentCleaned)",
    accentClass: "text-brand-accentCleaned",
    title: "Pure Formatting",
    description: "Fixes, never polices.",
    items: [
      "Zero plagiarism checks.",
      "Repairs broken layouts.",
      "Cleans chatbot slop.",
    ],
  },
];

export function DetectionEngine() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
          <div className="glow-card-inner dot-br pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-14 pb-6 sm:pb-10 md:pb-14">
            <div className="space-y-10 sm:space-y-12">
              {/* Header */}
              <div className="space-y-4 max-w-4xl mx-auto text-center">
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ background: 'linear-gradient(90deg, var(--color-brand-accentCleaned), var(--color-brand-accentTeal))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Detection Engine
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                  Code. Not content.
                </h2>
                <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                  Source detection reads structure, not your words. Every fix follows strict rules, not AI guesswork.
                </p>
              </div>

              {/* Pipeline — Desktop: grid, Mobile: stacked */}
              <div>
                {/* Desktop layout — 3-col grid, circles centered in columns */}
                <div className="hidden md:grid grid-cols-[1fr_1.3fr_1fr] relative">
                  {/* Gradient line — spans exactly between col 1 and col 3 circle centers */}
                  <div
                    className="absolute h-[2px] z-0"
                    style={{
                      top: 28,
                      left: "calc(100% / 6.6)",
                      right: "calc(100% / 6.6)",
                      background:
                        "linear-gradient(to right, var(--color-brand-accentDocument), var(--color-brand-accentFormatting), var(--color-brand-accentCleaned))",
                      opacity: 0.3,
                    }}
                  />
                  {nodes.map((node, i) => (
                    <Reveal key={node.title} delay={i * 120}>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 relative z-10 mb-5 transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: "#0a0d10",
                            border: `1.5px solid ${node.accent}`,
                            boxShadow: `0 0 25px -5px color-mix(in srgb, ${node.accent} 40%, transparent)`,
                          }}
                        >
                          <node.icon size={node.iconSize} style={{ color: node.accent }} />
                        </div>

                        <h3 className="text-brand-textPrimary font-medium text-xl mb-2 text-center pl-3">
                          {node.title}
                        </h3>
                        <p className="text-brand-textSecondary text-[0.95rem] mb-4 text-center pl-3">
                          {node.description}
                        </p>

                        <div
                          className="w-[220px] h-px mb-4 ml-3"
                          style={{
                            background: `color-mix(in srgb, ${node.accent} 25%, transparent)`,
                          }}
                        />

                        <ul className="space-y-3 pl-3">
                          {node.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center text-[0.95rem] text-brand-textSecondary"
                            >
                              <Check
                                size={18}
                                className={`${node.accentClass} mr-3 shrink-0`}
                                strokeWidth={2.5}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* Mobile layout — stacked */}
                <div className="flex flex-col gap-12 md:hidden">
                  {nodes.map((node, i) => (
                    <Reveal key={node.title} delay={i * 120}>
                      <div className="flex flex-col items-start text-left">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center mb-5 shrink-0 transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: "#0a0d10",
                            border: `1.5px solid ${node.accent}`,
                            boxShadow: `0 0 25px -5px color-mix(in srgb, ${node.accent} 40%, transparent)`,
                          }}
                        >
                          <node.icon size={node.iconSize} style={{ color: node.accent }} />
                        </div>

                        <h3 className="text-brand-textPrimary font-medium text-xl mb-2">
                          {node.title}
                        </h3>
                        <p className="text-brand-textSecondary text-[0.95rem] mb-4">
                          {node.description}
                        </p>

                        <div
                          className="w-[150px] h-px mb-4"
                          style={{
                            background: `color-mix(in srgb, ${node.accent} 25%, transparent)`,
                          }}
                        />

                        <ul className="space-y-3">
                          {node.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center text-sm text-brand-textSecondary"
                            >
                              <Check
                                size={17}
                                className={`${node.accentClass} mr-3 shrink-0`}
                                strokeWidth={2.5}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
