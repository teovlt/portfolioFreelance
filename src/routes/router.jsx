import NotFound from "../pages/ErrorPage";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Contact } from "@/pages/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Experiences } from "@/pages/Experiences";
import { Process } from "@/pages/Process";
import { Faq } from "@/pages/Faq";
import { ProjectCaseStudy } from "@/pages/ProjectCaseStudy";
import { LegalNotice, PrivacyPolicy } from "@/pages/Legal";
import { PackageProvider } from "@/providers/package-provider";
import { scrollToHash } from "@/utils/scrollToSection";
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminProjects } from "@/pages/admin/AdminProjects";
import { AdminProjectForm } from "@/pages/admin/AdminProjectForm";
import { AdminReviews } from "@/pages/admin/AdminReviews";
import { AdminPhotos } from "@/pages/admin/AdminPhotos";
import { AdminSocials } from "@/pages/admin/AdminSocials";
import { AdminPackages } from "@/pages/admin/AdminPackages";
import { AdminExperiences } from "@/pages/admin/AdminExperiences";
import { AdminContact } from "@/pages/admin/AdminContact";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return scrollToHash(hash.slice(1));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

const SITE_URL = "https://www.teovillet.fr";

// One canonical per page: a single static one in index.html told Google every
// case study was a duplicate of the home page
const Canonical = () => {
  const { pathname } = useLocation();
  return (
    <Helmet>
      <link rel="canonical" href={`${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`} />
    </Helmet>
  );
};

const RootLayout = () => (
  <PackageProvider>
    <Canonical />
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
  </PackageProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
            <Services />
            <Process />
            <Projects />
            <About />
            <Faq />
            <Contact />
          </>
        ),
      },
      {
        path: "/projects/:slug",
        element: <ProjectCaseStudy />,
      },
      { path: "/parcours", element: <Experiences /> },
      { path: "/mentions-legales", element: <LegalNotice /> },
      { path: "/confidentialite", element: <PrivacyPolicy /> },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "projects", element: <AdminProjects /> },
      { path: "projects/new", element: <AdminProjectForm /> },
      { path: "projects/:slug/edit", element: <AdminProjectForm /> },
      { path: "reviews", element: <AdminReviews /> },
      { path: "packages", element: <AdminPackages /> },
      { path: "experiences", element: <AdminExperiences /> },
      { path: "photos", element: <AdminPhotos /> },
      { path: "socials", element: <AdminSocials /> },
      { path: "contact", element: <AdminContact /> },
    ],
  },
]);
