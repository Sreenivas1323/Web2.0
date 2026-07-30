"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_LINKS } from "../site";
import { openPalette } from "./CommandPalette";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      data-x="header"
      className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-4">
        <Link
          href="/"
          className="font-mono text-[13px] font-bold tracking-tight text-ink"
        >
          sreenivas<span className="text-ash">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono text-[11px] tracking-wide transition-colors ${
                  active ? "text-ink" : "text-ash hover:text-ink"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={openPalette}
          aria-label="Open command palette"
          className="flex items-center gap-2 rounded-md border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-wide text-dim transition-colors hover:border-line-bright hover:text-ink"
        >
          <span className="hidden sm:inline">Menu</span>
          <kbd className="text-[10px]">⌘K</kbd>
        </button>
      </div>
    </header>
  );
}
