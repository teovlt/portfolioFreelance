import { useEffect, useState, type FocusEvent } from "react";
import { useReducedMotion } from "framer-motion";

// Auto-advance for the carousels, following WCAG's "pause, stop, hide":
// it holds while the pointer or keyboard focus is inside, the visitor can
// pause it for good, and it starts paused for reduced-motion users.
export const useAutoplay = (advance: () => void, delay: number, enabled: boolean) => {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState<boolean | null>(null);
  const [held, setHeld] = useState(false);

  // Until the visitor chooses, follow their motion preference
  const isPaused = paused ?? !!prefersReducedMotion;
  const isPlaying = enabled && !isPaused && !held;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(advance, delay);
    return () => clearInterval(interval);
  }, [isPlaying, advance, delay]);

  return {
    isPaused,
    // Announcing every automatic change would be noise; manual ones are read
    liveMode: isPlaying ? ("off" as const) : ("polite" as const),
    togglePause: () => setPaused(!isPaused),
    holdProps: {
      onMouseEnter: () => setHeld(true),
      onMouseLeave: () => setHeld(false),
      onFocus: () => setHeld(true),
      onBlur: (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
      },
    },
  };
};
