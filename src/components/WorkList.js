"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

export default function WorkList({ items }) {
  const [active, setActive] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 25, mass: 0.5 });

  const preview = active?.images?.[0];

  return (
    <div
      className="border-b border-line"
      onMouseMove={(e) => {
        x.set(e.clientX + 28);
        y.set(e.clientY - 80);
      }}
      onMouseLeave={() => setActive(null)}
    >
      {items.map((item, index) => {
        const { Name, web, link, desc, tags } = item;
        const Wrapper = link ? "a" : "div";
        const wrapperProps = link
          ? { href: link, target: "_blank", rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={Name}
            {...wrapperProps}
            onMouseEnter={() => setActive(item)}
            className="group grid grid-cols-[2.5rem_1fr] items-start gap-4 border-t border-line py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-[2.5rem_1fr_auto] md:gap-8"
          >
            <span className="pt-1 font-mono text-[11px] text-ash">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-mono text-[16px] font-bold text-ink decoration-line-bright underline-offset-4 group-hover:underline">
                  {Name}
                </h3>
                {web && (
                  <span className="font-mono text-[10px] text-ash">{web}</span>
                )}
              </div>
              <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-dim">
                {desc[0].data}
              </p>
              {tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tags.slice(0, 3).map(({ name }) => (
                    <span
                      key={name}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] tracking-wide text-ash"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {link && (
              <span className="hidden self-center text-[14px] text-ash transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink md:block">
                ↗
              </span>
            )}
          </Wrapper>
        );
      })}

      {/* Floating preview that chases the cursor (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {preview && (
            <motion.div
              key={preview.src}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Image
                src={preview.src}
                alt=""
                width={240}
                height={160}
                className="h-[160px] w-[240px] rounded-xl border border-line-mid object-cover shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
