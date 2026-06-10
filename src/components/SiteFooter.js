import { SITE, SOCIALS } from "../site";

export default function SiteFooter() {
  return (
    <footer data-x="footer" className="mt-24 border-t border-line">
      <div className="mx-auto max-w-[1080px] px-4 py-16">
        <p className="font-mono text-[10px] tracking-[2px] text-ash">
          NEXT PROJECT
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="group mt-4 inline-block font-mono text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[34px]"
        >
          Let&apos;s build something{" "}
          <span className="bg-gradient-to-r from-pink to-blue bg-clip-text text-transparent">
            end-to-end
          </span>
          <span className="ml-3 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>

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
