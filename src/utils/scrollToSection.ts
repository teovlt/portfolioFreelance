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
