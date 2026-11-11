import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
};

// Placeholder. Rebuilt in Phase 3.
export default function ContactPage() {
  return (
    <Container className="py-24">
      <h1 className="text-display-lg uppercase">Contact</h1>
      <p className="mt-6 max-w-xl text-lg text-muted">This page is being rebuilt.</p>
    </Container>
  );
}
