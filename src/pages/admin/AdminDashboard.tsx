import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Contact, FolderKanban, Images, MessageSquareQuote, Package, Plus, Route, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";
import { useStats } from "@/hooks/useStats";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";
import { ProjectStatus } from "@/types/project";
import { ProjectStatusBadge, statusMeta } from "./ProjectStatusBadge";

const relativeFormatter = new Intl.RelativeTimeFormat("fr-FR", { numeric: "auto" });

const timeAgo = (iso: string) => {
  const diffSeconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];
  for (const [unit, seconds] of units) {
    if (Math.abs(diffSeconds) >= seconds) return relativeFormatter.format(Math.round(diffSeconds / seconds), unit);
  }
  return "à l'instant";
};

const statusOrder = [ProjectStatus.DONE, ProjectStatus.ONGOING, ProjectStatus.STARTED];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { projects, isLoading, error } = useProjects();
  const { stats, isLoading: statsLoading } = useStats();
  const pendingReviews = stats?.reviews.pending ?? 0;

  const recent = useMemo(() => [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5), [projects]);

  const statusCounts = useMemo(
    () => statusOrder.map((status) => ({ status, count: projects.filter((p) => p.status === status).length })),
    [projects],
  );

  const collections = [
    {
      to: "/admin/projects",
      label: "Projets",
      description: "Études de cas de la section projets",
      icon: FolderKanban,
      stat: stats?.projects,
    },
    { to: "/admin/reviews", label: "Avis", description: "Témoignages clients du hero", icon: MessageSquareQuote, stat: stats?.reviews },
    { to: "/admin/packages", label: "Packages", description: "Offres et tarifs", icon: Package, stat: stats?.packages },
    { to: "/admin/experiences", label: "Parcours", description: "Formations et expériences", icon: Route, stat: stats?.experiences },
    { to: "/admin/photos", label: "Photos", description: "Carrousel de la section À propos", icon: Images, stat: stats?.photos },
    { to: "/admin/socials", label: "Réseaux", description: "Liens du hero et du pied de page", icon: Share2, stat: stats?.socials },
    {
      to: "/admin/contact",
      label: "Coordonnées",
      description: "Email, téléphone, localisation",
      icon: Contact,
      stat: stats?.contact,
      single: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Tableau de bord</p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Bonjour {user?.username}</h1>
          <p className="mt-2 text-muted-foreground">Vue d'ensemble du contenu du portfolio.</p>
        </div>
        <Button asChild variant="outline" size="lg" className="w-fit">
          <Link to="/" target="_blank" rel="noopener noreferrer">
            <ArrowUpRight />
            Voir le site
          </Link>
        </Button>
      </div>

      {error && <p className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive">{error}</p>}

      {pendingReviews > 0 && (
        <Link
          to="/admin/reviews"
          className="group flex items-center gap-4 rounded-2xl border border-accent/50 bg-accent/10 px-5 py-4 transition-colors hover:bg-accent/20"
        >
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <MessageSquareQuote className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">
              {pendingReviews} {pendingReviews > 1 ? "nouveaux" : "nouvel"} avis en attente
            </span>
            <span className="block text-sm text-muted-foreground">
              Relis-{pendingReviews > 1 ? "les" : "le"} et décide de {pendingReviews > 1 ? "les" : "le"} publier sur le site.
            </span>
          </span>
          <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      {/* Collections */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Collections</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {collections.map(({ to, label, description, icon: Icon, stat, single }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-muted/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <p className="mt-4 font-semibold">{label}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-display font-bold tracking-tight tabular-nums">
                  {statsLoading ? "…" : single ? (stat?.count ? "✓" : "—") : (stat?.count ?? 0)}
                </span>
                <span className="text-xs text-muted-foreground">{stat?.updatedAt ? `Modifié ${timeAgo(stat.updatedAt)}` : "—"}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
        {/* Recent activity */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold">Dernières modifications</h2>
            <Link to="/admin/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tout voir
            </Link>
          </div>

          {isLoading && (
            <div className="divide-y divide-border">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <div className="h-10 w-16 rounded-lg bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-40 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && recent.length === 0 && (
            <div className="flex flex-col items-center px-5 py-12 text-center">
              <p className="font-semibold">Aucun contenu pour l'instant</p>
              <p className="mt-1 text-sm text-muted-foreground">Ajoute ton premier projet pour qu'il apparaisse sur le portfolio.</p>
              <Button asChild className="mt-5">
                <Link to="/admin/projects/new">
                  <Plus />
                  Créer un projet
                </Link>
              </Button>
            </div>
          )}

          {!isLoading && recent.length > 0 && (
            <ul className="divide-y divide-border">
              {recent.map((project) => (
                <li key={project._id}>
                  <Link
                    to={`/admin/projects/${project.slug}/edit`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors"
                  >
                    <div className="hidden sm:block h-10 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                      <img src={project.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{project.title}</p>
                      <p className="truncate text-xs text-muted-foreground">Projet · {timeAgo(project.updatedAt)}</p>
                    </div>
                    <ProjectStatusBadge status={project.status} className="flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Project status breakdown */}
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold">Avancement des projets</h2>
          <p className="text-sm text-muted-foreground">Répartition par statut</p>

          <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-muted">
            {!isLoading &&
              projects.length > 0 &&
              statusCounts.map(({ status, count }) => (
                <div
                  key={status}
                  className={cn("h-full", statusMeta[status].dot)}
                  style={{ width: `${(count / projects.length) * 100}%` }}
                />
              ))}
          </div>

          <ul className="mt-5 space-y-3">
            {statusCounts.map(({ status, count }) => (
              <li key={status} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", statusMeta[status].dot)} />
                  {statusMeta[status].label}
                </span>
                <span className="font-semibold tabular-nums">{isLoading ? "…" : count}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
