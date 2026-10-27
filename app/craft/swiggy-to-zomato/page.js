import Link from "next/link";

import Reveal from "../../../src/components/Reveal";
import LocationBridge from "../../../src/components/LocationBridge";

export const metadata = {
  title: "Swiggy → Zomato Location — Craft",
  description:
    "Paste a Swiggy share-location link and get the same pin, ready to drop into Zomato.",
  alternates: { canonical: "/craft/swiggy-to-zomato" },
};

export default function SwiggyToZomatoPage() {
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
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          Work in progress
        </p>
        <h1 className="mt-3 font-mono text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[30px]">
          Swiggy → Zomato Location
        </h1>
        <p className="mt-3 text-[13.5px] leading-[1.8] text-dim">
          Someone sent you their spot on Swiggy, but you&apos;re ordering on
          Zomato. Paste the share here: short links get followed, the pin gets
          pulled out, and you get it back in a shape Zomato&apos;s address
          search takes.
        </p>
      </Reveal>

      <div className="my-8 h-px bg-line" />

      <Reveal delay={0.1}>
        <LocationBridge />
      </Reveal>
    </div>
  );
}
