import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import { getBlogPostBySlug, getBlogSlugs } from "../../../src/lib/blog";

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = getBlogPostBySlug(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.ogImage && { images: [frontmatter.ogImage] }),
    },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const { frontmatter, content, readingTime } = getBlogPostBySlug(slug);
  const dateStr = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-[680px] pb-10 pt-14 md:pt-24">
      <Link
        href="/blog"
        className="font-mono text-[10px] tracking-[2px] text-ash transition-colors hover:text-ink"
      >
        ← ALL WRITING
      </Link>

      <p className="mt-8 font-mono text-[10px] tracking-[2.5px] text-ash">
        {dateStr.toUpperCase()} · {readingTime} MIN READ
      </p>
      <h1 className="mt-4 font-mono text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[30px]">
        {frontmatter.title}
      </h1>

      {frontmatter.description && (
        <p className="mt-4 text-[15px] leading-relaxed text-dim">
          {frontmatter.description}
        </p>
      )}

      {frontmatter.cover ? (
        <figure className="my-10 overflow-hidden rounded-xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frontmatter.cover}
            alt={frontmatter.coverAlt || ""}
            width={1200}
            height={630}
            className="block h-auto w-full"
          />
        </figure>
      ) : (
        <div className="my-10 h-px bg-line" />
      )}

      <article className="article">
        <MDXRemote source={content} />
      </article>

      <div className="mt-16 border-t border-line pt-10">
        <p className="font-mono text-[10px] tracking-[2px] text-ash">
          WRITTEN BY
        </p>
        <p className="mt-3 font-mono text-[16px] font-bold text-ink">
          Sreenivas Sonthena
        </p>
        <p className="mt-1 text-[12.5px] text-dim">
          Design engineer in Hyderabad. Builds products end-to-end, and some of them in the open.
        </p>
      </div>
    </div>
  );
}
