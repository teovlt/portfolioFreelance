import React, { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
// Import statique des composants de structure qui sont petits et nécessaires immédiatement
import NotFound from "../pages/ErrorPage";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ====================================================================
// 1. Définition des composants avec chargement paresseux (Lazy Loading)
// ====================================================================

// Composant qui sera vu immédiatement (Above the Fold)
const LazyHome = lazy(() => import("@/pages/Home").then((module) => ({ default: module.Home })));

// Composants qui peuvent attendre d'être rendus (Below the Fold)
const LazyAbout = lazy(() => import("@/pages/About").then((module) => ({ default: module.About })));
const LazyServices = lazy(() => import("@/pages/Services").then((module) => ({ default: module.Services })));
const LazyProjects = lazy(() => import("@/pages/Projects").then((module) => ({ default: module.Projects })));
const LazyContact = lazy(() => import("@/pages/Contact").then((module) => ({ default: module.Contact })));
const LazyExperiences = lazy(() => import("@/pages/Experiences").then((module) => ({ default: module.Experiences })));
const LazyReviewsSection = lazy(() => import("@/pages/Testimonials").then((module) => ({ default: module.ReviewsSection })));

// ====================================================================
// 2. Composant de Layout principal
// ====================================================================
const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// ====================================================================
// 3. Composant de Rendu Différé (l'astuce INP)
// ====================================================================

/**
 * Ce composant gère le chargement différé des sections de la page d'accueil
 * qui sont 'Below the Fold' (sous le pli).
 * Cela permet de libérer le Main Thread après le rendu initial (Home)
 * pour que la page soit réactive plus rapidement.
 */
const DeferredSections = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LazyAbout />
      <LazyExperiences />
      <LazyServices />
      <LazyProjects />
      <LazyReviewsSection />
      <LazyContact />
    </Suspense>
  );
};

// ====================================================================
// 4. Configuration du Routeur
// ====================================================================

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        // Le composant Home (Above the Fold) est rendu immédiatement
        // dans un Suspense. Le reste est différé.
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <LazyHome />

            <DeferredSections />
          </Suspense>
        ),
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);
