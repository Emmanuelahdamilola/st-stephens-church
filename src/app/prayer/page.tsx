import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PrayerForm } from "@/components/sections/PrayerForm";

export const metadata: Metadata = { title: "Prayer", description: "Submit a prayer request to St. Stephen's Anglican Church.", alternates: { canonical: "/prayer" } };

export default function PrayerPage() {
  return (
    <>
      <PageHero eyebrow="Prayer" title="Need Prayer?" intro="You don't have to walk through it alone." />
      <section className="py-20"><Container className="max-w-2xl"><PrayerForm /></Container></section>
    </>
  );
}
