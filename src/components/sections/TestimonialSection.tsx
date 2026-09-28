import { getTestimonials } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";

// Hidden entirely until real testimonials are supplied. Three or more become a carousel; fewer are shown plainly.
export async function TestimonialSection() {
  const items = await getTestimonials();
  if (items.length === 0) return null;
  const quote = (t: (typeof items)[number]) => (
    <blockquote className="h-full border-l-2 border-secondary bg-white p-8">
      <p className="font-heading text-xl leading-relaxed">“{t.quote}”</p>
      <footer className="mt-4 text-sm text-muted">— {t.name}</footer>
    </blockquote>
  );
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="Community" title="Life Together" className="mb-10" />
        {items.length >= 3 ? (
          <Carousel label="Testimonials" itemLabel="testimonial" slideClassName="basis-full lg:basis-1/2">{items.map((t) => <div key={t.id} className="h-full">{quote(t)}</div>)}</Carousel>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">{items.map((t) => <div key={t.id}>{quote(t)}</div>)}</div>
        )}
      </Container>
    </section>
  );
}
