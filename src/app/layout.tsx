import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { church } from "@/data/church";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { PRELOADER_KEY, PRELOADER_ONCE_PER_SESSION } from "@/lib/preloader";
import "./globals.css";

const heading = Poppins({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-heading", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

// TODO: set NEXT_PUBLIC_SITE_URL to the real domain before launch.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${church.name} — ${church.tagline}`, template: `%s | ${church.name}` },
  description: church.intro,
  alternates: { canonical: "/" },
  openGraph: { title: `${church.name} — ${church.tagline}`, description: church.description, type: "website", locale: "en_NG", images: [{ url: "/images/church-building.jpg", alt: "St. Stephen's Anglican Church building" }] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: church.name,
  alternateName: church.tagline,
  email: church.email,
  telephone: church.phoneIntl,
  address: { "@type": "PostalAddress", streetAddress: church.address.street, addressLocality: "Anaye, Ikere-Ekiti", addressRegion: church.address.region, addressCountry: "NG" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below may add a class to <html> before React loads.
    <html lang="en" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Returning visitors in the same session skip the splash: hide it before the first paint so it never flashes. */}
        {PRELOADER_ONCE_PER_SESSION && (
          <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("${PRELOADER_KEY}")==="1")document.documentElement.classList.add("preloader-seen")}catch(e){}` }} />
        )}
        {/* No JavaScript means the splash could never lift, so hide it. */}
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body>
        <Preloader />
        <div id="site">
          <a href="#main" className="sr-only z-[60] bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        </div>
      </body>
    </html>
  );
}