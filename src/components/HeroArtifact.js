"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const STAGES = [
  { id: "sketch", label: "design", file: "tia-chat.fig" },
  { id: "code", label: "build", file: "Chat.tsx" },
  { id: "ship", label: "ship", file: "tia.app" },
];

const STAGE_MS = 4200;

const TOKEN_COLORS = {
  k: "text-pink",
  f: "text-[#8aa2ff]",
  a: "text-amber",
  d: "text-dim",
  p: "text-ash",
};

const CODE_LINES = [
  [{ t: "export function ", c: "k" }, { t: "Chat", c: "f" }, { t: "() {", c: "p" }],
  [
    { t: "  const ", c: "k" },
    { t: "[messages, send]", c: "d" },
    { t: " = ", c: "p" },
    { t: "useChat", c: "f" },
    { t: "();", c: "p" },
  ],
  [{ t: "  return ", c: "k" }, { t: "(", c: "p" }],
  [{ t: "    <", c: "p" }, { t: "Thread", c: "f" }, { t: ">", c: "p" }],
  [{ t: "      {messages.map((m) => (", c: "d" }],
  [
    { t: "        <", c: "p" },
    { t: "Bubble", c: "f" },
    { t: " role", c: "a" },
    { t: "={m.role}>", c: "p" },
  ],
  [{ t: "          {m.text}", c: "d" }],
  [{ t: "        </", c: "p" }, { t: "Bubble", c: "f" }, { t: ">", c: "p" }],
  [{ t: "      ))}", c: "d" }],
  [
    { t: "      <", c: "p" },
    { t: "Composer", c: "f" },
    { t: " onSend", c: "a" },
    { t: "={send} />", c: "p" },
  ],
  [{ t: "    </", c: "p" }, { t: "Thread", c: "f" }, { t: ">", c: "p" }],
  [{ t: "  );", c: "p" }],
  [{ t: "}", c: "p" }],
];

const stageVariants = {
  enter: { opacity: 0, y: 10, scale: 0.99 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.99 },
};

const Annotation = ({ children, className }) => (
  <span
    className={`pointer-events-none absolute font-mono text-[9px] tracking-wide text-blueprint/80 ${className}`}
  >
    {children}
  </span>
);

const SkeletonLine = ({ w }) => (
  <span
    className="block h-[5px] rounded-full bg-white/10"
    style={{ width: w }}
  />
);

function SketchStage() {
  return (
    <div className="flex h-full flex-col gap-4 p-5 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="relative flex w-3/4 flex-col gap-2 rounded-lg border border-dashed border-white/25 p-3">
        <Annotation className="-top-2 left-3 bg-[#101010] px-1">
          assistant · streamed
        </Annotation>
        <SkeletonLine w="70%" />
        <SkeletonLine w="45%" />
      </div>

      <div className="relative ml-auto flex w-1/2 flex-col gap-2 rounded-lg border border-dashed border-white/25 p-3">
        <Annotation className="-top-2 right-3 bg-[#101010] px-1">user</Annotation>
        <SkeletonLine w="80%" />
      </div>

      <div className="relative flex w-2/3 flex-col gap-2 rounded-lg border border-dashed border-white/25 p-3">
        <SkeletonLine w="60%" />
        <SkeletonLine w="75%" />
        <SkeletonLine w="30%" />
      </div>

      <div className="relative mt-auto flex items-center gap-3">
        <div className="h-10 flex-1 rounded-full border border-dashed border-white/25" />
        <div className="h-10 w-10 rounded-full border border-dashed border-white/25" />
        <Annotation className="-top-4 right-0">composer + send</Annotation>
      </div>
    </div>
  );
}

function CodeStage() {
  return (
    <div className="h-full overflow-hidden p-5">
      <pre className="font-mono text-[10.5px] leading-[1.75]">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.25 }}
            className="flex"
          >
            <span className="mr-4 w-4 select-none text-right text-white/20">
              {i + 1}
            </span>
            <span>
              {line.map((tok, j) => (
                <span key={j} className={TOKEN_COLORS[tok.c]}>
                  {tok.t}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

const Msg = ({ delay, children, user }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={
      user
        ? "ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[11px] leading-relaxed text-bg"
        : "max-w-[75%] rounded-2xl rounded-bl-md border border-line bg-white/[0.04] px-3.5 py-2.5 text-[11px] leading-relaxed text-ink"
    }
  >
    {children}
  </motion.div>
);

function ShipStage() {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="h-7 w-7 rounded-full border border-line-mid bg-white/10" />
        <div>
          <p className="font-mono text-[11px] font-bold text-ink">Tia</p>
          <p className="flex items-center gap-1.5 text-[9px] text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            planning your trip
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <Msg delay={0.2}>Where to next? ✈</Msg>
        <Msg delay={0.7} user>
          5 days in Tokyo, mid-March
        </Msg>
        <Msg delay={1.3}>
          Cherry blossoms peak that week — building your itinerary…
        </Msg>
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <div className="flex h-10 flex-1 items-center rounded-full border border-line-mid bg-white/[0.03] px-4 text-[10px] text-ash">
          Ask Tia anything…
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.3 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[13px] text-bg"
        >
          ↑
        </motion.div>
      </div>
    </div>
  );
}

const STAGE_CONTENT = {
  sketch: SketchStage,
  code: CodeStage,
  ship: ShipStage,
};

export default function HeroArtifact() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(reduceMotion ? 2 : 0);
  const [paused, setPaused] = useState(false);

  const stage = STAGES[index];
  const Content = STAGE_CONTENT[stage.id];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % STAGES.length);
  }, []);

  return (
    <div
      data-x="hero-artifact"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-3 flex gap-1.5">
        {STAGES.map(({ id, label }, i) => (
          <button
            key={id}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative flex-1 pb-2 text-left font-mono text-[10px] tracking-[1.5px] uppercase transition-colors ${
              i === index ? "text-ink" : "text-ash hover:text-dim"
            }`}
          >
            <span className="mr-1.5 text-[9px] text-ash">0{i + 1}</span>
            {label}
            <span className="absolute bottom-0 left-0 h-px w-full bg-line" />
            {i === index && !reduceMotion && (
              <span
                key={`${id}-progress`}
                onAnimationEnd={next}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-ink"
                style={{
                  animation: `heroProgress ${STAGE_MS}ms linear`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
            {i === index && reduceMotion && (
              <span className="absolute bottom-0 left-0 h-px w-full bg-ink" />
            )}
          </button>
        ))}
      </div>

      <div className="relative h-[340px] overflow-hidden rounded-2xl border border-line bg-[#101010]">
        <div className="flex h-9 items-center gap-2 border-b border-line px-4">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <AnimatePresence mode="wait">
            <motion.span
              key={stage.file}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-2 font-mono text-[9px] tracking-wide text-ash"
            >
              {stage.file}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="h-[calc(100%-2.25rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              variants={stageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full"
            >
              <Content />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-wide text-ash">
        One interface, three altitudes. The whole loop is the job.
      </p>
    </div>
  );
}
