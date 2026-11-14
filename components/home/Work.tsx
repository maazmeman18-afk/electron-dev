import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProject, otherProjects } from "@/lib/projects";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";

export function Work() {
  return (
    <section id="work" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected work" size="md">
            Things we have built.
          </SectionHeading>
          <Button href="/work" variant="outline">
            See all work
          </Button>
        </div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          <ProjectShowcase project={featuredProject} eyebrow="Featured project" />
          {otherProjects.map((project) => (
            <div key={project.slug} className="border-t-2 border-ink pt-16 sm:pt-20">
              <ProjectShowcase project={project} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
