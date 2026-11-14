import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { SeoStrip } from "@/components/work/SeoStrip";
import { Testimonials } from "@/components/work/Testimonials";
import { Why } from "@/components/home/Why";
import { Work } from "@/components/home/Work";

export const metadata: Metadata = {
  title: {
    absolute: "Electron Developers: Web & SEO Company, Ahmedabad & Pune",
  },
  description:
    "Web development company in Ahmedabad and Pune: business websites, e-commerce stores and custom CRM, ERP and billing software, all built for SEO.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <SeoStrip />
      <Testimonials />
      <Why />
      <Process />
      <ClosingCta />
    </>
  );
}
