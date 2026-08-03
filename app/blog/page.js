import Link from "next/link";

import Reveal from "../../src/components/Reveal";
import { getAllBlogPosts } from "../../src/lib/blog";

export const metadata = {
  title: "Writing",
  description:
    "Notes on building products, engineering leadership, and the ever-evolving landscape of AI. By Sreenivas Sonthena.",
  alternates: { canonical: "/blog" },
};

const formatDate = (date) =>
  new Date(date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-12 md:pt-20">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[3px] text-ash">WRITING</p>
        <h1 className="mt-5 font-mono text-[clamp(28px,4.6vw,48px)] font-bold leading-tight tracking-[-0.02em] text-ink">
          Writing &amp; reflections
        </h1>
        <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.8] text-dim">
          Notes on building products, engineering leadership, and the
          ever-evolving landscape of AI.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 border-b border-line">
        {posts.map(({ slug, frontmatter }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="group block border-t border-line py-7 transition-colors hover:bg-white/[0.02]"
          >
            <p className="font-mono text-[9.5px] tracking-[1.5px] text-ash">
              {formatDate(frontmatter.date)}
            </p>
            <h2 className="mt-2 font-mono text-[16px] font-bold text-ink decoration-line-bright underline-offset-4 group-hover:underline">
              {frontmatter.title}
            </h2>
            <p className="mt-2 max-w-[600px] text-[13px] leading-relaxed text-dim">
              {frontmatter.description}
            </p>
          </Link>
        ))}
      </Reveal>
    </div>
  );
}
