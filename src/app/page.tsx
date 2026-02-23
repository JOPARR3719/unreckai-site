import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { InvisibleWorkflow } from "@/components/invisible-workflow";
import { Privacy } from "@/components/privacy";
import { VisualProof } from "@/components/visual-proof";
import { Personas } from "@/components/personas";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-brand-bg">
        {/* Hero: no reveal — visible immediately */}
        <Hero />

        <Reveal>
          <Marquee />
        </Reveal>

        <Reveal>
          <InvisibleWorkflow />
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
          <Pricing />
        </Reveal>
      </main>
      <Reveal>
        <Footer />
      </Reveal>
    </>
  );
}
