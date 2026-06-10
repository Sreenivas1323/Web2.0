import Magnetic from "./Magnetic";
import { SITE, SOCIALS } from "../site";

export default function SiteFooter() {
  return (
    <footer data-x="footer" className="mt-24 border-t border-line">
      <div className="mx-auto max-w-[1080px] px-4 py-20">
        <p className="font-mono text-[10px] tracking-[2px] text-ash">
          NEXT PROJECT
        </p>
        <Magnetic strength={0.12}>
          <a
            href={`mailto:${SITE.email}`}
            className="group mt-5 inline-block font-mono text-[clamp(28px,4.6vw,54px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink"
          >
            Let&apos;s build something{" "}
            <em className="bg-gradient-to-r from-pink to-blue bg-clip-text font-serif font-medium italic text-transparent">
              end-to-end
            </em>
            <span className="ml-3 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </Magnetic>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
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
          <p className="font-mono text-[10px] tracking-wide text-ash">
            {SITE.location} · press{" "}
            <kbd className="rounded border border-line px-1.5 py-0.5 text-dim">
              ⌘K
            </kbd>{" "}
            anywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
