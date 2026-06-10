import Reveal from "../../src/components/Reveal";
import { SITE, SOCIALS } from "../../src/site";

export const metadata = {
  title: "About",
  description:
    "Mechatronics engineer turned Tech Lead. From building all-terrain vehicles to shipping AI-powered products — here's my story.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "Simplicity is the hardest problem",
    desc: "Anyone can make something complicated. The real craft is removing everything that doesn't serve the user.",
  },
  {
    title: "Engineers make the best designers",
    desc: "Understanding constraints doesn't limit creativity — it focuses it. I design what I can build, and build what I design.",
  },
  {
    title: "AI changes everything (and nothing)",
    desc: "The tools are new. The principles aren't. Users still want things that work, feel good, and respect their time.",
  },
  {
    title: "Build in public, learn faster",
    desc: "Sharing the process — the wins and the failures — accelerates learning and creates genuine connections.",
  },
];

const timeline = [
  {
    year: "2024",
    role: "Tech Lead",
    company: "Intripid",
    desc: "Leading frontend development for an AI-powered travel platform.",
    isCurrent: true,
  },
  {
    year: "2023",
    role: "Frontend Dev & Product Designer",
    company: "LeafCraft Studios",
    desc: "Designed and shipped financial wellness products from zero to launch.",
  },
  {
    year: "2022",
    role: "UI/UX & Brand Designer",
    company: "Datametrix",
    desc: "Built brand identity, marketing site, and data visualization platform.",
  },
  {
    year: "2021",
    role: "Team Lead — ATV Project",
    company: "FMAE-BAJA Competition",
    desc: "Led a 25-person team to design and fabricate an all-terrain vehicle. Yes, an actual vehicle.",
  },
];

const tools = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
  "Motion",
  "Node.js",
  "Python",
  "AI/LLM Integration",
  "Product Design",
  "Brand Design",
  "Design Systems",
];

const story = [
  "I'm Sreenivas — a mechatronics engineer from India who fell in love with interfaces. My engineering degree taught me systems thinking: how mechanical, electrical, and software components work together. Turns out, that's exactly how great products are built too.",
  "I led a team of 25 to build an all-terrain vehicle from scratch for the FMAE-BAJA competition. That experience — designing physical systems under real constraints, coordinating across disciplines, shipping something that actually works — shaped everything I do in software today. The vehicle had to survive rough terrain. Good software has to survive real users. Same energy.",
  "From there, I moved into product design and development. I've designed brand identities, built data visualization platforms, shipped financial wellness apps, and now I'm leading frontend at Intripid — where we're building the future of AI-powered travel. My work sits at the intersection of design and engineering, and I like it there.",
];

export default function About() {
  return (
    <div className="pt-12 md:pt-20">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[3px] text-ash">ABOUT</p>
        <h1 className="mt-6 max-w-[820px] font-mono text-[clamp(28px,4.6vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
          I started with{" "}
          <em className="bg-gradient-to-r from-pink to-blue bg-clip-text font-serif font-medium italic text-transparent">
            gears and motors
          </em>
          . Now I build with{" "}
          <em className="bg-gradient-to-r from-pink to-blue bg-clip-text font-serif font-medium italic text-transparent">
            pixels and code
          </em>
          .
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 max-w-[640px] space-y-6">
        {story.map((p) => (
          <p key={p.slice(0, 24)} className="text-[14px] leading-[1.9] text-dim">
            {p}
          </p>
        ))}
      </Reveal>

      <section data-x="beliefs" className="mt-20">
        <Reveal>
          <p className="mb-6 font-mono text-[10px] tracking-[3px] text-ash">
            WHAT I BELIEVE
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {beliefs.map(({ title, desc }) => (
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

      <section data-x="journey" className="mt-20">
        <Reveal>
          <p className="mb-8 font-mono text-[10px] tracking-[3px] text-ash">
            THE JOURNEY
          </p>
          <div>
            {timeline.map((item, index) => (
              <div
                key={item.year + item.company}
                className={`relative border-l border-line-mid pl-7 md:pl-9 ${
                  index < timeline.length - 1 ? "pb-10" : ""
                }`}
              >
                <span
                  className={`absolute -left-[2.5px] top-2 h-[5px] w-[5px] rounded-full ${
                    item.isCurrent ? "bg-ink" : "bg-white/40"
                  }`}
                />
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] font-bold text-ink">
                    {item.year}
                  </span>
                  {item.isCurrent && (
                    <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[8px] font-bold text-bg">
                      NOW
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-[14px] font-bold text-ink">
                  {item.role}
                </p>
                <p className="font-mono text-[11px] text-dim">{item.company}</p>
                <p className="mt-1.5 max-w-[480px] text-[12.5px] leading-relaxed text-dim">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section data-x="tools" className="mt-20">
        <Reveal>
          <p className="mb-6 font-mono text-[10px] tracking-[3px] text-ash">
            TOOLS &amp; TECHNOLOGIES
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-line px-4 py-2 font-mono text-[11px] text-ash transition-colors hover:border-line-bright hover:text-ink"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-20">
        <Reveal>
          <p className="mb-5 font-mono text-[10px] tracking-[3px] text-ash">
            LET&apos;S CONNECT
          </p>
          <p className="max-w-[560px] text-[14px] leading-[1.9] text-dim">
            I&apos;m always open to conversations about product engineering,
            design systems, AI, or just nerding out about mechanical keyboards
            and motorsport. Drop me a line or find me on social.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-ash transition-colors hover:text-ink"
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-8 inline-block rounded-lg bg-ink px-5 py-2.5 font-mono text-[12px] font-bold text-bg transition-transform hover:-translate-y-0.5"
          >
            Get in touch →
          </a>
        </Reveal>
      </section>
    </div>
  );
}
