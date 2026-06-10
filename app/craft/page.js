import Link from "next/link";

import Reveal from "../../src/components/Reveal";
import { getAllCraft } from "../../src/lib/craft";

export const metadata = {
  title: "Craft",
  description:
    "Experiments, side projects, and tinkering. Where I test ideas before they become anything real.",
  alternates: { canonical: "/craft" },
};

const STATUS = {
  shipped: { label: "Shipped", className: "bg-green" },
  wip: { label: "Work in progress", className: "bg-amber" },
  exploring: { label: "Exploring", className: "bg-[#94a3b8]" },
};

const formatDate = (date) =>
  new Date(date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

export default function CraftIndex() {
  const items = getAllCraft();

  return (
    <div className="pt-12 md:pt-20">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[3px] text-ash">
          CRAFT / THE LAB
        </p>
        <h1 className="mt-5 font-mono text-[clamp(28px,4.6vw,48px)] font-bold leading-tight tracking-[-0.02em] text-ink">
          Things I&apos;m{" "}
          <em className="font-serif font-medium italic">tinkering</em> with
        </h1>
        <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.8] text-dim">
          Experiments, AI findings, weekend builds, and half-finished ideas.
          The place where things start before they become real projects.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        {items.length === 0 ? (
          <p className="text-[13px] text-dim">Nothing here yet. Soon.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map(({ slug, frontmatter }) => {
              const status = STATUS[frontmatter.status];
              return (
                <Link
                  key={slug}
                  href={`/craft/${slug}`}
                  className="group rounded-xl border border-line p-5 transition-all hover:-translate-y-0.5 hover:border-line-mid"
                >
                  <p className="flex items-center gap-2 font-mono text-[9.5px] tracking-wide text-dim">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        status?.className || "bg-ash"
                      }`}
                    />
                    {status?.label || "Note"}
                  </p>
                  <h2 className="mt-3 font-mono text-[14px] font-bold leading-snug text-ink decoration-line-bright underline-offset-4 group-hover:underline">
                    {frontmatter.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-dim">
                    {frontmatter.description}
                  </p>
                  {frontmatter.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] text-ash"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 font-mono text-[9.5px] tracking-[1px] text-ash">
                    {formatDate(frontmatter.date)}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </Reveal>
    </div>
  );
}
