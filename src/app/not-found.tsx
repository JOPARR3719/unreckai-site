import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-textPrimary flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-6xl sm:text-8xl font-semibold tracking-tight text-gradient">
            404
          </h1>
          <p className="text-lg text-brand-textSecondary">
            This page doesn&apos;t exist.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-brand-accentCleaned text-brand-bg text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_12px_rgba(59,232,176,0.4)] hover:-translate-y-px active:translate-y-px active:brightness-95"
          >
            Back to home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
