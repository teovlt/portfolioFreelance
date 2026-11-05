import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import NotFound from "@/pages/ErrorPage";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";

export const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr" : "en";
  const { projects, isLoading, error, refresh } = useProjects();

  // Keeps the page's height while loading so the footer doesn't jump up
  if (isLoading) return <section className="min-h-screen" aria-busy="true" />;

  // The API being down isn't a missing project: offer a retry, not a 404
  if (error) {
    return (
      <section className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center gap-5">
        <p className="text-muted-foreground">
          {lang === "fr" ? "Impossible de charger ce projet pour le moment." : "This project couldn't be loaded right now."}
        </p>
        <Button variant="outline" onClick={refresh}>
          {lang === "fr" ? "Réessayer" : "Try again"}
        </Button>
      </section>
    );
  }

  const study = projects.find((p) => p.slug === slug);
  // A not-found page rather than a redirect to the list, so a deleted or
  // mistyped project isn't indexed as a copy of the home page
  if (!study) return <NotFound />;

  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const next = sorted[(currentIndex + 1) % sorted.length];

  return (
    <section className="pt-32 pb-24 px-4">
      <Helmet>
        <title>{`${study.title} — Téo Villet`}</title>
        <meta name="description" content={study.tagline[lang]} />
      </Helmet>

      <div className="container max-w-4xl mx-auto">
        <Link
          to="/#projects-section"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {lang === "fr" ? "Tous les projets" : "All projects"}
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow mb-3">
            {lang === "fr" ? "Étude de cas" : "Case study"} · {t(`projects.status.${study.status}`)}
          </p>
          <h1 className="text-5xl md:text-7xl mb-5">{study.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">{study.tagline[lang]}</p>

          <div className="flex flex-wrap gap-x-10 gap-y-4 py-7 border-y border-border mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                {lang === "fr" ? "Rôle" : "Role"}
              </div>
              <div className="text-sm font-semibold">{study.role[lang]}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                {lang === "fr" ? "Période" : "Timeline"}
              </div>
              <div className="text-sm font-semibold">{study.timeline[lang]}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                {lang === "fr" ? "Statut" : "Status"}
              </div>
              <div className="text-sm font-semibold">{t(`projects.status.${study.status}`)}</div>
            </div>
            {study.liveLink && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Live</div>
                <a
                  href={study.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold inline-flex items-center gap-1 border-b border-foreground"
                >
                  {study.liveLink.replace("https://", "")} <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}
            {study.githubLink && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Code</div>
                <a
                  href={study.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold inline-flex items-center gap-1 border-b border-foreground"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden border border-border shadow-sm mb-16">
            <div className="h-9 bg-muted flex items-center gap-1.5 px-4 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <img src={study.image} alt={study.title} className="w-full object-cover max-h-[560px]" />
          </div>

          <div className="grid sm:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-xl font-bold mb-3">{lang === "fr" ? "Aperçu" : "Overview"}</h2>
              <p className="text-muted-foreground leading-relaxed text-justify hyphens-auto">{study.overview[lang]}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3">{lang === "fr" ? "Stack technique" : "Stack"}</h2>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-lg font-bold mb-3">{lang === "fr" ? "Le défi" : "The Challenge"}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed text-justify hyphens-auto">{study.challenge[lang]}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-3">{lang === "fr" ? "L'approche" : "The Approach"}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed text-justify hyphens-auto">{study.approach[lang]}</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-bold mb-2">{lang === "fr" ? "Fonctionnalités clés" : "Key Features"}</h2>
            <div className="divide-y divide-border border-y border-border">
              {study.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 py-4 text-sm">
                  <ArrowRight className="w-4 h-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                  {feature[lang]}
                </div>
              ))}
            </div>
          </div>

          {/* Turns a reader who liked the project into a call */}
          <div className="mb-16 relative rounded-3xl overflow-hidden bg-foreground text-background grain">
            <div className="relative px-8 sm:px-12 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
                  {lang === "fr" ? "Un projet dans le même esprit ?" : "Got a project like this one?"}
                </h2>
                <p className="text-background/70">
                  {lang === "fr"
                    ? "Parlons-en lors d'un appel gratuit. Je vous envoie ensuite un devis détaillé sous 24 h."
                    : "Let's talk about it on a free call. I'll then send you a detailed quote within 24 hours."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/#contact-section"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-colors"
                >
                  {lang === "fr" ? "Réserver un appel" : "Book a call"}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/#services-section"
                  className="inline-flex items-center h-12 px-6 rounded-full border border-background/30 font-semibold text-sm hover:bg-background/10 transition-colors"
                >
                  {lang === "fr" ? "Voir les tarifs" : "See pricing"}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
            <Link to="/#projects-section" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              ← {lang === "fr" ? "Retour aux projets" : "Back to all projects"}
            </Link>
            {next && (
              <Button asChild variant="ghost" className="font-semibold">
                <Link to={`/projects/${next.slug}`}>
                  {lang === "fr" ? "Projet suivant" : "Next project"}: {next.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
