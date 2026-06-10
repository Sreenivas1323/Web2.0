"use client";

import { motion, useReducedMotion } from "motion/react";

export default function RevealLine({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={`-mb-[0.12em] block overflow-hidden pb-[0.12em] ${className}`}>
      <motion.span
        className="block"
        initial={reduceMotion ? false : { y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
