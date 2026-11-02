// The review form lives once, in the footer; anything else on the page (the
// hero's reviews card) opens it through this event
export const OPEN_REVIEW_EVENT = "review:open";

export const openReviewDialog = () => window.dispatchEvent(new Event(OPEN_REVIEW_EVENT));
