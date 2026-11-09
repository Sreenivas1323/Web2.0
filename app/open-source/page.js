import Link from "next/link";

import Reveal from "../../src/components/Reveal";

export const metadata = {
  title: "Open Source",
  description:
    "What I'm giving back: free, open-source tools, a free Git course for beginners, and the source of this very site.",
  alternates: { canonical: "/open-source" },
};

const STATUS_COLOR = {
  active: "bg-green",
  alpha: "bg-amber",
  live: "bg-green",
  soon: "bg-[#94a3b8]",
};

const PROJECTS = [
  {
    name: "Bantu",
    telugu: "బంటు",
    status: "alpha",
    statusLabel: "v0.1.0-alpha.3",
    license: "Apache-2.0",
    stack: "Rust · React · Tauri",
    blurb:
      "Run a team of coding agents in parallel, each in its own git worktree — on your laptop or your own cloud. Chat, diffs, review, PRs, checkpoints, terminals. Bring your own Claude or Codex subscription. No seat fees, no lock-in.",
    why: "The best agent workflows were behind paid apps. They shouldn't be.",
    links: [
      { label: "GitHub", href: "https://github.com/Sreenivas1323/bantu" },
      { label: "Site", href: "https://sreenivas1323.github.io/bantu/" },
    ],
  },
  {
    name: "Bujji",
    status: "active",
    statusLabel: "active",
    license: "MIT",
    stack: "Bun · TypeScript · CLI",
    blurb:
      "Your social space in one daily brief. Reads your messages, Bluesky, YouTube, Reddit and RSS, and writes one morning summary with content ideas — so you create instead of scroll.",
    why: "Doomscrolling is a design problem. This is my fix.",
    links: [{ label: "GitHub", href: "https://github.com/Sreenivas1323/bujji" }],
  },
  {
    name: "Claude Switcher",
    status: "active",
    statusLabel: "v0.1.0",
    license: "MIT",
    stack: "Swift · SwiftUI · macOS",
    blurb:
      "A menu bar app that shows usage across several Claude subscriptions and switches Claude Code between accounts in one click.",
    why: "Built it for myself on a Saturday. Someone else will need it too.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sreenivas1323/claude-switcher",
      },
    ],
  },
  {
    name: "Git for Complete Beginners",
    status: "live",
    statusLabel: "free course",
    license: "MIT",
    stack: "3 days · one PR each",
    blurb:
      "A free, hands-on Git course for people who have never opened a terminal. Windows-first, with an in-browser Git simulator, and every student ships a real pull request by day three.",
    why: "Git is the front door to open source. Most people never get shown where the key is.",
    links: [
      { label: "Course", href: "https://courses.ssaisreenivas.in" },
      {
        label: "Class repo",
        href: "https://github.com/Sreenivas1323/git-course-team",
      },
    ],
  },
  {
    name: "This website",
    status: "live",
    statusLabel: "live",
    license: "Public repo",
    stack: "Next.js · Tailwind v4 · MDX",
    blurb:
      "Every page, the ⌘K palette, the x-ray mode. Read it, learn from it, see how the pieces fit.",
    why: "I learned web dev by reading other people's sites. Paying it forward.",
    links: [
      { label: "GitHub", href: "https://github.com/Sreenivas1323/Web2.0" },
    ],
  },
];

const PRINCIPLES = [
  {
    title: "Free means free",
    desc: "No freemium trap, no 'contact sales'. If I open-source it, you can run all of it yourself.",
  },
  {
    title: "Bring your own everything",
    desc: "Your keys, your cloud, your data. My tools should never be the reason you're locked in.",
  },
  {
    title: "Write it down",
    desc: "A tool without docs is a puzzle. Every repo gets a README a beginner can follow.",
  },
  {
    title: "Teach the door, not the room",
    desc: "The course matters as much as the code. More people who can send a PR means more open source for everyone.",
  },
];

const Label = ({ children }) => (
  <p className="font-mono text-[11px] tracking-wide text-ash">
    <span className="select-none text-ash/60">{"// "}</span>
    {children}
  </p>
);

const ExternalOrInternal = ({ href, children, className }) =>
  href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );

export default function OpenSource() {
  return (
    <div className="pt-12 md:pt-20">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[3px] text-ash">
          OPEN SOURCE
        </p>
        <h1 className="mt-5 max-w-[820px] font-mono text-[clamp(28px,4.6vw,48px)] font-bold leading-tight tracking-[-0.02em] text-ink">
          What I&apos;m giving back
        </h1>
        <div className="mt-6 max-w-[620px] space-y-4 text-[14px] leading-[1.9] text-dim">
          <p>
            Almost everything I know, I learned from things people gave away:
            open-source code, free tutorials, forum answers from strangers at
            2 a.m. This page is my side of that deal.
          </p>
          <p>
            Some of it is tools I built because I needed them. Some of it is
            teaching. All of it is free, and all of it is yours to fork.
          </p>
        </div>
      </Reveal>

      <section data-x="oss-projects" className="mt-20">
        <Reveal>
          <Label>projects</Label>
          <h2 className="mt-4 mb-10 font-mono text-[clamp(19px,2.2vw,23px)] font-bold tracking-[-0.3px] text-ink">
            Things you can use today
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-xl border border-line p-6 transition-colors hover:border-line-mid"
              >
                <div className="flex items-center justify-between gap-3 font-mono text-[9.5px] tracking-wide text-dim">
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        STATUS_COLOR[p.status] || "bg-ash"
                      }`}
                    />
                    {p.statusLabel}
                  </span>
                  <span className="text-ash">{p.license}</span>
                </div>

                <h3 className="mt-4 flex items-baseline gap-2 font-mono text-[16px] font-bold text-ink">
                  {p.name}
                  {p.telugu && (
                    <span className="font-sans text-[13px] font-normal text-ash">
                      {p.telugu}
                    </span>
                  )}
                </h3>
                <p className="mt-1 font-mono text-[10.5px] text-ash">
                  {p.stack}
                </p>

                <p className="mt-4 text-[13px] leading-relaxed text-dim">
                  {p.blurb}
                </p>
                <p className="mt-3 text-[12.5px] italic leading-relaxed text-ash">
                  {p.why}
                </p>

                <div className="mt-auto flex flex-wrap gap-4 pt-6">
                  {p.links.map(({ label, href }) => (
                    <ExternalOrInternal
                      key={href}
                      href={href}
                      className="font-mono text-[11px] text-dim underline decoration-line-bright underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                    >
                      {label} {href.startsWith("/") ? "→" : "↗"}
                    </ExternalOrInternal>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section data-x="oss-principles" className="mt-24">
        <Reveal>
          <Label>how I do it</Label>
          <h2 className="mt-4 mb-10 font-mono text-[clamp(19px,2.2vw,23px)] font-bold tracking-[-0.3px] text-ink">
            For the greater good, with rules
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {PRINCIPLES.map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-line p-6 transition-colors hover:border-line-mid"
              >
                <h3 className="font-mono text-[13.5px] font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-[12.5px] leading-relaxed text-dim">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-24">
        <Reveal>
          <div className="rounded-xl border border-line p-6 md:p-8">
            <Label>want in?</Label>
            <p className="mt-4 max-w-[600px] text-[14px] leading-[1.9] text-dim">
              Issues, PRs, and &ldquo;this broke on my machine&rdquo; are all
              welcome. If you&apos;re new to open source, start with the Git
              course, then pick any open issue on the repos above. I review every PR
              myself.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/Sreenivas1323"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-ink px-5 py-2.5 font-mono text-[12px] font-bold text-bg"
              >
                GitHub profile ↗
              </a>
              <Link
                href="/blog/two-best-things-pirates-and-open-source"
                className="inline-block rounded-lg border border-line-mid px-5 py-2.5 font-mono text-[12px] text-dim transition-colors hover:border-line-bright hover:text-ink"
              >
                Why I care about this →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
