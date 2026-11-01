// Sections already carry generous top padding of their own (for the floating
// navbar pill to clear), so we only need a small extra nudge here — not the
// full navbar height, or we'd land with a big empty gap before any content.
const SCROLL_CLEARANCE = 16;

export const scrollToId = (id: string, behavior: ScrollBehavior = "smooth") => {
  const section = document.getElementById(id);
  if (section) {
    const position = Math.max(section.offsetTop - SCROLL_CLEARANCE, 0);
    window.scrollTo({ top: position, behavior });
  }
};

export const scrollToSection = (id: string, event: any) => {
  event.preventDefault();
  scrollToId(id);
};

// Landing on /#section (e.g. "back to all projects"), the sections above the
// target are still fetching their content: as they fill in, the target gets
// pushed down and we'd end up in the middle of another section. Keep it
// pinned while the page settles, until the visitor scrolls on their own.
export const scrollToHash = (id: string) => {
  scrollToId(id, "instant");

  const observer = new ResizeObserver(() => scrollToId(id, "instant"));
  observer.observe(document.body);

  const stop = () => {
    observer.disconnect();
    clearTimeout(timeout);
    userEvents.forEach((event) => window.removeEventListener(event, stop));
  };
  const userEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const;
  userEvents.forEach((event) => window.addEventListener(event, stop, { passive: true }));
  const timeout = setTimeout(stop, 3000);

  return stop;
};
