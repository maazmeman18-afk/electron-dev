import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col justify-center py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Error 404</p>
      <h1 className="mt-4 text-display-lg uppercase">Page not found</h1>
      <div className="mt-10">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  );
}
