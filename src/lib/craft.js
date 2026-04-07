import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CRAFT_PATH = path.join(process.cwd(), "content/craft");

export function getCraftSlugs() {
  if (!fs.existsSync(CRAFT_PATH)) return [];
  return fs.readdirSync(CRAFT_PATH).filter((p) => /\.mdx?$/.test(p));
}

export function getCraftBySlug(slug) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(CRAFT_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, frontmatter: data, content };
}

export function getAllCraft() {
  const slugs = getCraftSlugs();
  const items = slugs
    .map((slug) => getCraftBySlug(slug))
    .sort((a, b) =>
      a.frontmatter.date > b.frontmatter.date ? -1 : 1
    );
  return items;
}
