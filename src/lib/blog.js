import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'content/blog');

export function getBlogSlugs() {
  return fs.readdirSync(BLOG_PATH).filter(path => /\.mdx?$/.test(path));
}

export function getBlogPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(BLOG_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(words / 230));

  return { slug: realSlug, frontmatter: data, content, readingTime };
}

export function getAllBlogPosts() {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));
  return posts;
}
