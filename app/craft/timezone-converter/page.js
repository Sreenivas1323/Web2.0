import Link from "next/link";

import Reveal from "../../../src/components/Reveal";
import TimezoneConverter from "../../../src/components/TimezoneConverter";

export const metadata = {
  title: "Timezone Converter — Craft",
  description:
    "Paste a UTC ISO 8601 timestamp, pick a timezone, and see the local date and time.",
  alternates: { canonical: "/craft/timezone-converter" },
};

export default function TimezoneConverterPage() {
  return (
    <div className="max-w-[720px] pb-10 pt-12 md:pt-16">
      <Link
        href="/craft"
        className="font-mono text-[10px] tracking-[2px] text-ash transition-colors hover:text-ink"
      >
        ← BACK TO THE LAB
      </Link>

      <Reveal>
        <p className="mt-6 flex items-center gap-2 font-mono text-[10px] text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          Shipped
        </p>
        <h1 className="mt-3 font-mono text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[30px]">
          Timezone Converter
        </h1>
        <p className="mt-3 text-[13.5px] leading-[1.8] text-dim">
          Paste a UTC ISO 8601 timestamp like{" "}
          <span className="font-mono text-ink">
            2026-11-30T06:00:00.000Z
          </span>
          , pick a timezone, and see what it reads as there.
        </p>
      </Reveal>

      <div className="my-8 h-px bg-line" />

      <Reveal delay={0.1}>
        <TimezoneConverter />
      </Reveal>
    </div>
  );
}
