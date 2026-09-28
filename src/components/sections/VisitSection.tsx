import { church } from "@/data/church";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconRow } from "@/components/ui/IconRow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapEmbed } from "@/components/ui/MapEmbed";

export function VisitSection() {
  return (
    <section className="py-28">
      <Container className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Plan your visit" title="You have a place here." />
          <p className="mt-8 max-w-lg text-lg">Whether you are new to church, returning to faith, or looking for a community to call home, we would love to welcome you.</p>
          <div className="mt-9 space-y-5">
            <IconRow icon="clock" label={church.service.name}><span className="font-heading text-2xl font-bold">{church.service.time}</span></IconRow>
            <IconRow icon="pin" label="Address">{church.address.street}, {church.address.town}, {church.address.region}</IconRow>
            <IconRow icon="mail" label="Email"><a className="underline underline-offset-4" href={`mailto:${church.email}`}>{church.email}</a></IconRow>
            <IconRow icon="facebook" label="Facebook"><a className="underline underline-offset-4" href={church.facebookUrl} target="_blank" rel="noopener noreferrer">{church.facebookHandle}</a></IconRow>
          </div>
          <div className="mt-10"><Button href="/plan-a-visit" variant="primary">Plan Your Visit</Button></div>
        </Reveal>
        <Reveal delay={0.1}><div className="border-8 border-light shadow-xl"><MapEmbed /></div></Reveal>
      </Container>
    </section>
  );
}
