import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms of Service | UnreckAI",
  description: "Terms of service for UnreckAI.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-textPrimary">
      <Nav />
      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-16">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-brand-textSecondary text-sm mb-12">
          Last updated: March 13, 2026
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-3">License</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              UnreckAI grants you a personal, non-exclusive, non-transferable
              license to use the application on devices you own. One Pro
              subscription covers both macOS and iOS. You may not redistribute,
              reverse engineer, or modify the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Subscriptions</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              Subscriptions are managed entirely through Apple&apos;s App Store.
              Billing, renewals, cancellations, and refunds are handled by Apple
              according to their terms. UnreckAI offers a 14-day free trial for
              new Pro subscribers. Your subscription will auto-renew unless
              cancelled at least 24 hours before the end of the current period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptable Use</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              You agree to use UnreckAI only for its intended purpose: cleaning
              and formatting clipboard text. You may not use the app to process
              content that violates applicable laws, or attempt to circumvent
              subscription requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Intellectual Property
            </h2>
            <p className="text-brand-textSecondary leading-relaxed">
              UnreckAI, its logo, design, and code are the property of
              UnreckAI. Your text remains yours. We claim no rights to any
              content you process through the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              UnreckAI is provided &quot;as is&quot; without warranty of any
              kind. We do not guarantee that the app will catch every formatting
              issue or work perfectly with every application. Text
              transformations are deterministic and rule-based, but results may
              vary depending on the source content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Security Limitations
            </h2>
            <p className="text-brand-textSecondary leading-relaxed mb-3">
              Credential protection features are provided on a best-effort
              basis. UnreckAI cannot guarantee detection of all sensitive
              content. The iOS keyboard extension operates within Apple&apos;s
              sandboxed keyboard environment and has limited visibility into the
              hosting application. Users should configure app exclusions for any
              application where clipboard processing is unwanted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Limitation of Liability
            </h2>
            <p className="text-brand-textSecondary leading-relaxed">
              To the maximum extent permitted by law, UnreckAI shall not be
              liable for any indirect, incidental, or consequential damages
              arising from use of the app. Our total liability shall not exceed
              the amount you paid for the app in the 12 months preceding the
              claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Changes to These Terms
            </h2>
            <p className="text-brand-textSecondary leading-relaxed">
              We may update these terms from time to time. Continued use of the
              app after changes constitutes acceptance of the new terms. We will
              update the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-brand-textSecondary leading-relaxed">
              Questions about these terms? Reach us at{" "}
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
