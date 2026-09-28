import type { Metadata } from "next";
import { church } from "@/data/church";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { IconRow } from "@/components/ui/IconRow";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "Contact", description: `Contact ${church.name}.`, alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" />
      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-8">
            <p className="font-heading text-xl font-bold">{church.name}</p>
            <div className="space-y-5">
              <IconRow icon="pin" label="Address">{church.address.street}, {church.address.town}, {church.address.region}</IconRow>
              <IconRow icon="mail" label="Email"><a className="underline underline-offset-4" href={`mailto:${church.email}`}>{church.email}</a></IconRow>
              <IconRow icon="facebook" label="Facebook"><a className="underline underline-offset-4" href={church.facebookUrl} target="_blank" rel="noopener noreferrer">{church.facebookHandle}</a></IconRow>
              <IconRow icon="clock" label={church.service.name}><span className="font-heading text-xl font-bold">{church.service.time}</span></IconRow>
            </div>
            <div className="border-8 border-light shadow-xl"><MapEmbed /></div>
          </div>
        </Container>
      </section>
    </>
  );
}
