"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { church } from "@/data/church";
import { ministries } from "@/data/ministries";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

interface NavItem { label: string; href: string; children?: { label: string; href: string }[] }

const desktopLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About", href: "/about",
    children: [
      { label: "Our Church", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Leadership", href: "/leadership" },
      { label: "What We Believe", href: "/about#beliefs" },
    ],
  },
  { label: "Ministries", href: "/ministries", children: ministries.map((m) => ({ label: m.name, href: `/ministries/${m.slug}` })) },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Holy Communion", href: "/holy-communion" },
];

const mobileLinks = [
  ["Home", "/"], ["About", "/about"], ["Ministries", "/ministries"], ["Sermons", "/sermons"],
  ["Events", "/events"], ["Holy Communion", "/holy-communion"], ["Prayer", "/prayer"],
  ["Give", "/give"], ["Plan a Visit", "/plan-a-visit"], ["Contact", "/contact"],
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  // Transparent-over-hero uses white text; once scrolled the header turns into a light, solid bar with dark text.
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !menu.current) return;
    const items = menu.current.querySelectorAll<HTMLElement>("a, button");
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <>
      <header {...(!scrolled ? { "data-dark": true } : {})} className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "header-solid text-ink" : "bg-transparent text-white"}`}>
        {/* Slim info bar (desktop). Collapses once the page scrolls. */}
        <div data-dark className={`hidden overflow-hidden border-b border-white/15 bg-dark text-xs transition-[max-height] duration-300 xl:block ${scrolled ? "max-h-0" : "max-h-10"}`}>
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-8 text-white/85">
            <p className="flex items-center gap-7">
              <span className="flex items-center gap-2"><Icon name="clock" className="h-4 w-4 text-secondary" />{church.service.name}: {church.service.time}</span>
              <span className="flex items-center gap-2"><Icon name="pin" className="h-4 w-4 text-secondary" />{church.address.street}, {church.address.town}</span>
            </p>
            <p className="flex items-center gap-5">
              <a href={church.phoneHref} className="flex items-center gap-2 hover:text-secondary"><Icon name="phone" className="h-4 w-4 text-secondary" />{church.phone}</a>
              <a href={`mailto:${church.email}`} className="flex items-center gap-2 hover:text-secondary"><Icon name="mail" className="h-4 w-4 text-secondary" />{church.email}</a>
              <a href={church.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={`${church.name} on Facebook`} className="hover:text-secondary"><Icon name="facebook" className="h-4 w-4" /></a>
            </p>
          </div>
        </div>

        <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${solid ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center gap-3 leading-tight">
            <span aria-hidden className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${solid ? "border-primary text-primary" : "border-secondary text-secondary"}`}><Icon name="cross" className="h-5 w-5" /></span>
            <span>
              <span className="block font-heading text-base font-bold sm:text-lg">St. Stephen&apos;s Anglican</span>
              <span className={`block text-[10px] font-semibold uppercase tracking-[0.3em] ${solid ? "text-primary" : "text-secondary"}`}>{church.tagline}</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
            {desktopLinks.map((item) => (
              <div key={item.label} className="group relative">
                <Link href={item.href} className={`relative flex items-center gap-1 py-2 text-xs font-bold uppercase tracking-widest after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform group-hover:after:scale-x-100 group-focus-within:after:scale-x-100`}>
                  {item.label}
                  {item.children && <Icon name="chevronDown" className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
                </Link>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full min-w-60 translate-y-3 rounded-b-lg border-t-2 border-primary bg-white py-2 text-ink opacity-0 shadow-2xl transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <li key={c.href}><Link href={c.href} className="block px-5 py-2.5 text-sm font-medium transition-all hover:translate-x-1 hover:bg-light hover:text-primary">{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <Button href="/give" variant={solid ? "secondary" : "outlineLight"} arrow={false} className="!py-2.5">Give</Button>
            <Button href="/plan-a-visit" variant="primary" className="!py-2.5">Plan a Visit</Button>
          </div>

          <button ref={menuButton} type="button" className="p-2 xl:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
            <Icon name={open ? "close" : "menu"} className="h-7 w-7" />
          </button>
        </div>
        <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" ref={menu} role="dialog" aria-modal="true" aria-label="Site menu" data-dark onKeyDown={trapFocus}
            className="pattern-cross fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-dark px-5 pb-10 pt-4 text-white xl:hidden"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <ul className="divide-y divide-white/10">
              {mobileLinks.map(([label, href], i) => (
                <motion.li key={href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.3 }}>
                  <Link href={href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 font-heading text-2xl font-bold">
                    {label}<Icon name="arrowRight" className="h-5 w-5 text-secondary" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 space-y-2 text-sm text-white/80">
              <p className="flex items-center gap-2"><Icon name="clock" className="h-4 w-4 text-secondary" />{church.service.name} — {church.service.time}</p>
              <p className="flex items-center gap-2"><Icon name="pin" className="h-4 w-4 text-secondary" />{church.address.street}, {church.address.town}</p>
              <p><a href={church.phoneHref} className="flex items-center gap-2"><Icon name="phone" className="h-4 w-4 text-secondary" />Church hotline: {church.phone}</a></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}