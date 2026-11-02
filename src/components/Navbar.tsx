import { Link } from "react-router-dom";
import { ThemeChanger } from "./ThemeChanger";
import { LanguageChanger } from "./LanguageChanger";
import { useTranslation } from "react-i18next";
import { Separator } from "./ui/separator";
import { Mail, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useSectionNav } from "@/hooks/useSectionNav";
import { usePublicContent } from "@/hooks/usePublicContent";
import type { ContactInfo } from "@/types/content";

export const Navbar = () => {
  const { t } = useTranslation();
  const { data: contactInfo } = usePublicContent<ContactInfo | null>("/contact", null);
  const { handleNavLinkClick, handleSectionButtonClick } = useSectionNav();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home-section");
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { id: "home-section", label: t("navbar.home") },
    { id: "services-section", label: t("navbar.services") },
    { id: "projects-section", label: t("navbar.projects") },
    { id: "about-section", label: t("navbar.about") },
    { id: "contact-section", label: t("navbar.contact") },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // While the full-screen menu is open: Escape closes it, and Tab cycles
  // between the toggle and the menu instead of reaching the page behind
  useEffect(() => {
    if (!isOpen) return;
    const focusables = () => [
      toggleButtonRef.current,
      ...(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
    ].filter((el): el is HTMLElement => !!el);

    // After the reveal has started, so the links exist
    const timeout = setTimeout(() => focusables()[1]?.focus(), 100);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : index === items.length - 1 ? 0 : index + 1;
      event.preventDefault();
      items[next]?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.id);
      let currentSection = "home-section";

      // Last nav section scrolled past, so sections that aren't in the menu
      // (process, FAQ) keep the one just above them highlighted
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          currentSection = section;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 py-4 sm:py-5"
      >
        <div className="container mx-auto px-4">
          {/* Desktop */}
          <div
            className={cn(
              "hidden lg:flex items-center justify-between select-none rounded-full pl-5 pr-2 py-2 transition-all duration-200 border",
              isScrolled ? "bg-card/90 backdrop-blur-md shadow-sm border-border" : "bg-card border-transparent",
            )}
          >
            <Link
              to="/"
              onClick={(e) => handleNavLinkClick("home-section", e)}
              className="flex items-center gap-2 font-display font-bold text-base tracking-tight"
            >
              Téo Villet
            </Link>
            <div className="flex gap-5 items-center">
              <nav aria-label={t("a11y.mainMenu")} className="flex gap-6 text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/#${item.id}`}
                    onClick={(e) => handleNavLinkClick(item.id, e)}
                    aria-current={activeSection === item.id ? "true" : undefined}
                    className={cn(
                      "relative py-1 transition-colors",
                      activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent rounded-full" />}
                  </Link>
                ))}
              </nav>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex gap-1.5 items-center">
                <LanguageChanger />
                <ThemeChanger />
              </div>
              <Button size="sm" className="rounded-full" onClick={(e) => handleSectionButtonClick("contact-section", e)}>
                {t("navbar.contactCta")}
              </Button>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden justify-between items-center p-2 rounded-full bg-card border border-border shadow-sm px-5 relative z-50">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
              Téo Villet
            </Link>
            <motion.button
              ref={toggleButtonRef}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t("a11y.closeMenu") : t("a11y.openMenu")}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="w-9 h-9 flex items-center justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu: full-screen circle reveal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ clipPath: "circle(2% at calc(100% - 2.75rem) 2.25rem)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2.25rem)" }}
              exit={{ clipPath: "circle(2% at calc(100% - 2.75rem) 2.25rem)" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-40 bg-ink text-ink-foreground grain lg:hidden"
            >
              <div className="h-full flex flex-col px-6 pt-24 pb-10">
                <nav aria-label={t("a11y.mainMenu")} className="flex-1 flex flex-col justify-center gap-0.5">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                    >
                      <Link
                        to={`/#${item.id}`}
                        onClick={(e) => {
                          handleNavLinkClick(item.id, e);
                          setIsOpen(false);
                        }}
                        className="group flex items-baseline gap-4 py-3 border-b border-ink-foreground/10"
                      >
                        <span className="font-serif text-sm text-ink-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={cn(
                            "font-display text-3xl sm:text-4xl font-bold transition-colors",
                            activeSection === item.id ? "text-accent" : "text-ink-foreground group-hover:text-accent",
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex flex-col gap-6 pt-8 border-t border-ink-foreground/10"
                >
                  {contactInfo?.email && (
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-2 text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors w-fit"
                    >
                      <Mail className="h-4 w-4" />
                      {contactInfo.email}
                    </a>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      <LanguageChanger />
                      <ThemeChanger />
                    </div>
                    <Button
                      className="bg-ink-foreground text-ink hover:bg-ink-foreground/90"
                      onClick={(e) => {
                        handleSectionButtonClick("contact-section", e);
                        setIsOpen(false);
                      }}
                    >
                      {t("navbar.contactCta")}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
