import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Why } from "@/components/home/Why";
import { Work } from "@/components/home/Work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Why />
      <Process />
      <ClosingCta />
    </>
  );
}
