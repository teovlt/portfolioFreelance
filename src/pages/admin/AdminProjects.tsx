import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight, FolderKanban, Github, Globe, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/providers/auth-provider";
import { apiRequest, ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { ProjectStatus, type Project } from "@/types/project";
import { ProjectStatusBadge, statusMeta } from "./ProjectStatusBadge";

type StatusFilter = "all" | ProjectStatus;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" });
const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });

export const AdminProjects = () => {
  const { projects, isLoading, error, refresh } = useProjects();
  const { token } = useAuth();
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const counts = useMemo(
    () => ({
      all: projects.length,
      [ProjectStatus.DONE]: projects.filter((p) => p.status === ProjectStatus.DONE).length,
      [ProjectStatus.ONGOING]: projects.filter((p) => p.status === ProjectStatus.ONGOING).length,
      [ProjectStatus.STARTED]: projects.filter((p) => p.status === ProjectStatus.STARTED).length,
    }),
    [projects],
  );

  const lastUpdated = useMemo(
    () => projects.reduce<Project | null>((latest, p) => (!latest || p.updatedAt > latest.updatedAt ? p : latest), null),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || p.slug.includes(q) || p.stack.some((s) => s.toLowerCase().includes(q));
    });
  }, [projects, query, statusFilter]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setIsDeleting(true);
    try {
      await apiRequest(`/projects/${toDelete.slug}`, { method: "DELETE", token });
      toast.success(`"${toDelete.title}" supprimé.`);
      setToDelete(null);
      refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Suppression impossible.");
    } finally {
      setIsDeleting(false);
    }
  };

  const stats = [
    { label: "Projets publiés", value: counts.all, hint: "Visibles sur le portfolio", accent: "bg-foreground" },
    { label: statusMeta[ProjectStatus.DONE].label, value: counts[ProjectStatus.DONE], hint: "Livrés et en ligne", accent: statusMeta[ProjectStatus.DONE].dot },
    { label: statusMeta[ProjectStatus.ONGOING].label, value: counts[ProjectStatus.ONGOING], hint: "En développement", accent: statusMeta[ProjectStatus.ONGOING].dot },
    {
      label: "Dernière modif.",
      value: lastUpdated ? shortDateFormatter.format(new Date(lastUpdated.updatedAt)) : "—",
      hint: lastUpdated?.title ?? "Aucun projet",
      accent: "bg-accent",
    },
  ];

  const filters: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "Tous" },
    { value: ProjectStatus.DONE, label: statusMeta[ProjectStatus.DONE].label },
    { value: ProjectStatus.ONGOING, label: statusMeta[ProjectStatus.ONGOING].label },
    { value: ProjectStatus.STARTED, label: statusMeta[ProjectStatus.STARTED].label },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Contenu</p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Projets</h1>
          <p className="mt-2 text-muted-foreground">Les études de cas affichées dans la section projets du portfolio.</p>
        </div>
        <Button asChild size="lg" className="w-fit">
          <Link to="/admin/projects/new">
            <Plus />
            Nouveau projet
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(({ label, value, hint, accent }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className={cn("h-2 w-2 rounded-full", accent)} />
              {label}
            </p>
            <p className="mt-3 text-2xl sm:text-3xl font-display font-bold tracking-tight truncate">{isLoading ? "…" : value}</p>
            <p className="mt-1 text-xs text-muted-foreground truncate">{hint}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center gap-3 border-b border-border p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un projet, une techno…"
              className="h-10 rounded-full pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-1 overflow-x-auto md:ml-auto">
            {filters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={cn(
                  "flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  statusFilter === value ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted",
                )}
              >
                {label}
                <span className={cn("tabular-nums", statusFilter === value ? "opacity-60" : "opacity-50")}>{counts[value]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Column headings */}
        <div className="hidden xl:grid grid-cols-[minmax(0,1fr)_200px_110px_120px_132px] gap-4 border-b border-border bg-muted/40 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Projet</span>
          <span>Stack</span>
          <span>Statut</span>
          <span>Modifié</span>
          <span className="text-right">Actions</span>
        </div>

        {isLoading && (
          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-12 w-20 rounded-lg bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-40 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="px-5 py-10 text-center text-sm text-destructive">{error}</p>}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <FolderKanban className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-4 font-semibold">{projects.length === 0 ? "Aucun projet pour l'instant" : "Aucun résultat"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {projects.length === 0 ? "Ajoute ton premier projet pour qu'il apparaisse sur le portfolio." : "Essaie une autre recherche ou un autre filtre."}
            </p>
            {projects.length === 0 && (
              <Button asChild className="mt-5">
                <Link to="/admin/projects/new">
                  <Plus />
                  Créer un projet
                </Link>
              </Button>
            )}
          </div>
        )}

        {!isLoading && !error && filtered.length > 0 && (
          <ul className="divide-y divide-border">
            {filtered.map((project) => (
              <li
                key={project._id}
                className="group grid grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[minmax(0,1fr)_200px_110px_120px_132px] items-center gap-x-4 gap-y-3 px-4 sm:px-5 py-4 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative hidden sm:block h-12 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <img src={project.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <Link to={`/admin/projects/${project.slug}/edit`} className="block truncate font-semibold hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                    <p className="flex items-center gap-2 truncate text-xs text-muted-foreground">
                      <span className="font-mono">/{project.slug}</span>
                      <span className="opacity-40">·</span>
                      <span>#{project.order}</span>
                      {project.liveLink && <Globe className="h-3 w-3" aria-label="Lien live" />}
                      {project.githubLink && <Github className="h-3 w-3" aria-label="Lien GitHub" />}
                    </p>
                    <ProjectStatusBadge status={project.status} className="sm:hidden mt-2" />
                  </div>
                </div>

                <div className="hidden xl:flex flex-wrap gap-1">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">+{project.stack.length - 3}</span>
                  )}
                </div>

                <div className="hidden xl:block">
                  <ProjectStatusBadge status={project.status} />
                </div>

                <p className="hidden xl:block text-sm text-muted-foreground">{dateFormatter.format(new Date(project.updatedAt))}</p>

                <div className="flex items-center justify-end gap-1">
                  <ProjectStatusBadge status={project.status} className="hidden sm:inline-flex xl:hidden mr-1" />
                  <Button asChild variant="ghost" size="icon" className="h-9 w-9" title="Voir sur le site">
                    <Link to={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon" className="h-9 w-9" title="Modifier">
                    <Link to={`/admin/projects/${project.slug}/edit`}>
                      <Pencil />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
                    title="Supprimer"
                    onClick={() => setToDelete(project)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && !error && filtered.length > 0 && (
          <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
            {filtered.length} projet{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""} sur {projects.length}
          </div>
        )}
      </div>

      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer ce projet ?</DialogTitle>
            <DialogDescription>
              "{toDelete?.title}" sera définitivement supprimé du portfolio. Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
