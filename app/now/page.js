import Reveal from "../../src/components/Reveal";

export const metadata = {
  title: "Now",
  description:
    "What I'm building, reading, and focused on right now. Updated monthly.",
  alternates: { canonical: "/now" },
};

// TODO(now-page): keep these fields fresh — update monthly. Pull real data
// from Spotify / Goodreads / GitHub later if we want it automated.
const NOW_DATA = {
  lastUpdated: "April 2026",
  location: "Hyderabad, India",
  building: {
    title: "Tia at Intripid",
    detail:
      "Leading frontend for our AI travel assistant. Shipping the first end-to-end version this quarter.",
  },
  focus: [
    "Frontend architecture for AI-first products",
    "Agent design patterns and tool-use UX",
    "Writing more — moving from notes to published posts",
  ],
  reading: [
    { title: "The Pragmatic Engineer", by: "Gergely Orosz" },
    { title: "Working in Public", by: "Nadia Eghbal" },
  ],
  shipping: [
    "Tia v1 — internal beta",
    "OpenClaw shell agent (see /craft)",
    "Daily AI experiments cross-posted to X",
  ],
  notLearning: [
    "Saying yes to things I shouldn't",
    "Polishing instead of shipping",
  ],
};

const Section = ({ label, children }) => (
  <section>
    <p className="mb-4 font-mono text-[10px] tracking-[3px] text-ash">
      {label}
    </p>
    {children}
  </section>
);

const ListBlock = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-dim">
        <span className="text-ash">—</span>
        {typeof item === "string" ? item : `${item.title} — ${item.by}`}
      </li>
    ))}
  </ul>
);

export default function Now() {
  return (
    <div className="max-w-[720px] pt-12 md:pt-20">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[3px] text-ash">NOW</p>
        <h1 className="mt-5 font-mono text-[clamp(28px,4.6vw,48px)] font-bold leading-tight tracking-[-0.02em] text-ink">
          What I&apos;m doing right now
        </h1>
        <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.8] text-dim">
          A snapshot of where my attention is. Inspired by Derek Sivers&apos;{" "}
          <a
            href="https://nownownow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-bright underline-offset-4 hover:decoration-ink"
          >
            now page
          </a>{" "}
          idea — updated monthly so you know this is current, not stale.
        </p>
        <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          Updated {NOW_DATA.lastUpdated} · {NOW_DATA.location}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 space-y-12 border-t border-line pt-12">
        <Section label="BUILDING">
          <p className="font-mono text-[15px] font-bold text-ink">
            {NOW_DATA.building.title}
          </p>
          <p className="mt-2 max-w-[560px] text-[13.5px] leading-relaxed text-dim">
            {NOW_DATA.building.detail}
          </p>
        </Section>

        <Section label="FOCUS THIS MONTH">
          <ListBlock items={NOW_DATA.focus} />
        </Section>

        <Section label="SHIPPING">
          <ListBlock items={NOW_DATA.shipping} />
        </Section>

        <Section label="READING">
          <ListBlock items={NOW_DATA.reading} />
        </Section>

        <Section label="ACTIVELY SAYING NO TO">
          <ListBlock items={NOW_DATA.notLearning} />
        </Section>

        <p className="border-t border-line pt-8 text-[12px] leading-relaxed text-dim">
          This page changes monthly. If you&apos;re reading something here and
          it feels stale, ping me on{" "}
          <a
            href="https://x.com/sreeeeenivas"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-bright underline-offset-4 hover:decoration-ink"
          >
            X
          </a>{" "}
          and I&apos;ll update it.
        </p>
      </Reveal>
    </div>
  );
}
