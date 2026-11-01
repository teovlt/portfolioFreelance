import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Code2, Database, Globe, Palette, Rocket, Smartphone, Sparkles, Zap, type LucideIcon } from "lucide-react";

const NAME = "Téo Villet";
const DURATION = 1700;

// What I build, orbiting the name
const ORBIT: LucideIcon[] = [Code2, Palette, Smartphone, Rocket, Database, Globe, Zap, Sparkles];
const ORBIT_SPEED = 22;

// Little accent shapes drifting up in the background: [left %, top %, size px, shape, delay s]
const FLOATERS = [
  [12, 72, 10, "diamond", 0],
  [22, 28, 6, "dot", 0.6],
  [78, 22, 8, "diamond", 0.3],
  [86, 64, 12, "ring", 0.9],
  [64, 86, 6, "dot", 0.2],
  [34, 88, 9, "ring", 1.1],
  [8, 44, 7, "dot", 0.8],
  [92, 38, 6, "diamond", 0.5],
] as const;

const floaterShape = {
  diamond: "rounded-[2px] rotate-45 bg-accent",
  dot: "rounded-full bg-accent/70",
  ring: "rounded-full border-2 border-accent/60",
};

const STATUS = {
  fr: ["Compilation des idées…", "Assemblage des pixels…", "Mise en ligne…"],
  en: ["Compiling ideas…", "Assembling pixels…", "Going live…"],
};
const BLOCKED_KEYS = new Set([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();
  const { i18n } = useTranslation();
  const status = STATUS[i18n.language === "en" ? "en" : "fr"];
  const step = progress < 40 ? 0 : progress < 80 ? 1 : 2;

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
    const duration = DURATION;
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
          <motion.div
            className="absolute w-[32rem] h-[32rem] rounded-full bg-accent/20 blur-3xl"
            animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], x: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute w-[20rem] h-[20rem] rounded-full bg-primary/10 blur-3xl translate-x-24 translate-y-16"
            animate={reduceMotion ? undefined : { scale: [1, 0.85, 1], y: [0, -24, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {FLOATERS.map(([left, top, size, shape, delay], i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={`absolute ${floaterShape[shape]}`}
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
              initial={{ opacity: 0, y: 0 }}
              animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0, 0.8, 0], y: -60 }}
              transition={{ duration: 2.6, delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

          {/* Orbit: the ring turns, each badge counter-turns to stay upright */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 [--r:140px] sm:[--r:215px]"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: ORBIT_SPEED, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-0 top-0 w-[calc(var(--r)*2)] h-[calc(var(--r)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border" />
            {ORBIT.map((Icon, i) => {
              const angle = (360 / ORBIT.length) * i;
              return (
                <div
                  key={i}
                  className="absolute left-0 top-0"
                  style={{ transform: `rotate(${angle}deg) translateY(calc(var(--r) * -1)) rotate(${-angle}deg)` }}
                >
                  <motion.div
                    animate={reduceMotion ? undefined : { rotate: -360 }}
                    transition={{ duration: ORBIT_SPEED, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -5, 0] }}
                      transition={{
                        opacity: { delay: 0.15 + i * 0.07, duration: 0.3 },
                        scale: { delay: 0.15 + i * 0.07, type: "spring", stiffness: 300, damping: 15 },
                        y: { delay: i * 0.2, duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className={`-translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center shadow-sm ${
                        i % 3 === 0 ? "bg-accent border-accent text-accent-foreground" : "bg-card border-border text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          <div className="relative flex flex-col items-center gap-5">
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

            <div className="h-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-sans text-xs text-muted-foreground"
                >
                  {status[step]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
