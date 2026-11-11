import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Services",
};

// Placeholder. Rebuilt in Phase 3.
export default function ServicesPage() {
  return (
    <Container className="py-24">
      <h1 className="text-display-lg uppercase">Services</h1>
      <p className="mt-6 max-w-xl text-lg text-muted">This page is being rebuilt.</p>
    </Container>
  );
}
