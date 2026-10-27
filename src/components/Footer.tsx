"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowUpRight, PenLine } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useSectionNav } from "@/hooks/useSectionNav";
import { useTranslation } from "react-i18next";
import { isExternalUrl, SocialIcon } from "@/components/SocialIcon";
import { ReviewDialog } from "@/components/customs/review-dialog";
import { usePublicContent } from "@/hooks/usePublicContent";
import type { Social } from "@/types/content";

export function Footer() {
  const { t } = useTranslation();
  const { handleNavLinkClick, handleSectionButtonClick } = useSectionNav();
  const { data: socials } = usePublicContent<Social[]>("/socials", []);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [params, setParams] = useSearchParams();

  // `/?avis` is the link I send clients: it opens the review form directly
  useEffect(() => {
    if (!params.has("avis")) return;
    setIsReviewOpen(true);
    params.delete("avis");
    setParams(params, { replace: true });
  }, [params, setParams]);

  const navItems = [
    { label: t("footer.nav.home"), sectionId: "home-section" },
    { label: t("footer.nav.about"), sectionId: "about-section" },
    { label: t("footer.nav.experiences"), sectionId: "experiences-section" },
    { label: t("footer.nav.services"), sectionId: "services-section" },
    { label: t("footer.nav.projects"), sectionId: "projects-section" },
    { label: t("footer.nav.contact"), sectionId: "contact-section" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-ink-foreground overflow-hidden grain">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-16 border-b border-ink-foreground/15">
          <div>
            <p className="eyebrow text-ink-foreground/50 mb-5">{t("footer.brand.eyebrow")}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight md:whitespace-nowrap">
              {t("footer.brand.titleStart")}{" "}
              <span className="font-serif italic font-medium text-accent">{t("footer.brand.titleHighlight")}</span>
            </h2>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ink-foreground text-ink hover:bg-ink-foreground/90 flex-shrink-0 w-fit lg:mb-1"
          >
            <a href="#contact-section" onClick={(e) => handleSectionButtonClick("contact-section", e)}>
              {t("footer.cta")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Columns */}
        <div className="grid sm:grid-cols-3 gap-10 py-16 border-b border-ink-foreground/15">
          <div>
            <p className="font-serif italic text-2xl text-ink-foreground mb-3">Téo Villet</p>
            <p className="text-sm text-ink-foreground/60 max-w-xs leading-relaxed">{t("footer.brand.tagline")}</p>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/50 mb-4">{t("footer.columns.navTitle")}</p>
            <nav className="flex flex-col gap-2.5 text-sm">
              {navItems.map(({ label, sectionId }) => (
                <Link
                  key={sectionId}
                  to={`/#${sectionId}`}
                  className="text-ink-foreground/70 hover:text-ink-foreground transition-colors w-fit"
                  onClick={(e) => handleNavLinkClick(sectionId, e)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/50 mb-4">{t("footer.columns.contactTitle")}</p>
            <div className="flex flex-wrap items-center gap-1 -ml-2">
              {socials.map((social) => (
                <Button
                  key={social._id}
                  variant="ghost"
                  size="icon"
                  asChild
                  aria-label={social.label}
                  title={social.label}
                  className="text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
                >
                  <a href={social.url} {...(isExternalUrl(social.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <SocialIcon icon={social.icon} className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
            <button
              onClick={() => setIsReviewOpen(true)}
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors"
            >
              <PenLine className="h-4 w-4" />
              {t("reviews.leave")}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-sm text-ink-foreground/50">
            © {currentYear} Téo Villet. {t("footer.rights")}
          </p>
          <p className="text-sm text-ink-foreground/50">{t("footer.location")}</p>
        </div>
      </div>
      <ReviewDialog open={isReviewOpen} onOpenChange={setIsReviewOpen} />
    </footer>
  );
}
