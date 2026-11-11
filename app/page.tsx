import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Phase 1 placeholder hero. The full homepage is built in Phase 2.
export default function HomePage() {
  return (
    <section className="flex min-h-[78svh] items-center py-24">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Digital studio, Ahmedabad
        </p>
        <h1 className="mt-6 max-w-5xl text-display-xl uppercase">
          We turn ideas into digital products.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
          Websites, e-commerce platforms and business systems engineered to help
          ambitious businesses move forward.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" size="lg">
            Start a Project
          </Button>
          <Button href="/work" size="lg" variant="outline">
            Explore Our Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
