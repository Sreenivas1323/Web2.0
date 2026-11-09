# ssaisreenivas.in

My personal site: work, writing, open source, a lab of small tools, and the trips that don't fit anywhere else.

**Live:** [ssaisreenivas.in](https://ssaisreenivas.in)

> A calm site that does loud things: a quiet dark surface where every element is a little interactive, and the showy stuff stays hidden behind ⌘K.

## What's on it

| Route | What it is |
| --- | --- |
| `/` | Hero, the "now" strip, selected work, latest experiments and posts |
| `/craft` | The lab: experiments and small free tools (timezone converter, Swiggy → Zomato location bridge) |
| `/blog` | Writing on AI, building products, open source, and Hyderabad traffic |
| `/open-source` | What I give away: Bantu, Bujji, Claude Switcher, a free Git course, and more |
| `/extras` | Places I've been: Ladakh, Thailand, with my own photos |
| `/about` | Story, beliefs, timeline, tools |
| `/now` | What I'm focused on this month |

Hidden extras: press **⌘K** for the command palette, and turn on **x-ray mode** from there to see the site taken apart as a blueprint.

## Stack

- **Next.js 15** (App Router), **React 19**, every page statically generated
- **Tailwind CSS v4** with the design tokens in `app/globals.css` (`@theme`)
- **Motion** for reveals and the hero animation
- **MDX** posts via `next-mdx-remote` + `gray-matter`
- **cmdk** for the command palette
- Hosted on **Vercel**. Every PR gets a preview deploy.

## Run it locally

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build (also runs lint)
bun run start    # serve the production build
```

`yarn` works too, since both lockfiles are checked in. No environment variables are needed.

## Project layout

```
app/                  routes (App Router), layout, global styles, fonts
  api/geocode/        address → map pin via OpenStreetMap Nominatim (craft tool)
  api/unfurl/         follows allow-listed share links to a pin (craft tool)
content/
  blog/*.mdx          posts
  craft/*.mdx         lab entries
src/
  Data.js             work entries shown on the homepage
  site.js             name, email, nav links, socials
  components/         header, footer, ⌘K palette, hero artifact, reveals…
  lib/                MDX loaders (blog, craft) and location helpers
public/images/
  blog/               post covers and diagrams (hand-made SVG)
  extras/             travel photos (resized, metadata stripped)
  work/               screenshots for work entries
```

## Adding things

**A blog post:** create `content/blog/<slug>.mdx`:

```yaml
---
title: "Post title"
date: "YYYY-MM-DD"
description: "One or two sentences. Shown on the list and under the title."
cover: "/images/blog/<slug>.svg"    # optional, 1200×630
coverAlt: "What the cover shows"    # optional
---
```

Reading time is worked out automatically. For an image with a caption inside a post:

```mdx
<figure>
  <img src="/images/blog/diagram.svg" alt="…" width="1200" height="520" />
  <figcaption>Caption text.</figcaption>
</figure>
```

**A lab entry:** create `content/craft/<slug>.mdx` with `title`, `date`, `description` and `status` (`wip` | `shipped` | `exploring`). Optional fields: `tags`, `type`, `demoLink`, `sourceLink`, `cover`. Full interactive tools get their own route under `app/craft/<name>/`.

**A work entry:** add an object to `src/Data.js`. Leave out `link` if there's nothing to visit.

**A trip:** add to the `TRIPS` list in `app/extras/page.js`, and put photos in `public/images/extras/`. Keep them around 1600 px on the long edge and strip location data first.

## Notes for anyone reading the code

- **Fonts:** MonoLisa is a paid font licensed to me. If you borrow from this repo, replace the files in `public/fonts/` and `app/fonts.js` with your own font.
- **Content:** the writing, photos and artwork are mine. Please don't republish them. You're very welcome to learn from the code and how it's built.
- Repo-specific guidance for AI coding agents lives in [`CLAUDE.md`](./CLAUDE.md), and the running wishlist is in [`TODO.md`](./TODO.md).

## Contact

[ssaisreenivas@gmail.com](mailto:ssaisreenivas@gmail.com) · [X](https://x.com/sreeeeenivas) · [GitHub](https://github.com/Sreenivas1323) · [LinkedIn](https://www.linkedin.com/in/ssaisreenivas/)
