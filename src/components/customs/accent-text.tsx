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
      {children}
      <svg
        viewBox="0 0 200 18"
        preserveAspectRatio="none"
        className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-[0.35em]"
        aria-hidden="true"
      >
        <motion.path
          d="M2 10 C 30 2, 50 16, 80 9 S 130 1, 160 10 S 190 15, 198 8"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>
    </span>
  );
}
