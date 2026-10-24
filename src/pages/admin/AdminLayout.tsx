import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, FolderKanban, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeChanger } from "@/components/ThemeChanger";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

const navItems = [
  { to: "/admin/projects", label: "Projets", icon: FolderKanban, end: true },
  { to: "/admin/projects/new", label: "Nouveau projet", icon: Plus, end: true },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
    isActive ? "bg-ink-foreground/10 text-ink-foreground" : "text-ink-foreground/60 hover:text-ink-foreground hover:bg-ink-foreground/5",
  );

export const AdminLayout = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  const initials = (user?.username ?? "?").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-muted/40 lg:grid lg:grid-cols-[264px_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex sticky top-0 h-screen flex-col border-r border-ink-foreground/10 bg-ink text-ink-foreground grain overflow-hidden">
        <div aria-hidden className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative px-6 pt-7 pb-8">
          <Link to="/admin/projects" className="flex items-baseline gap-2">
            <span className="font-serif italic text-2xl">Téo Villet</span>
            <span className="rounded-md bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">Admin</span>
          </Link>
        </div>

        <nav className="relative flex-1 px-3 space-y-1">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-foreground/40">Contenu</p>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}

          <p className="px-3 pt-6 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-foreground/40">Site</p>
          <Link to="/" className={navLinkClass({ isActive: false })}>
            <ArrowUpRight className="h-4 w-4" />
            Retour au site
          </Link>
        </nav>

        <div className="relative m-3 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.username}</p>
              <p className="truncate text-xs text-ink-foreground/50">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              aria-label="Se déconnecter"
              title="Se déconnecter"
              className="rounded-lg p-2 text-ink-foreground/60 hover:bg-ink-foreground/10 hover:text-ink-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-8">
            <Link to="/admin/projects" className="lg:hidden flex items-baseline gap-2">
              <span className="font-serif italic text-xl">Téo Villet</span>
              <span className="rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground dark:text-accent">
                Admin
              </span>
            </Link>
            <p className="hidden lg:block text-sm text-muted-foreground">
              Bonjour <span className="font-semibold text-foreground">{user?.username}</span>, prêt à mettre le portfolio à jour ?
            </p>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                <Link to="/">
                  <ArrowUpRight />
                  Voir le site
                </Link>
              </Button>
              <ThemeChanger />
              <Button variant="ghost" size="sm" onClick={logout} className="lg:hidden" aria-label="Se déconnecter">
                <LogOut />
              </Button>
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="lg:hidden flex gap-1 overflow-x-auto px-4 pb-3">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex flex-shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted",
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
            <Link to="/" className="flex flex-shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted">
              <ArrowUpRight className="h-4 w-4" />
              Site
            </Link>
          </nav>
        </header>

        <main className="flex-1 px-4 sm:px-8 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
