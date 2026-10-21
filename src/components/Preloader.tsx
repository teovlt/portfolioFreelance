import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAME = "Téo Villet";
const BLOCKED_KEYS = new Set([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Fully lock scrolling while the preloader is up, instead of only toggling
  // body overflow — on some browsers (notably touch devices) that alone
  // doesn't stop the user from scrolling the page behind it before reveal.
  useLayoutEffect(() => {
    if (done) return;

    const html = document.documentElement;
    const { body } = document;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const preventScroll = (e: Event) => e.preventDefault();
    const preventScrollKeys = (e: KeyboardEvent) => {
      if (BLOCKED_KEYS.has(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, [done]);

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
        >
          <div className="absolute w-[32rem] h-[32rem] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="absolute w-[20rem] h-[20rem] rounded-full bg-primary/10 blur-3xl translate-x-24 translate-y-16" aria-hidden="true" />

          <div className="relative flex flex-col items-center gap-7">
            <div className="flex">
              {NAME.split("").map((char, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.25 + i * 0.035, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-bold text-3xl sm:text-5xl tracking-tight inline-block"
                  >
                    {char === " " ? " " : char}
                  </motion.span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-36 sm:w-44 h-[3px] rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              <span className="font-sans text-xs tabular-nums text-muted-foreground w-8">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
