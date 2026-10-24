import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Eye, EyeOff, KeyRound, Lock, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeChanger } from "@/components/ThemeChanger";
import { useAuth } from "@/providers/auth-provider";
import { ApiError } from "@/lib/api";

const BackToSite = ({ className }: { className?: string }) => (
  <Button asChild variant="outline" className={className}>
    <Link to="/">
      <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
      Retourner au portfolio
    </Link>
  </Button>
);

export const AdminLogin = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return null;

  if (isAuthenticated) {
    const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin/projects";
    return <Navigate to={redirectTo} replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(identifier, password);
      navigate("/admin/projects", { replace: true });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Connexion impossible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-background">
      {/* Left — "you're backstage" panel */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-ink text-ink-foreground grain p-12 xl:p-16">
        <div aria-hidden className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-48 right-[-6rem] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <Link to="/" className="font-serif italic text-2xl hover:opacity-80 transition-opacity">
            Téo Villet
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-foreground/15 px-3 py-1 text-xs font-medium text-ink-foreground/70">
            <Lock className="h-3 w-3" />
            Espace privé
          </span>
        </div>

        <div className="relative max-w-lg">
          <p className="eyebrow text-ink-foreground/50 mb-6">Coulisses du portfolio</p>
          <h1 className="text-5xl xl:text-6xl font-display font-bold tracking-tight leading-[1.05]">
            Ici, ce sont <span className="font-serif italic font-medium text-accent">les coulisses.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-foreground/70 leading-relaxed">
            Cet espace sert uniquement à Téo pour gérer les projets et le contenu du site. Si vous n'êtes pas Téo, vous n'êtes pas au bon endroit — pas
            de souci, il suffit de faire demi-tour.
          </p>

          <Button asChild size="lg" className="group mt-10 rounded-full bg-ink-foreground text-ink hover:bg-ink-foreground/90">
            <Link to="/">
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Faire demi-tour vers le portfolio
            </Link>
          </Button>
        </div>

        <div className="relative grid grid-cols-3 gap-6 border-t border-ink-foreground/15 pt-8 text-sm">
          {[
            { icon: ShieldCheck, title: "Accès restreint", text: "Un seul compte autorisé" },
            { icon: KeyRound, title: "Session sécurisée", text: "Jeton signé, 7 jours" },
            { icon: Lock, title: "Rien à voir ici", text: "Le site est par là ←" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon className="h-4 w-4 text-accent mb-3" />
              <p className="font-semibold">{title}</p>
              <p className="text-ink-foreground/55 mt-0.5">{text}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Right — sign-in form */}
      <main className="relative flex flex-col px-4 sm:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <BackToSite className="group" />
          <ThemeChanger />
        </div>

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-sm">
            {/* Mobile-only notice, the left panel carries it on desktop */}
            <div className="lg:hidden mb-10 rounded-2xl border border-border bg-muted/50 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Lock className="h-4 w-4 text-primary" />
                Espace réservé à Téo
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                Si vous n'êtes pas Téo, vous n'êtes pas au bon endroit.{" "}
                <Link to="/" className="font-medium text-foreground underline underline-offset-4">
                  Retour au portfolio
                </Link>
              </p>
            </div>

            <p className="eyebrow mb-4">Connexion</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Bon retour, <span className="font-serif italic font-medium text-primary">Téo.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Connecte-toi pour gérer les projets du portfolio.</p>

            <form onSubmit={onSubmit} className="mt-10 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="identifier">Email ou nom d'utilisateur</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="identifier"
                    autoComplete="username"
                    autoFocus
                    required
                    placeholder="teo ou teo@exemple.fr"
                    className="h-12 rounded-xl pl-10 bg-card"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="h-12 rounded-xl pl-10 pr-11 bg-card"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" className="group w-full" disabled={isSubmitting}>
                {isSubmitting ? "Connexion..." : "Se connecter"}
                {!isSubmitting && <ArrowRight className="transition-transform group-hover:translate-x-0.5" />}
              </Button>
            </form>

            <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Accès protégé · réservé au propriétaire du site
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Téo Villet</p>
      </main>
    </div>
  );
};
