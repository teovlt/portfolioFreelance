"use client";

import { LanguageChanger } from "@/components/LanguageChanger";
import { ThemeChanger } from "@/components/ThemeChanger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Mail, Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const suggestions = [
    {
      title: language === "fr" ? "Accueil" : "Home",
      description: language === "fr" ? "Retourner à la page d'accueil" : "Return to homepage",
      href: "/",
      icon: Home,
    },
    {
      title: language === "fr" ? "À propos" : "About",
      description: language === "fr" ? "En savoir plus sur moi" : "Learn more about me",
      href: "/#about",
      icon: Code2,
    },
    {
      title: language === "fr" ? "Projets" : "Projects",
      description: language === "fr" ? "Voir mes réalisations" : "View my work",
      href: "/#projects",
      icon: Search,
    },
    {
      title: language === "fr" ? "Contact" : "Contact",
      description: language === "fr" ? "Me contacter" : "Get in touch",
      href: "/#contact",
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-12 relative">
            <div className="text-[12rem] sm:text-[16rem] font-bold text-blue-100 dark:text-blue-900/30 leading-none select-none">404</div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
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
