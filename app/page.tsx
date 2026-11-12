import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { SoftwareShowcase } from "@/components/home/SoftwareShowcase";
import { Why } from "@/components/home/Why";
import { Work } from "@/components/home/Work";

export const metadata: Metadata = {
  title: {
    absolute: "Electron Developers | Web, E-commerce & Software Development",
  },
  description:
    "Electron Developers is a studio in Ahmedabad, India building business websites, e-commerce stores and custom software such as CRM, ERP, inventory and billing systems.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <SoftwareShowcase />
      <Why />
      <Process />
      <ClosingCta />
    </>
  );
}
