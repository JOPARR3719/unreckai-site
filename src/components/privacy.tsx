import { LockKeyhole, Leaf, Search, Cloud, Check, X } from "lucide-react";
import { Reveal } from "./reveal";

const privacyFeatures = [
  {
    icon: LockKeyhole,
    title: "On-device processing",
    description: "Your clipboard never leaves your device",
    enabled: true,
  },
  {
    icon: Leaf,
    title: "Works entirely offline",
    description: "No internet required to clean your text",
    enabled: true,
  },
  {
    icon: Search,
    title: "No content tracking",
    description: "We never read, store, or share your pastes",
    enabled: true,
  },
  {
    icon: Cloud,
    title: "Cloud processing",
    description: "Unlike browser extensions or AI wrappers",
    enabled: false,
  },
];

export function Privacy() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
          <div className="glow-card-inner dot-bl pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-14 pb-6 sm:pb-10 md:pb-14">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left column */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentTeal">
                    Privacy First
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                    Private by default.
                  </h2>
                  <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                    Every transformation happens on your device. No servers, no telemetry, no cloud calls. Your clipboard data stays exactly where it belongs.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { text: "Zero server footprint", excluded: false },
                    { text: "Fully offline capable", excluded: false },
                    { text: "Absolute data privacy", excluded: false },
                    { text: "Never sends data to a server", excluded: true },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      {item.excluded ? (
                        <X
                          size={18}
                          className="text-brand-accentAi shrink-0"
                        />
                      ) : (
                        <Check
                          size={18}
                          className="text-brand-accentCleaned shrink-0"
                        />
                      )}
                      <span className={`text-base ${item.excluded ? "text-brand-textSecondary" : "text-brand-textPrimary"}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {privacyFeatures.map((feature, i) => (
                  <Reveal key={feature.title} delay={i * 80}>
                  <div
                    className={`flex items-start gap-4 p-5 rounded-xl border transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] ${
                      feature.enabled
                        ? "bg-brand-itemBg border-brand-borderSolid"
                        : "bg-brand-cardBg border-brand-borderSolid"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        feature.enabled
                          ? "bg-brand-iconBg"
                          : "bg-brand-cardBg"
                      }`}
                    >
                      <feature.icon
                        size={24}
                        className={
                          feature.enabled
                            ? "text-brand-accentCleaned"
                            : "text-brand-accentAi"
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium text-[15px] ${
                          feature.enabled
                            ? "text-brand-textPrimary"
                            : "text-brand-accentAi"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-sm mt-0.5 ${
                          feature.enabled
                            ? "text-brand-textSecondary"
                            : "text-brand-textSecondary"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                    <div className="shrink-0 mt-1">
                      {feature.enabled ? (
                        <Check
                          size={18}
                          className="text-brand-accentCleaned"
                        />
                      ) : (
                        <X size={18} className="text-brand-accentAi" />
                      )}
                    </div>
                  </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
