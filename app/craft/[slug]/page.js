import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import { getCraftBySlug, getCraftSlugs } from "../../../src/lib/craft";

const STATUS = {
  shipped: { label: "Shipped", className: "bg-green" },
  wip: { label: "Work in progress", className: "bg-amber" },
  exploring: { label: "Exploring", className: "bg-[#94a3b8]" },
};

export function generateStaticParams() {
  return getCraftSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = getCraftBySlug(slug);
  return {
    title: `${frontmatter.title} — Craft`,
    description: frontmatter.description,
    alternates: { canonical: `/craft/${slug}` },
  };
}

const MetaRow = ({ label, children }) => (
  <div>
    <p className="mb-1 font-mono text-[9px] tracking-[1.5px] text-dim">
      {label}
    </p>
    <div className="font-mono text-[12px] text-ink">{children}</div>
  </div>
);

export default async function CraftPost({ params }) {
  const { slug } = await params;
  const { frontmatter, content } = getCraftBySlug(slug);
  const status = STATUS[frontmatter.status];
  const dateStr = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-[720px] pb-10 pt-12 md:pt-16">
      <Link
        href="/craft"
        className="font-mono text-[10px] tracking-[2px] text-ash transition-colors hover:text-ink"
      >
        ← BACK TO THE LAB
      </Link>

      <p className="mt-6 flex items-center gap-2 font-mono text-[10px] text-dim">
        <span
          className={`h-1.5 w-1.5 rounded-full ${status?.className || "bg-ash"}`}
        />
        {status?.label || "Note"} · {dateStr}
      </p>
      <h1 className="mt-3 font-mono text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[30px]">
        {frontmatter.title}
      </h1>
      <p className="mt-3 text-[13.5px] leading-[1.8] text-dim">
        {frontmatter.description}
      </p>

      <div className="my-8 h-px bg-line" />

      {(frontmatter.tags?.length ||
        frontmatter.demoLink ||
        frontmatter.sourceLink) && (
        <div className="mb-10 grid gap-5 sm:grid-cols-3">
          {frontmatter.tags?.length > 0 && (
            <MetaRow label="TAGS">{frontmatter.tags.join(" · ")}</MetaRow>
          )}
          {frontmatter.demoLink && (
            <MetaRow label="DEMO">
              <a
                href={frontmatter.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line-bright underline-offset-4 hover:decoration-ink"
              >
                open ↗
              </a>
            </MetaRow>
          )}
          {frontmatter.sourceLink && (
            <MetaRow label="SOURCE">
              <a
                href={frontmatter.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line-bright underline-offset-4 hover:decoration-ink"
              >
                github ↗
              </a>
            </MetaRow>
          )}
        </div>
      )}

      <article className="article">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
