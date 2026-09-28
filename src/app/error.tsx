"use client";
import { Container } from "@/components/ui/Container";

// Never shows technical details to visitors.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="py-40 text-center">
      <h1 className="font-heading text-4xl">Something went wrong.</h1>
      <p className="mt-4 text-muted">We couldn&apos;t load this content right now.</p>
      <button type="button" onClick={reset} className="mt-8 bg-dark px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-primary">Try again</button>
    </Container>
  );
}
