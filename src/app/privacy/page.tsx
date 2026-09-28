import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

// TODO: Add the church's approved Privacy Policy text.
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-20"><Container className="max-w-3xl"><p className="text-muted">This page will be published by the church soon.</p></Container></section>
    </>
  );
}
