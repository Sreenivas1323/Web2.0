import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center pt-12">
      <p className="font-mono text-[10px] tracking-[3px] text-ash">
        ERROR 404 · PAGE NOT FOUND
      </p>
      <h1 className="mt-5 max-w-[560px] font-mono text-[26px] font-bold leading-[1.3] tracking-tight text-ink md:text-[32px]">
        This page didn&apos;t survive{" "}
        <span className="bg-gradient-to-r from-pink to-blue bg-clip-text text-transparent">
          user testing
        </span>
        .
      </h1>
      <p className="mt-4 max-w-[440px] text-[13.5px] leading-relaxed text-dim">
        Either it never shipped, or it got refactored out of existence. Both
        happen more often than anyone admits.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-ink px-5 py-2.5 font-mono text-[12px] font-bold text-bg transition-transform hover:-translate-y-0.5"
      >
        ← Back to the homepage
      </Link>
    </div>
  );
}
