"use client";

import { useState, useCallback } from "react";
import { SplashIntro } from "@/components/splash-intro";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { InvisibleWorkflow } from "@/components/invisible-workflow";
import { DetectionEngine } from "@/components/detection-engine";
import { Privacy } from "@/components/privacy";
import { VisualProof } from "@/components/visual-proof";
import { Personas } from "@/components/personas";
import { ClipboardViewer } from "@/components/clipboard-viewer";
import { Pricing } from "@/components/pricing";
import { FaqChangelog } from "@/components/faq-changelog";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  return (
    <>
      <SplashIntro onComplete={handleSplashComplete} />
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          animation: splashDone ? "splash-site-in 800ms ease-out forwards" : undefined,
        }}
      >
        <Nav />
        <main className="bg-brand-bg">
          <Hero />

          <Reveal>
            <Marquee />
          </Reveal>

          <Reveal>
            <InvisibleWorkflow />
          </Reveal>

          <Reveal>
            <DetectionEngine />
          </Reveal>

          <Reveal>
            <Privacy />
          </Reveal>

          <Reveal>
            <VisualProof />
          </Reveal>

          <Reveal>
            <Personas />
          </Reveal>

          <Reveal>
            <ClipboardViewer />
          </Reveal>

          <Reveal>
            <Pricing />
          </Reveal>

          <FaqChangelog />
        </main>
        <Reveal>
          <Footer />
        </Reveal>
      </div>
    </>
  );
}
