import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Contact,
  EyeOff,
  FolderKanban,
  Images,
  Link2,
  Mail,
  MapPin,
  MessageSquareQuote,
  Package,
  Pencil,
  Phone,
  Plus,
  Route,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/SocialIcon";
import { useDashboardData, type DashboardData } from "@/hooks/useDashboardData";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { ReviewStatus, type Review } from "@/types/content";
import { ProjectStatus } from "@/types/project";
import { statusMeta } from "./ProjectStatusBadge";

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

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const plural = (count: number, singular: string, pluralForm = `${singular}s`) => `${count} ${count > 1 ? pluralForm : singular}`;

const hiddenLabel = (items: { visible: boolean }[]) => {
  const hidden = items.filter((i) => !i.visible).length;
  return hidden ? `${plural(hidden, "masqué")} du site` : "Tout est en ligne";
};

// Sorts "1 400€", "950€"… by their numeric value
const priceValue = (price: string) => Number(price.replace(/[^\d]/g, "")) || 0;

const statusOrder = [ProjectStatus.DONE, ProjectStatus.ONGOING, ProjectStatus.STARTED];

const Stars = ({ rating, className }: { rating: number; className?: string }) => (
  <span className={cn("flex items-center gap-0.5", className)} aria-label={`${rating}/5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={cn("h-3 w-3", i < Math.round(rating) ? "fill-accent text-accent" : "text-border")} />
    ))}
  </span>
);

const QuickAction = ({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
  >
    <Icon className="h-3.5 w-3.5" />
    {children}
  </Link>
);

const CollectionCard = ({
  to,
  label,
  icon: Icon,
  count,
  meta,
  actions,
  className,
  children,
}: {
  className?: string;
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: React.ReactNode;
  meta: React.ReactNode;
  actions: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className={cn("flex flex-col rounded-2xl border border-border bg-card", className)}>
    <Link to={to} className="group flex items-center gap-3 px-5 pt-5">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 font-semibold">
          {label}
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </span>
        <span className="block truncate text-xs text-muted-foreground">{meta}</span>
      </span>
      {count !== undefined && <span className="text-3xl font-display font-bold tracking-tight tabular-nums">{count}</span>}
    </Link>
    <div className="flex-1 px-5 py-4">{children}</div>
    <div className="flex flex-wrap items-center gap-1 border-t border-border px-2 py-1.5">{actions}</div>
  </section>
);

const Empty = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-muted-foreground">{children}</p>;

type Activity = {
  key: string;
  kind: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  action: string;
  date: string;
  to: string;
  image?: string;
};

// What changed recently, across every collection
const buildActivity = (data: DashboardData): Activity[] => {
  const verb = (item: { createdAt: string; updatedAt: string }) =>
    Math.abs(new Date(item.updatedAt).getTime() - new Date(item.createdAt).getTime()) < 2000 ? "Ajouté" : "Modifié";

  const entries: Activity[] = [
    ...data.projects.map((p) => ({
      key: `project-${p._id}`,
      kind: "Projet",
      icon: FolderKanban,
      title: p.title,
      action: verb(p),
      date: p.updatedAt,
      to: `/admin/projects/${p.slug}/edit`,
      image: p.image,
    })),
    ...data.reviews.map((r) => ({
      key: `review-${r._id}`,
      kind: "Avis",
      icon: MessageSquareQuote,
      title: `Avis de ${r.name}`,
      action:
        r.submitted && verb(r) === "Ajouté"
          ? "Reçu depuis le site"
          : r.status === ReviewStatus.PUBLISHED && verb(r) === "Modifié"
            ? "Modifié"
            : verb(r),
      date: r.updatedAt,
      to: `/admin/reviews?edit=${r._id}`,
      image: r.image,
    })),
    ...data.packages.map((p) => ({
      key: `package-${p._id}`,
      kind: "Package",
      icon: Package,
      title: p.title.fr,
      action: verb(p),
      date: p.updatedAt,
      to: `/admin/packages?edit=${p._id}`,
    })),
    ...data.experiences.map((e) => ({
      key: `experience-${e._id}`,
      kind: "Parcours",
      icon: Route,
      title: e.title.fr,
      action: verb(e),
      date: e.updatedAt,
      to: `/admin/experiences?edit=${e._id}`,
      image: e.logo,
    })),
    ...data.photos.map((p) => ({
      key: `photo-${p._id}`,
      kind: "Photo",
      icon: Images,
      title: p.alt.fr || "Photo",
      action: verb(p),
      date: p.updatedAt,
      to: `/admin/photos?edit=${p._id}`,
      image: p.src,
    })),
    ...data.socials.map((s) => ({
      key: `social-${s._id}`,
      kind: "Réseau",
      icon: Share2,
      title: s.label,
      action: verb(s),
      date: s.updatedAt,
      to: `/admin/socials?edit=${s._id}`,
    })),
    ...(data.contact
      ? [
          {
            key: "contact",
            kind: "Coordonnées",
            icon: Contact,
            title: "Coordonnées",
            action: "Modifié",
            date: data.contact.updatedAt,
            to: "/admin/contact",
          },
        ]
      : []),
  ];

  return entries.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
};

type Todo = { key: string; label: string; to: string; tone: "warning" | "info" };

// Things worth fixing, derived from the content itself
const buildTodos = (data: DashboardData): Todo[] => {
  const todos: Todo[] = [];

  const pending = data.reviews.filter((r) => r.status === ReviewStatus.PENDING);
  if (pending.length)
    todos.push({ key: "pending", label: `${plural(pending.length, "avis", "avis")} à modérer`, to: "/admin/reviews", tone: "warning" });

  const placeholder = data.projects.filter((p) => JSON.stringify(p).toLowerCase().includes("lorem ipsum"));
  if (placeholder.length)
    todos.push({
      key: "lorem",
      label: `${plural(placeholder.length, "projet")} avec du texte provisoire (lorem ipsum)`,
      to: `/admin/projects/${placeholder[0].slug}/edit`,
      tone: "warning",
    });

  const untranslated = data.reviews.filter((r) => r.status === ReviewStatus.PUBLISHED && (!r.comment.fr || !r.comment.en));
  if (untranslated.length)
    todos.push({
      key: "translate",
      label: `${plural(untranslated.length, "avis publié", "avis publiés")} sans traduction`,
      to: `/admin/reviews?edit=${untranslated[0]._id}`,
      tone: "info",
    });

  const noLogo = data.experiences.filter((e) => !e.logo);
  if (noLogo.length)
    todos.push({
      key: "logo",
      label: `${plural(noLogo.length, "étape", "étapes")} du parcours sans logo`,
      to: `/admin/experiences?edit=${noLogo[0]._id}`,
      tone: "info",
    });

  if (!data.photos.some((p) => p.visible))
    todos.push({ key: "photos", label: "Aucune photo visible dans « À propos »", to: "/admin/photos?new", tone: "warning" });
  if (!data.packages.some((p) => p.visible))
    todos.push({ key: "packages", label: "Aucun package visible sur le site", to: "/admin/packages", tone: "warning" });
  if (!data.contact) todos.push({ key: "contact", label: "Coordonnées non renseignées", to: "/admin/contact", tone: "warning" });

  return todos;
};

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { data, isLoading, error, setReviewStatus } = useDashboardData();
  const [busyReview, setBusyReview] = useState<string | null>(null);

  const pending = useMemo(
    () => (data?.reviews ?? []).filter((r) => r.status === ReviewStatus.PENDING).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [data],
  );
  const activity = useMemo(() => (data ? buildActivity(data) : []), [data]);
  const todos = useMemo(() => (data ? buildTodos(data) : []), [data]);

  const moderate = async (review: Review, status: ReviewStatus) => {
    setBusyReview(review._id);
    try {
      await setReviewStatus(review, status);
      toast.success(status === ReviewStatus.PUBLISHED ? `Avis de ${review.name} publié.` : `Avis de ${review.name} masqué.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Modification impossible.");
    } finally {
      setBusyReview(null);
    }
  };

  const copyReviewLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/?avis`);
      toast.success("Lien copié : envoie-le à tes clients pour qu'ils laissent un avis.");
    } catch {
      toast.error("Copie impossible.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Tableau de bord</p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Bonjour {user?.username}</h1>
          <p className="mt-2 text-muted-foreground">
            {pending.length
              ? `${plural(pending.length, "avis", "avis")} ${pending.length > 1 ? "attendent" : "attend"} ta validation.`
              : "Vue d'ensemble du contenu du portfolio."}
          </p>
        </div>
        <Button asChild variant="outline" size="lg" className="w-fit">
          <Link to="/" target="_blank" rel="noopener noreferrer">
            <ArrowUpRight />
            Voir le site
          </Link>
        </Button>
      </div>

      {error && <p className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive">{error}</p>}

      {/* Review inbox */}
      {pending.length > 0 && (
        <section className="rounded-2xl border border-accent/50 bg-accent/5 overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-accent/30 px-5 py-3.5">
            <h2 className="flex items-center gap-2 font-semibold">
              <MessageSquareQuote className="h-4 w-4" />
              Avis reçus
              <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold tabular-nums text-accent-foreground">
                {pending.length}
              </span>
            </h2>
            {pending.length > 3 && (
              <Link to="/admin/reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tout voir
              </Link>
            )}
          </div>
          <ul className="divide-y divide-accent/20">
            {pending.slice(0, 3).map((review) => (
              <li key={review._id} className="flex flex-col md:flex-row md:items-center gap-3 px-5 py-4">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    {review.image && <AvatarImage src={review.image} alt={review.name} className="object-cover" />}
                    <AvatarFallback className="text-xs">{initials(review.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-semibold">{review.name}</span>
                      <Stars rating={review.rating} />
                      <span className="text-xs text-muted-foreground">reçu {timeAgo(review.createdAt)}</span>
                    </p>
                    {(review.company.fr || review.company.en) && (
                      <p className="text-xs text-muted-foreground">{review.company.fr || review.company.en}</p>
                    )}
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/80">"{review.comment.fr || review.comment.en}"</p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1.5 md:pl-4">
                  <Button size="sm" disabled={busyReview === review._id} onClick={() => moderate(review, ReviewStatus.PUBLISHED)}>
                    <Check />
                    Publier
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busyReview === review._id}
                    onClick={() => moderate(review, ReviewStatus.HIDDEN)}
                  >
                    <EyeOff />
                    Masquer
                  </Button>
                  <Button asChild size="icon" variant="ghost" className="h-9 w-9" title="Relire / traduire">
                    <Link to={`/admin/reviews?edit=${review._id}`}>
                      <Pencil />
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Collections */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Collections</h2>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={cn("h-56 rounded-2xl bg-muted animate-pulse", i === 0 && "sm:col-span-2")} />
            ))}
          </div>
        ) : (
          data && <CollectionCards data={data} onCopyReviewLink={copyReviewLink} />
        )}
      </section>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4">
        {/* Recent activity, all collections */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-semibold">Dernières modifications</h2>
            <p className="text-sm text-muted-foreground">Tout le contenu du site, du plus récent au plus ancien</p>
          </div>

          {isLoading && (
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-40 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && activity.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">Aucun contenu pour l'instant.</p>
          )}

          {activity.length > 0 && (
            <ul className="divide-y divide-border">
              {activity.map(({ key, kind, icon: Icon, title, action, date, to, image }) => (
                <li key={key}>
                  <Link to={to} className="group flex items-center gap-4 px-5 py-3 hover:bg-muted/40 transition-colors">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                      {image ? (
                        <img src={image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/70">{kind}</span> · {action} {timeAgo(date)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Content health */}
        <section className="rounded-2xl border border-border bg-card p-5 h-fit">
          <h2 className="font-semibold">À faire</h2>
          <p className="text-sm text-muted-foreground">Ce qui mérite un coup d'œil</p>

          {isLoading ? (
            <div className="mt-5 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : todos.length === 0 ? (
            <div className="mt-6 flex flex-col items-center py-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              <p className="mt-3 text-sm font-medium">Tout est à jour</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-1">
              {todos.map(({ key, label, to, tone }) => (
                <li key={key}>
                  <Link
                    to={to}
                    className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm hover:bg-muted/60 transition-colors"
                  >
                    <AlertTriangle
                      className={cn("h-4 w-4 flex-shrink-0", tone === "warning" ? "text-amber-500" : "text-muted-foreground")}
                    />
                    <span className="flex-1">{label}</span>
                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

const CollectionCards = ({ data, onCopyReviewLink }: { data: DashboardData; onCopyReviewLink: () => void }) => {
  const { projects, reviews, packages, experiences, photos, socials, contact } = data;

  const statusCounts = statusOrder.map((status) => ({ status, count: projects.filter((p) => p.status === status).length }));
  const recentProjects = [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3);
  const lastProject = recentProjects[0];

  const published = reviews.filter((r) => r.status === ReviewStatus.PUBLISHED);
  const average = published.length ? published.reduce((sum, r) => sum + r.rating, 0) / published.length : 0;
  const latestReview = [...reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

  const visiblePackages = packages.filter((p) => p.visible);
  const prices = [...visiblePackages].sort((a, b) => priceValue(a.price) - priceValue(b.price));

  const visiblePhotos = photos.filter((p) => p.visible);

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      <CollectionCard
        className="sm:col-span-2"
        to="/admin/projects"
        label="Projets"
        icon={FolderKanban}
        count={projects.length}
        meta={lastProject ? `« ${lastProject.title} » modifié ${timeAgo(lastProject.updatedAt)}` : "Aucun projet"}
        actions={
          <>
            <QuickAction to="/admin/projects/new" icon={Plus}>
              Nouveau projet
            </QuickAction>
            {lastProject && (
              <QuickAction to={`/admin/projects/${lastProject.slug}/edit`} icon={Pencil}>
                Reprendre « {lastProject.title} »
              </QuickAction>
            )}
          </>
        }
      >
        {projects.length ? (
          <>
            <div className="flex h-2 overflow-hidden rounded-full bg-muted">
              {statusCounts.map(({ status, count }) => (
                <div
                  key={status}
                  className={cn("h-full", statusMeta[status].dot)}
                  style={{ width: `${(count / projects.length) * 100}%` }}
                />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {statusCounts.map(({ status, count }) => (
                <li key={status} className="flex items-center gap-1.5 text-muted-foreground">
                  <span className={cn("h-2 w-2 rounded-full", statusMeta[status].dot)} />
                  {statusMeta[status].label}
                  <span className="font-semibold tabular-nums text-foreground">{count}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 grid grid-cols-3 gap-3">
              {recentProjects.map((p) => (
                <li key={p._id}>
                  <Link to={`/admin/projects/${p.slug}/edit`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
                      <img src={p.image} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
                    </div>
                    <p className="mt-1.5 flex items-center gap-1.5 truncate text-xs font-medium">
                      <span className={cn("h-1.5 w-1.5 flex-shrink-0 rounded-full", statusMeta[p.status].dot)} />
                      <span className="truncate group-hover:text-primary transition-colors">{p.title}</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Empty>Aucun projet pour l'instant.</Empty>
        )}
      </CollectionCard>

      <CollectionCard
        to="/admin/reviews"
        label="Avis"
        icon={MessageSquareQuote}
        count={published.length}
        meta={
          published.length ? (
            <span className="inline-flex items-center gap-1.5">
              <Stars rating={average} /> {average.toFixed(1).replace(".", ",")} / 5
            </span>
          ) : (
            "Aucun avis publié"
          )
        }
        actions={
          <>
            <button
              onClick={onCopyReviewLink}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Link2 className="h-3.5 w-3.5" />
              Copier le lien pour les clients
            </button>
            <QuickAction to="/admin/reviews?new" icon={Plus}>
              Ajouter
            </QuickAction>
          </>
        }
      >
        {latestReview ? (
          <Link
            to={`/admin/reviews?edit=${latestReview._id}`}
            className="block rounded-xl bg-muted/50 px-3.5 py-3 hover:bg-muted transition-colors"
          >
            <p className="line-clamp-2 font-serif text-sm italic">"{latestReview.comment.fr || latestReview.comment.en}"</p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{latestReview.name}</span> ·{" "}
              {latestReview.submitted ? `reçu ${timeAgo(latestReview.createdAt)}` : `ajouté ${timeAgo(latestReview.createdAt)}`}
            </p>
          </Link>
        ) : (
          <Empty>Partage le lien ci-dessous à tes clients pour recevoir tes premiers avis.</Empty>
        )}
      </CollectionCard>

      <CollectionCard
        to="/admin/packages"
        label="Packages"
        icon={Package}
        count={visiblePackages.length}
        meta={prices.length > 1 ? `De ${prices[0].price} à ${prices[prices.length - 1].price}` : hiddenLabel(packages)}
        actions={
          <QuickAction to="/admin/packages?new" icon={Plus}>
            Nouveau package
          </QuickAction>
        }
      >
        {visiblePackages.length ? (
          <ul className="space-y-1.5 text-sm">
            {visiblePackages.slice(0, 4).map((p) => (
              <li key={p._id}>
                <Link
                  to={`/admin/packages?edit=${p._id}`}
                  className="flex items-center justify-between gap-3 hover:text-primary transition-colors"
                >
                  <span className="flex min-w-0 items-center gap-1.5 truncate">
                    {p.title.fr}
                    {p.popular && <Sparkles className="h-3 w-3 flex-shrink-0 text-accent" />}
                  </span>
                  <span className="flex-shrink-0 font-serif font-semibold tabular-nums">{p.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Aucun package visible.</Empty>
        )}
      </CollectionCard>

      <CollectionCard
        to="/admin/experiences"
        label="Parcours"
        icon={Route}
        count={experiences.length}
        meta={hiddenLabel(experiences)}
        actions={
          <QuickAction to="/admin/experiences?new" icon={Plus}>
            Nouvelle étape
          </QuickAction>
        }
      >
        {experiences.length ? (
          <ol className="relative space-y-3 border-l border-border pl-4">
            {experiences.slice(0, 3).map((e) => (
              <li key={e._id} className="relative">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-card" />
                <Link to={`/admin/experiences?edit=${e._id}`} className="block hover:text-primary transition-colors">
                  <p className="truncate text-sm font-medium">{e.title.fr}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {e.org.fr} · {e.date.fr}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <Empty>Parcours vide.</Empty>
        )}
      </CollectionCard>

      <CollectionCard
        to="/admin/photos"
        label="Photos"
        icon={Images}
        count={photos.length}
        meta={hiddenLabel(photos)}
        actions={
          <QuickAction to="/admin/photos?new" icon={Plus}>
            Ajouter une photo
          </QuickAction>
        }
      >
        {visiblePhotos.length ? (
          <div className="grid grid-cols-4 gap-2">
            {visiblePhotos.slice(0, 4).map((p, i) => (
              <Link key={p._id} to={`/admin/photos?edit=${p._id}`} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                <img src={p.src} alt={p.alt.fr} className="h-full w-full object-cover" style={{ objectPosition: p.position }} />
                {i === 3 && visiblePhotos.length > 4 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
                    +{visiblePhotos.length - 4}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <Empty>Aucune photo visible.</Empty>
        )}
      </CollectionCard>

      <CollectionCard
        to="/admin/socials"
        label="Réseaux"
        icon={Share2}
        count={socials.length}
        meta={hiddenLabel(socials)}
        actions={
          <QuickAction to="/admin/socials?new" icon={Plus}>
            Ajouter un réseau
          </QuickAction>
        }
      >
        {socials.length ? (
          <ul className="flex flex-wrap gap-1.5">
            {socials.map((s) => (
              <li key={s._id}>
                <Link
                  to={`/admin/socials?edit=${s._id}`}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium hover:border-foreground/30 transition-colors",
                    !s.visible && "opacity-50",
                  )}
                  title={s.visible ? s.url : `${s.url} (masqué)`}
                >
                  <SocialIcon icon={s.icon} className="h-3.5 w-3.5" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Aucun réseau.</Empty>
        )}
      </CollectionCard>

      <CollectionCard
        to="/admin/contact"
        label="Coordonnées"
        icon={Contact}
        meta={contact ? `Modifiées ${timeAgo(contact.updatedAt)}` : "Non renseignées"}
        actions={
          <QuickAction to="/admin/contact" icon={Pencil}>
            Modifier
          </QuickAction>
        }
      >
        {contact ? (
          <ul className="space-y-2 text-sm">
            {[
              { icon: Mail, value: contact.email },
              { icon: Phone, value: contact.phone },
              { icon: MapPin, value: contact.location.fr },
            ]
              .filter(({ value }) => value)
              .map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-center gap-2.5 min-w-0">
                  <Icon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                  <span className="truncate">{value}</span>
                </li>
              ))}
          </ul>
        ) : (
          <Empty>Ajoute ton email et ton téléphone.</Empty>
        )}
      </CollectionCard>
    </div>
  );
};
