import "./globals.css";

import CommandPalette from "../src/components/CommandPalette";
import Cursor from "../src/components/Cursor";
import SiteFooter from "../src/components/SiteFooter";
import SiteHeader from "../src/components/SiteHeader";
import { SITE, SOCIALS } from "../src/site";
import { inter, monolisa, newsreader } from "./fonts";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Sreenivas Sonthena — Engineer, Designer, Builder",
    template: "%s — Sreenivas Sonthena",
  },
  description:
    "Mechatronics engineer turned Tech Lead. I build AI-powered products end-to-end — design, code, ship. Currently at Intripid.",
  keywords: [
    "Tech Lead",
    "Product Designer",
    "Frontend Developer",
    "Design Engineer",
    "AI",
    "Intripid",
    "React",
    "Next.js",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Sreenivas Sonthena — Engineer, Designer, Builder",
    description:
      "Mechatronics engineer turned Tech Lead. Building AI-powered products end-to-end.",
    images: ["/images/profile-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.handle,
    site: SITE.handle,
    title: "Sreenivas Sonthena — Engineer, Designer, Builder",
    description:
      "Mechatronics engineer turned Tech Lead. Building AI-powered products end-to-end.",
    images: ["/images/profile-og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Tech Lead",
  worksFor: { "@type": "Organization", name: "Intripid" },
  url: SITE.url,
  sameAs: SOCIALS.map((s) => s.href),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${monolisa.variable} ${inter.variable} ${newsreader.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteHeader />
        <main className="mx-auto max-w-[1080px] px-4">{children}</main>
        <SiteFooter />
        <CommandPalette />
        <Cursor />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
