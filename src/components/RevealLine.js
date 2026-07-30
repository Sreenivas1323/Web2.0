"use client";

import { motion, useReducedMotion } from "motion/react";

export default function RevealLine({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();

  // The inner span is fully clipped by the wrapper while hidden, so the
  // in-view trigger must live on the wrapper — an observer on the inner
  // span would never fire.
  return (
    <motion.span
      className={`-mb-[0.12em] block overflow-hidden pb-[0.12em] ${className}`}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
