import { useCallback, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useAutoplay } from "@/hooks/useAutoplay";
import { cn } from "@/lib/utils";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%", opacity: 0 }),
};

// The case study's screenshots in a browser frame: a plain image when there's
// one, a swipeable carousel with thumbnails when there are several
export const ProjectGallery = ({ images, title }: { images: string[]; title: string }) => {
  const { t } = useTranslation();
  const [[page, direction], setPage] = useState([0, 0]);
  const count = images.length;
  const index = count ? ((page % count) + count) % count : 0;
  const hasSeveral = count > 1;

  const paginate = useCallback((offset: number) => setPage(([prev]) => [prev + offset, offset]), []);
  const advance = useCallback(() => paginate(1), [paginate]);
  const goTo = (target: number) => {
    if (target !== index) setPage(([prev]) => [prev + target - index, target > index ? 1 : -1]);
  };
  const { isPaused, liveMode, togglePause, holdProps } = useAutoplay(advance, 5000, hasSeveral);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") paginate(-1);
    if (e.key === "ArrowRight") paginate(1);
  };

  const frame = (
    <div className="h-9 bg-muted flex items-center gap-1.5 px-4 border-b border-border">
      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
      {hasSeveral && (
        <span className="ml-auto text-xs font-semibold tabular-nums text-muted-foreground">
          {index + 1} / {count}
        </span>
      )}
    </div>
  );

  if (!hasSeveral) {
    return (
      <div className="rounded-2xl overflow-hidden border border-border shadow-sm mb-16">
        {frame}
        <img src={images[0]} alt={title} className="w-full object-cover max-h-[560px]" />
      </div>
    );
  }

  const navButton =
    "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/85 backdrop-blur-sm text-foreground flex items-center justify-center shadow-md hover:bg-background transition-all sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100";

  return (
    <div {...holdProps} role="region" aria-roledescription="carousel" aria-label={title} onKeyDown={handleKeyDown} className="mb-16">
      <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
        {frame}
        <div aria-live={liveMode} className="group relative aspect-[16/10] overflow-hidden bg-muted">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={page}
              src={images[index]}
              alt={`${title} — ${t("a11y.photoN", { n: index + 1, total: count })}`}
              aria-roledescription="slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-top cursor-grab active:cursor-grabbing"
            />
          </AnimatePresence>

          <button type="button" aria-label={t("a11y.prevPhoto")} onClick={() => paginate(-1)} className={cn(navButton, "left-3")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label={t("a11y.nextPhoto")} onClick={() => paginate(1)} className={cn(navButton, "right-3")}>
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={t(isPaused ? "a11y.playSlides" : "a11y.pauseSlides")}
            onClick={togglePause}
            className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-background/85 backdrop-blur-sm text-foreground flex items-center justify-center shadow-sm hover:bg-background transition-colors"
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Thumbnails, scrolling sideways when there are many */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t("a11y.photoN", { n: i + 1, total: count })}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "relative flex-shrink-0 w-24 sm:w-28 aspect-[16/10] overflow-hidden rounded-lg border-2 transition-all",
              i === index ? "border-foreground opacity-100" : "border-transparent opacity-50 hover:opacity-90",
            )}
          >
            <img src={src} alt="" className="h-full w-full object-cover object-top" loading="lazy" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
};
