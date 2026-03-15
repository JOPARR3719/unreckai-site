import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy Policy | UnreckAI",
  description:
    "How UnreckAI handles your data. On-device processing, no servers, no tracking.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-textPrimary">
      <Nav />
      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-16">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-brand-textSecondary text-sm mb-12">
          Last updated: March 13, 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-3">What We Process</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              UnreckAI processes clipboard text entirely on your device. Your
              text is never sent to our servers or any third party. All
              formatting detection, cleaning, and translation happens locally
              using deterministic rules, not AI or cloud services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Credential Protection
            </h2>
            <p className="text-brand-textSecondary leading-relaxed mb-3">
              UnreckAI automatically detects and skips clipboard content that may
              contain credentials or sensitive data:
            </p>
            <ul className="list-disc list-inside text-brand-textSecondary space-y-1 ml-2">
              <li>
                Honors standard privacy markers set by password managers.
                Content flagged by these markers is never read, processed, or
                displayed.
              </li>
              <li>
                Detects secure text fields (password inputs) on macOS and
                disables processing automatically.
              </li>
              <li>
                On iOS, detects secure text entry fields and disables the
                cleaning feature.
              </li>
              <li>
                Skips content arriving from other Apple devices via Universal
                Clipboard.
              </li>
              <li>
                Configurable app exclusion lists let you exempt any application
                from processing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">What We Collect</h2>
            <p className="text-brand-textSecondary leading-relaxed mb-3">
              UnreckAI collects anonymous usage events through TelemetryDeck, a
              privacy-first analytics provider hosted in the EU. These events
              help us understand which features are used and improve the app. The
              events we collect are:
            </p>
            <ul className="list-disc list-inside text-brand-textSecondary space-y-1 ml-2">
              <li>Paywall viewed (which screen opened it)</li>
              <li>Trial started, cancelled, or converted (plan type only)</li>
              <li>Onboarding step completed or skipped</li>
              <li>Keyboard full access granted</li>
              <li>Pro feature tapped (feature name only)</li>
            </ul>
            <p className="text-brand-textSecondary leading-relaxed mt-3">
              These events contain no text content, no personal information, and
              no IP addresses. TelemetryDeck does not use cookies or
              fingerprinting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              What We Do NOT Collect
            </h2>
            <ul className="list-disc list-inside text-brand-textSecondary space-y-1 ml-2">
              <li>Clipboard contents or any text you copy or paste</li>
              <li>Keystrokes or screen content</li>
              <li>Browsing history or app usage patterns</li>
              <li>Contacts, photos, or location data</li>
              <li>Device identifiers linked to your identity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Third-Party Services
            </h2>
            <ul className="list-disc list-inside text-brand-textSecondary space-y-2 ml-2">
              <li>
                <strong className="text-brand-textPrimary">TelemetryDeck</strong>
                : Anonymous, privacy-first analytics. EU-hosted,
                GDPR-compliant. No cookies, no fingerprinting, no personal data.
              </li>
              <li>
                <strong className="text-brand-textPrimary">Apple StoreKit</strong>
                : Manages subscriptions. Handled entirely by Apple.
              </li>
              <li>
                <strong className="text-brand-textPrimary">
                  Apple Intelligence
                </strong>
                : On-device text refinement (Pro only). Runs locally using
                Apple&apos;s model. No data sent to Apple or anyone else.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Analytics Opt-Out</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              You can disable anonymous analytics in the Settings tab of the
              app. When disabled, no events are sent to TelemetryDeck. The app
              works identically with analytics on or off.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              We do not store any user data on our servers. Cleaning statistics
              (paste counts, issue counts) are stored locally on your device and
              never transmitted. TelemetryDeck retains anonymous event data
              according to their own retention policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Children</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              UnreckAI is not directed at children under 13 and does not
              knowingly collect any personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              Questions about this policy? Reach us at{" "}
              <a
                href="mailto:support@unreckai.com"
                className="text-brand-accentCleaned hover:underline"
              >
                support@unreckai.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
