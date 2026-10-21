"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AccentProps {
  children: ReactNode;
  className?: string;
}

export function Accent({ children, className = "" }: AccentProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        aria-hidden="true"
        className="absolute -z-10 rounded-[0.15em]"
        style={{
          left: "-0.12em",
          right: "-0.12em",
          top: "0.1em",
          bottom: "0.02em",
          backgroundColor: "hsl(var(--accent) / 0.55)",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
