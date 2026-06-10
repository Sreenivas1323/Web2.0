# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build production version
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Architecture Overview

This is a Next.js (App Router) portfolio website styled with Tailwind CSS v4 and animated with Motion (framer-motion). React 19.

### Design direction
"A calm site that does loud things" — restrained dark surface, every element quietly interactive, spectacle quarantined behind the command palette. Audience priority: founders/clients first, then hiring managers and design engineer peers.

### Theme & Styling
- Tailwind v4 with CSS-first config: design tokens live in `@theme` inside `app/globals.css` (colors: bg #0b0b0b, ink, dim, ash, line scales, pink #FC466B, blue #3F5EFB)
- Fonts via `next/font` in `app/fonts.js`: MonoLisa (local, headings/UI chrome, `font-mono`) + Inter (body prose, `font-sans`)
- Dark-only. Reduced-motion is fully supported via a global media query
- Long-form MDX content styled by the `.article` class in `app/globals.css` (no MDX component mapping)

### Signature interactions
- `src/components/HeroArtifact.js` — homepage hero: one card morphing through sketch → code → ship stages (auto-advances, pauses on hover, reduced-motion shows ship statically)
- `src/components/CommandPalette.js` — ⌘K palette (cmdk): navigation, copy email, socials, and X-ray mode
- X-ray mode: sets `data-xray` on `<html>`; CSS in `globals.css` decomposes the site into a blueprint. Elements with `data-x="label"` attributes get annotated tags in X-ray view

### Content & Data
- Project/portfolio data centralized in `src/Data.js`
- Blog posts in `content/blog/*.mdx`, craft entries in `content/craft/*.mdx` (gray-matter frontmatter, read by `src/lib/blog.js` / `src/lib/craft.js`, rendered with `next-mdx-remote/rsc`)
- Site constants (email, socials, nav links) in `src/site.js`
- Image assets in `public/images/`

### Pages Structure
- App Router under `app/`: home, `/about`, `/now`, `/blog`, `/blog/[slug]`, `/craft`, `/craft/[slug]`, custom `not-found`
- Layout (`app/layout.js`) owns metadata defaults, JSON-LD person schema, header/footer/palette
- All routes are statically generated (`generateStaticParams` for slugs)

### SEO & Performance
- Metadata API with Open Graph and Twitter Card support; per-page `metadata` exports and `generateMetadata` for slugs
- Sitemap.xml and robots.txt in `public/`
- Security headers and performance optimizations in next.config.js
- Keep the founder path fast: no heavy JS above the fold; spectacle must be lazy/opt-in

## Roadmap (agreed direction)
1. ~~Milestone 1: foundation + homepage (hero artifact, palette, X-ray)~~ ✅
2. Craft lab: live embedded demos in the `/craft` grid (rauno.me/craft style) with view-source toggles
3. Flagship scrollytelling case study for Tia (animated UI states, decision callouts)
4. Voice pass: microcopy, about-page storytelling, easter eggs
