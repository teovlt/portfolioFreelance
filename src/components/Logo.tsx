import { cn } from "@/lib/utils";

/**
 * Téo's mark: a T whose crossbar leans like the acute accent of the "é".
 * Drawn in currentColor so it follows the theme (and the trade-page palettes).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", className)}>
      <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
        <path d="M31 21 V52" />
        <path d="M13 26 L51 12" className="logo-accent" />
      </g>
    </svg>
  );
}
