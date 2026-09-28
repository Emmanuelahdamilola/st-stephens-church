import { Hero } from "@/components/hero/Hero";
import { heroSlides } from "@/data/hero";
import { EventsOverlap } from "@/components/sections/EventsOverlap";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { SermonSection } from "@/components/sections/SermonSection";
import { MinistriesSection } from "@/components/sections/MinistriesSection";
import { CommunionSection } from "@/components/sections/CommunionSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { PrayerGivingSection } from "@/components/sections/PrayerGivingSection";
import { VisitSection } from "@/components/sections/VisitSection";

// Flow: Hero with overlapping event/service cards, Welcome, About + values, Mission quote band,
// Sermons, Ministries, Communion, Leadership, Testimonials (hidden when empty), Prayer + Giving, Visit/Contact.
export default function HomePage() {
  return (
    <>
      <Hero slides={heroSlides} />
      <EventsOverlap />
      <WelcomeSection />
      <AboutSection />
      <QuoteBand />
      <SermonSection />
      <MinistriesSection />
      <CommunionSection />
      <LeadershipSection />
      <TestimonialSection />
      <PrayerGivingSection />
      <VisitSection />
    </>
  );
}
