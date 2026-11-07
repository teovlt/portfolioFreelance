// Visitor stats with Plausible: no cookies and no personal data, so no consent
// banner is needed. Off unless VITE_PLAUSIBLE_DOMAIN is set at build time
// (the domain registered in Plausible, e.g. teovillet.fr).

type Plausible = ((event: string, options?: { props?: Record<string, string> }) => void) & { q?: unknown[] };

declare global {
  interface Window {
    plausible?: Plausible;
  }
}

const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

export const analyticsEnabled = Boolean(domain);

// Conversions shown as goals in Plausible (each must also be added there,
// under Site settings > Goals, with exactly this name)
export type Goal = "Booking" | "Message" | "Plan chosen" | "WhatsApp" | "Phone" | "Email";

export const track = (goal: Goal, props?: Record<string, string>) => {
  window.plausible?.(goal, props && { props });
};

// Clicks on contact links, wherever they are on the page (hero, navbar,
// contact section, footer, floating WhatsApp button)
const contactLinkGoal = (href: string): Goal | null => {
  if (href.startsWith("https://wa.me/")) return "WhatsApp";
  if (href.startsWith("tel:")) return "Phone";
  if (href.startsWith("mailto:")) return "Email";
  return null;
};

export const initAnalytics = () => {
  if (!domain) return;
  // Admin visits would skew the numbers
  if (location.pathname.startsWith("/admin")) return;

  // Queues events fired before the script has loaded
  window.plausible =
    window.plausible ||
    Object.assign((...args: unknown[]) => (window.plausible!.q = window.plausible!.q || []).push(args), {});

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = domain;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);

  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest?.("a[href]");
    const goal = link && contactLinkGoal(link.getAttribute("href") ?? "");
    if (goal) track(goal);
  });
};
