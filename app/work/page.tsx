import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { featuredProject, otherProjects } from "@/lib/projects";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { SeoStrip } from "@/components/work/SeoStrip";
import { Testimonials } from "@/components/work/Testimonials";

export const metadata: Metadata = {
  title: "Our Work: Website, App & CRM Case Studies",
  description:
    "Case studies from Electron Developers: the GUJJUBAZAR furniture website, Android app and CRM, and the Lakshraj Enterprise website and admin panel.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="pb-16 pt-12 sm:pb-20 sm:pt-20">
        <Container>
          <SectionHeading eyebrow="Our work" size="md" as="h1">
            Things we have built.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Websites, apps and business software we designed, built and set up
            for search, from first call to launch.
          </p>

          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
            <ProjectShowcase project={featuredProject} eyebrow="Featured project" titleAs="h2" />
            {otherProjects.map((project) => (
              <div key={project.slug} className="border-t-2 border-ink pt-16 sm:pt-20">
                <ProjectShowcase project={project} titleAs="h2" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SeoStrip />
      <Testimonials size="large" />

      <section className="py-16 sm:py-24">
        <Container>
          <CtaBanner
            eyebrow="Your project next?"
            title="Let’s build something that gets found."
            text="Seven quick questions and we take it from there."
          />
        </Container>
      </section>
    </>
  );
}
