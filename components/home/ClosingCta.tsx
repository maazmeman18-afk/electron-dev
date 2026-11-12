import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="border-y-2 border-ink bg-accent py-20 sm:py-28">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">
          Have an idea?
        </p>
        <h2 className="mt-4 max-w-6xl text-display-xl uppercase">
          Let&rsquo;s build something that matters.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/contact" size="lg" variant="dark" enquiry>
            Start a Project
          </Button>
          <a
            href={`mailto:${site.email}`}
            className="break-all text-lg font-semibold underline underline-offset-4"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
