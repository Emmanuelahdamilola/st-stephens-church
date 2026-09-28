import type { Metadata } from "next";
import { getSermons } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SermonLibrary } from "@/components/sections/SermonLibrary";

export const metadata: Metadata = { title: "Sermons", description: "Watch and listen to sermons from St. Stephen's Anglican Church.", alternates: { canonical: "/sermons" } };

export default async function SermonsPage() {
  const sermons = await getSermons();
  return (
    <>
      <PageHero eyebrow="Word for the journey" title="Sermons" />
      <section className="py-20"><Container><SermonLibrary sermons={sermons} /></Container></section>
    </>
  );
}
