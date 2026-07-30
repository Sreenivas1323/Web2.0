import Link from "next/link";

import HeroArtifact from "../src/components/HeroArtifact";
import Reveal from "../src/components/Reveal";
import RevealLine from "../src/components/RevealLine";
import WorkList from "../src/components/WorkList";
import { Data } from "../src/Data";
import { getAllBlogPosts } from "../src/lib/blog";
import { getAllCraft } from "../src/lib/craft";
import { SITE } from "../src/site";

const STATS = [
  { key: "years_building_products", value: "4+" },
  { key: "companies_shipped_at", value: "3" },
  { key: "largest_team_led", value: "25 people" },
];

const SectionLabel = ({ children }) => (
  <p className="font-mono text-[11px] tracking-wide text-ash">
    <span className="select-none text-ash/60">{"// "}</span>
    {children}
  </p>
);

const STATUS_COLOR = {
  shipped: "bg-green",
  wip: "bg-amber",
  exploring: "bg-[#94a3b8]",
};

const formatDate = (date) =>
  new Date(date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

export default function Home() {
  const posts = getAllBlogPosts();
  const craft = getAllCraft();

  return (
    <div className="pt-12 md:pt-20">
      {/* Hero */}
      <section data-x="hero">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[3px] text-ash">
            SREENIVAS SONTHENA · TECH LEAD @ INTRIPID
          </p>
        </Reveal>

        <h1 className="mt-7 max-w-[780px] font-mono text-[clamp(26px,3.8vw,38px)] font-bold leading-[1.35] tracking-[-0.6px] text-ink">
          <RevealLine delay={0.05}>From crazy idea to</RevealLine>
          <RevealLine delay={0.16}>shipped product —</RevealLine>
          <RevealLine delay={0.27}>I build the whole thing.</RevealLine>
        </h1>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          <Reveal delay={0.2}>
            <p className="max-w-[480px] text-[14.5px] leading-relaxed text-dim">
              Design, engineering, and everything in between. Currently leading
              frontend at Intripid, building Tia — an AI travel assistant that
              turns vague ideas into booked trips.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-block rounded-lg bg-ink px-5 py-2.5 font-mono text-[12px] font-bold text-bg"
              >
                Get in touch →
              </a>
              <Link
                href="/craft"
                className="inline-block rounded-lg border border-line-mid px-5 py-2.5 font-mono text-[12px] text-dim transition-colors hover:border-line-bright hover:text-ink"
              >
                Enter the lab
              </Link>
            </div>

            <dl className="mt-12 max-w-[420px] space-y-2.5 font-mono text-[11.5px]">
              {STATS.map(({ key, value }) => (
                <div key={key} className="flex items-baseline gap-3">
                  <dt className="text-ash">{key}</dt>
                  <span
                    aria-hidden
                    className="flex-1 border-b border-dotted border-line-mid"
                  />
                  <dd className="font-bold text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 font-mono text-[10.5px] text-ash">
              psst — press{" "}
              <kbd className="rounded border border-line-mid px-1.5 py-0.5 text-[10px] text-dim">
                ⌘K
              </kbd>{" "}
              · this site has an x-ray mode
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <HeroArtifact />
          </Reveal>
        </div>
      </section>

      {/* Now strip */}
      <Reveal delay={0.1} className="mt-20">
        <Link
          href="/now"
          data-x="now-strip"
          className="group flex flex-wrap items-center gap-3 rounded-xl border border-line px-5 py-4 transition-colors hover:border-line-mid"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          <span className="font-mono text-[11px] tracking-wide text-dim">
            now
          </span>
          <span className="text-[12.5px] text-dim">
            Shipping Tia v1 · exploring agent UX patterns · writing more
          </span>
          <span className="ml-auto font-mono text-[10px] text-ash transition-colors group-hover:text-ink">
            /now →
          </span>
        </Link>
      </Reveal>

      {/* Selected work */}
      <section data-x="selected-work" className="mt-24">
        <Reveal>
          <SectionLabel>selected work</SectionLabel>
          <h2 className="mt-4 mb-10 font-mono text-[clamp(19px,2.2vw,23px)] font-bold tracking-[-0.3px] text-ink">
            Products I&apos;ve shipped
          </h2>
        </Reveal>
        <Reveal>
          <WorkList items={Data} />
        </Reveal>
      </section>

      {/* Craft strip */}
      {craft.length > 0 && (
        <section data-x="craft" className="mt-24">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <div>
                <SectionLabel>the lab</SectionLabel>
                <h2 className="mt-4 font-mono text-[clamp(19px,2.2vw,23px)] font-bold tracking-[-0.3px] text-ink">
                  Experiments in progress
                </h2>
              </div>
              <Link
                href="/craft"
                className="font-mono text-[11px] text-ash transition-colors hover:text-ink"
              >
                all experiments →
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {craft.slice(0, 3).map(({ slug, frontmatter }) => (
                <Link
                  key={slug}
                  href={`/craft/${slug}`}
                  className="group rounded-xl border border-line p-5 transition-all hover:-translate-y-0.5 hover:border-line-mid"
                >
                  <p className="flex items-center gap-2 font-mono text-[9px] tracking-wide text-dim">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        STATUS_COLOR[frontmatter.status] || "bg-ash"
                      }`}
                    />
                    {formatDate(frontmatter.date)}
                  </p>
                  <h3 className="mt-3 font-mono text-[13.5px] font-bold leading-snug text-ink">
                    {frontmatter.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-dim">
                    {frontmatter.description}
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Writing */}
      <section data-x="writing" className="mt-24">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <div>
              <SectionLabel>writing</SectionLabel>
              <h2 className="mt-4 font-mono text-[clamp(19px,2.2vw,23px)] font-bold tracking-[-0.3px] text-ink">
                Recent thoughts
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-mono text-[11px] text-ash transition-colors hover:text-ink"
            >
              all posts →
            </Link>
          </div>
          <div className="mt-10 border-b border-line">
            {posts.slice(0, 5).map(({ slug, frontmatter }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group flex items-baseline gap-6 border-t border-line py-5 transition-colors hover:bg-white/[0.02]"
              >
                <span className="w-[110px] shrink-0 font-mono text-[9.5px] tracking-wide text-ash">
                  {formatDate(frontmatter.date)}
                </span>
                <span className="font-mono text-[13.5px] font-bold text-ink decoration-line-bright underline-offset-4 group-hover:underline">
                  {frontmatter.title}
                </span>
                <span className="ml-auto text-[13px] text-ash transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
