import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { InvisibleWorkflow } from "@/components/invisible-workflow";
import { Privacy } from "@/components/privacy";
import { VisualProof } from "@/components/visual-proof";
import { Personas } from "@/components/personas";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-brand-bg">
        <Hero />
        <Marquee />
        <InvisibleWorkflow />
        <Privacy />
        <VisualProof />
        <Personas />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
