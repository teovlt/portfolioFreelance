import { scrollToId } from "./scrollToSection";

export type ContactTab = "booking" | "message";

export const CONTACT_TAB_EVENT = "contact:tab";

// Scrolls to the contact section with a given tab open, from anywhere on the
// page (FAQ, package cards...) without threading state through the tree
export const openContactTab = (tab: ContactTab, event?: { preventDefault: () => void }) => {
  event?.preventDefault();
  window.dispatchEvent(new CustomEvent<ContactTab>(CONTACT_TAB_EVENT, { detail: tab }));
  scrollToId("contact-section");
};
