import Image from "next/image";
import Link from "next/link";

import HeroArtifact from "../src/components/HeroArtifact";
import Reveal from "../src/components/Reveal";
import { Data } from "../src/Data";
import { getAllBlogPosts } from "../src/lib/blog";
import { getAllCraft } from "../src/lib/craft";
import { SITE } from "../src/site";

const STATS = [
  { number: "4+", label: "years building products" },
  { number: "3", label: "companies shipped at" },
  { number: "25", label: "person team led" },
];

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

function WorkRow({ item, index }) {
  const { Name, web, link, desc, images, tags } = item;
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group grid grid-cols-[2.5rem_1fr] items-start gap-4 border-t border-line py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-[2.5rem_1fr_auto] md:gap-8"
    >
      <span className="pt-1 font-mono text-[11px] text-ash">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-mono text-[15px] font-bold text-ink decoration-line-bright underline-offset-4 group-hover:underline">
            {Name}
          </h3>
          {web && <span className="font-mono text-[10px] text-ash">{web}</span>}
        </div>
        <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-dim">
          {desc[0].data}
        </p>
        {tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map(({ name }) => (
              <span
                key={name}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] tracking-wide text-ash"
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="hidden items-center gap-5 md:flex">
        {images?.[0] && (
          <Image
            src={images[0].src}
            alt={images[0].words}
            width={104}
            height={68}
            className="h-[68px] w-[104px] rounded-lg border border-line object-cover opacity-70 transition-opacity group-hover:opacity-100"
          />
        )}
        {link && (
          <span className="text-[14px] text-ash transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink">
            ↗
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export default function Home() {
  const posts = getAllBlogPosts();
  const craft = getAllCraft();

  return (
    <div className="pt-12 md:pt-20">
      {/* Hero */}
      <section
        data-x="hero"
        className="grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16"
      >
        <Reveal>
          <p className="font-mono text-[10px] tracking-[3px] text-ash">
            SREENIVAS SONTHENA · TECH LEAD @ INTRIPID
          </p>
          <h1 className="mt-5 max-w-[560px] font-mono text-[26px] font-bold leading-[1.3] tracking-tight text-ink md:text-[32px]">
            From crazy idea to shipped product —{" "}
            <span className="bg-gradient-to-r from-pink to-blue bg-clip-text text-transparent">
              I build the whole thing
            </span>
            .
          </h1>
          <p className="mt-5 max-w-[480px] text-[14px] leading-relaxed text-dim">
            Design, engineering, and everything in between. Currently leading
            frontend at Intripid, building Tia — an AI travel assistant that
            turns vague ideas into booked trips.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-lg bg-ink px-5 py-2.5 font-mono text-[12px] font-bold text-bg transition-transform hover:-translate-y-0.5"
            >
              Get in touch →
            </a>
            <Link
              href="/craft"
              className="rounded-lg border border-line-mid px-5 py-2.5 font-mono text-[12px] text-dim transition-colors hover:border-line-bright hover:text-ink"
            >
              Enter the lab
            </Link>
          </div>

          <div className="mt-12 flex gap-10">
            {STATS.map(({ number, label }) => (
              <div key={label}>
                <p className="font-mono text-[26px] font-bold leading-none text-ink">
                  {number}
                </p>
                <p className="mt-2 font-mono text-[9.5px] tracking-wide text-ash">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <HeroArtifact />
        </Reveal>
      </section>

      {/* Now strip */}
      <Reveal delay={0.1} className="mt-16">
        <Link
          href="/now"
          data-x="now-strip"
          className="group flex flex-wrap items-center gap-3 rounded-xl border border-line px-5 py-4 transition-colors hover:border-line-mid"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
          <span className="font-mono text-[10px] tracking-[2px] text-dim">
            NOW
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
      <section data-x="selected-work" className="mt-20">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[3px] text-ash">
            SELECTED WORK
          </p>
          <h2 className="mt-3 mb-8 font-mono text-[20px] font-bold tracking-tight text-ink">
            Products I&apos;ve shipped
          </h2>
        </Reveal>
        <div className="border-b border-line">
          {Data.map((item, index) => (
            <Reveal key={item.Name}>
              <WorkRow item={item} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Craft strip */}
      {craft.length > 0 && (
        <section data-x="craft" className="mt-20">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[3px] text-ash">
                  THE LAB
                </p>
                <h2 className="mt-3 font-mono text-[20px] font-bold tracking-tight text-ink">
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
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      <section data-x="writing" className="mt-20">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[3px] text-ash">
                WRITING
              </p>
              <h2 className="mt-3 font-mono text-[20px] font-bold tracking-tight text-ink">
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
          <div className="mt-8 border-b border-line">
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
