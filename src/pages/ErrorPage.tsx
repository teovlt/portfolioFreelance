import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{language === "fr" ? "Page non trouvée — Téo Villet" : "Page not found — Téo Villet"}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 */}
          <div className="mb-8 relative">
            <div className="text-[9rem] sm:text-[12rem] font-display font-bold text-border leading-none select-none">404</div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl mb-4">
              {language === "fr" ? "Page non trouvée" : "Page Not Found"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === "fr"
                ? "Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Mais ne vous inquiétez pas, vous pouvez explorer d'autres sections de mon portfolio !"
                : "Sorry, the page you're looking for doesn't exist or has been moved. But don't worry, you can explore other sections of my portfolio!"}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  {language === "fr" ? "Retour à l'accueil" : "Back to Home"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
