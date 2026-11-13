import type { Metadata } from "next";
import { bankAccounts } from "@/data/giving";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";

export const metadata: Metadata = { title: "Give", description: "Give your tithes and offerings to St. Stephen's Anglican Church by bank transfer.", alternates: { canonical: "/give" } };

export default function GivePage() {
  return (
    <>
      <PageHero eyebrow="Generosity" title="Give with Purpose" intro="Your generosity helps sustain worship, fellowship, and outreach in our community." />
      <section className="py-20">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Tithes & offerings" title="Give by bank transfer" className="mb-10" />
          <ul className="grid gap-6 md:grid-cols-2">
            {bankAccounts.map((account, i) => (
              <li key={account.id}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-lg bg-white p-8 shadow-md">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"><Icon name="home" className="h-4 w-4" />{account.bank}</p>
                    <p className="mt-4 select-all font-heading text-3xl font-extrabold tracking-wider">{account.accountNumber}</p>
                    <p className="mt-2 text-sm text-muted">{account.accountName}</p>
                    <div className="mt-6"><CopyButton text={account.accountNumber} label={`Copy ${account.bank} account number`} /></div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-start gap-4 rounded-lg bg-light p-6">
            <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary"><Icon name="heart" className="h-5 w-5" /></span>
            <p>Parents are encouraged to give their children an offering every Sunday and to teach them how to give to God and pay tithe.</p>
          </div>
          {/* TODO: Connect an online payment gateway for card payments */}
          <p className="mt-6 text-sm text-muted">Online card payments are not available yet.</p>
        </Container>
      </section>
    </>
  );
}