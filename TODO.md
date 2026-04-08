# Site TODO

Things mentioned in conversation but not yet built — to focus on day-to-day.

## Content I need from you

- [ ] **Tia images** — currently using `/images/Intripid.png` as placeholder.
      Need real Tia screenshots for the home page work card.
- [ ] **Real Tia link** — `dev.intripid.co` is the placeholder. Update once
      there's a public landing page.
- [ ] **Real `/now` data** — the placeholders in `pages/now.js` (`NOW_DATA`)
      need to be replaced with actual current state. Update monthly.
- [ ] **More `/craft` entries** — only one sample exists
      (`content/craft/openclaw-shell-agent.mdx`). The whole point of /craft
      is the rolling feed of AI experiments / weekend builds.
      Pattern to follow: short title, 1-paragraph description, status dot,
      tags, optional demo + source links.

## Features to build later

- [ ] **Subdomain previous versions** — `2022.ssaisreenivas.in`,
      `2023.ssaisreenivas.in`, etc. Each hosts a frozen snapshot of the
      site at that time. Rauno does this and it's a great signal of
      "I've been at this for years."
- [ ] **Photo gallery / photographer side** — Rauno-inspired horizontal
      gallery showcasing the photography side. Probably lives at `/photos`
      or as a section on `/craft`. Decide later.
- [ ] **Brian Lovin-style detailed project showcase** — case study pages
      for major work entries (Tia, Intripid, LeafCraft, Datametrix).
      Each gets its own URL with full writeup, screenshots, role,
      challenges, outcome. Lives at `/work/[slug]` probably.
- [ ] **`/stack` or `/uses` page** — hardware, editor, fonts, terminal
      setup, productivity tools. Very builder-coded.

## Craft / polish details

- [ ] **View Transitions API** — smooth page-to-page fades like leerob.io.
- [ ] **⌘K command palette** — keyboard navigation. `g h` → home, `g c` →
      craft, `g w` → writing, etc.
- [ ] **RSS feed** for `/blog` and `/craft`. Add `<link rel="alternate">`
      to head. Visible "Subscribe via RSS" link in footer.
- [ ] **"Last shipped" timestamp** in the header status chip — auto-pulled
      from latest commit or latest /craft entry.
- [ ] **Reading time** on blog and craft posts.

## Craft frontmatter schema (for reference)

```yaml
---
title: "..."                    # required
date: "YYYY-MM-DD"              # required
description: "..."              # required, 1 sentence
tags: ["AI", "Tools"]           # optional
status: "wip" | "shipped" | "exploring"  # required
type: "experiment" | "tool" | "demo" | "thought"  # optional
demoLink: "https://..."         # optional
sourceLink: "https://github..." # optional
cover: "/images/craft/..."      # optional
---
```
