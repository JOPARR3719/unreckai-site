import { Lock, Globe, Shield, Cloud, Check, X } from "lucide-react";

const privacyFeatures = [
  {
    icon: Lock,
    title: "On-device processing",
    description: "Your clipboard never leaves your Mac",
    enabled: true,
  },
  {
    icon: Globe,
    title: "Works entirely offline",
    description: "No internet required to clean your text",
    enabled: true,
  },
  {
    icon: Shield,
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
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="glow-card">
          <div className="glow-card-inner p-10 md:p-14">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left column */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentCleaned">
                    Privacy First
                  </p>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                    Private by default.
                  </h2>
                  <p className="text-brand-textSecondary text-lg leading-relaxed">
                    Every transformation happens on your Mac. No servers, no telemetry, no cloud calls. Your clipboard data stays exactly where it belongs.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    "Zero server footprint.",
                    "Fully offline capable.",
                    "Absolute data privacy.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check
                        size={16}
                        className="text-brand-accentCleaned shrink-0"
                      />
                      <span className="text-brand-textPrimary text-[15px]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {privacyFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className={`flex items-start gap-4 p-5 rounded-xl border ${
                      feature.enabled
                        ? "bg-brand-itemBg border-brand-borderSolid"
                        : "bg-brand-cardBg border-brand-borderSolid opacity-40"
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
                        size={20}
                        className={
                          feature.enabled
                            ? "text-brand-accentCleaned"
                            : "text-brand-textTertiary"
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium text-[15px] ${
                          feature.enabled
                            ? "text-brand-textPrimary"
                            : "text-brand-textTertiary"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-sm mt-0.5 ${
                          feature.enabled
                            ? "text-brand-textSecondary"
                            : "text-brand-textTertiary"
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
