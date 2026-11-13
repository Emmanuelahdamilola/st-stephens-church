import type { Metadata } from "next";
import { church } from "@/data/church";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisitSection } from "@/components/sections/VisitSection";
import { WeeklySchedule } from "@/components/sections/WeeklySchedule";

export const metadata: Metadata = { title: "Plan a Visit", description: `Join us ${church.service.day.toLowerCase()} at ${church.service.time}.`, alternates: { canonical: "/plan-a-visit" } };

export default function PlanAVisitPage() {
  return (
    <>
      <PageHero eyebrow="Plan a visit" title="Join us this Sunday" />
      <VisitSection />
      <section className="bg-light py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Before you come" title="What to expect" className="mb-8" />
          <ul className="list-disc space-y-3 pl-5">
            <li>{church.service.name} is {church.service.day.toLowerCase()} at {church.service.time}.</li>
            <li>Everyone is welcome, whether you are new to church, returning to faith, or looking for a community to call home.</li>
            <li>Questions before you come? Call the church hotline on <a className="underline underline-offset-4" href={church.phoneHref}>{church.phone}</a> or email <a className="underline underline-offset-4" href={`mailto:${church.email}`}>{church.email}</a>.</li>
          </ul>
        </Container>
      </section>
      <WeeklySchedule />
    </>
  );
}