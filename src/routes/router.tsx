import NotFound from "../pages/ErrorPage";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Contact } from "@/pages/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Process } from "@/pages/Process";
import { Faq } from "@/pages/Faq";
import { PackageProvider } from "@/providers/package-provider";
import { scrollToHash } from "@/utils/scrollToSection";

// Only the home page ships in the main bundle. The other pages, and above
// all the admin, are fetched when first visited, so visitors don't download
// a dashboard they'll never see.
const page =
  <T,>(load: () => Promise<T>, pick: (module: T) => React.ComponentType) =>
  async () => ({ Component: pick(await load()) });

const admin = {
  login: page(
    () => import("@/pages/admin/AdminLogin"),
    (m) => m.AdminLogin,
  ),
  layout: page(
    () => import("@/pages/admin/AdminLayout"),
    (m) => m.AdminLayout,
  ),
  dashboard: page(
    () => import("@/pages/admin/AdminDashboard"),
    (m) => m.AdminDashboard,
  ),
  bookings: page(
    () => import("@/pages/admin/AdminBookings"),
    (m) => m.AdminBookings,
  ),
  messages: page(
    () => import("@/pages/admin/AdminMessages"),
    (m) => m.AdminMessages,
  ),
  projects: page(
    () => import("@/pages/admin/AdminProjects"),
    (m) => m.AdminProjects,
  ),
  projectForm: page(
    () => import("@/pages/admin/AdminProjectForm"),
    (m) => m.AdminProjectForm,
  ),
  reviews: page(
    () => import("@/pages/admin/AdminReviews"),
    (m) => m.AdminReviews,
  ),
  packages: page(
    () => import("@/pages/admin/AdminPackages"),
    (m) => m.AdminPackages,
  ),
  experiences: page(
    () => import("@/pages/admin/AdminExperiences"),
    (m) => m.AdminExperiences,
  ),
  faqs: page(
    () => import("@/pages/admin/AdminFaqs"),
    (m) => m.AdminFaqs,
  ),
  photos: page(
    () => import("@/pages/admin/AdminPhotos"),
    (m) => m.AdminPhotos,
  ),
  contact: page(
    () => import("@/pages/admin/AdminContact"),
    (m) => m.AdminContact,
  ),
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return scrollToHash(hash.slice(1));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

// Socials moved into the contact page; keeps ?edit / ?new links working
const SocialsRedirect = () => {
  const { search } = useLocation();
  return <Navigate to={`/admin/contact${search}`} replace />;
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

const RootLayout = () => {
  const { t } = useTranslation();
  return (
    <PackageProvider>
      <Canonical />
      <ScrollToTop />
      {/* First thing a keyboard user reaches: jumps past the navbar */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-background"
      >
        {t("a11y.skipToContent")}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </PackageProvider>
  );
};

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
        lazy: page(
          () => import("@/pages/ProjectCaseStudy"),
          (m) => m.ProjectCaseStudy,
        ),
      },
      {
        path: "/parcours",
        lazy: page(
          () => import("@/pages/Experiences"),
          (m) => m.Experiences,
        ),
      },
      {
        path: "/mentions-legales",
        lazy: page(
          () => import("@/pages/Legal"),
          (m) => m.LegalNotice,
        ),
      },
      {
        path: "/confidentialite",
        lazy: page(
          () => import("@/pages/Legal"),
          (m) => m.PrivacyPolicy,
        ),
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin/login",
    lazy: admin.login,
  },
  {
    path: "/admin",
    lazy: admin.layout,
    children: [
      { index: true, lazy: admin.dashboard },
      { path: "bookings", lazy: admin.bookings },
      { path: "messages", lazy: admin.messages },
      { path: "projects", lazy: admin.projects },
      { path: "projects/new", lazy: admin.projectForm },
      { path: "projects/:slug/edit", lazy: admin.projectForm },
      { path: "reviews", lazy: admin.reviews },
      { path: "packages", lazy: admin.packages },
      { path: "experiences", lazy: admin.experiences },
      { path: "faqs", lazy: admin.faqs },
      { path: "photos", lazy: admin.photos },
      { path: "socials", element: <SocialsRedirect /> },
      { path: "contact", lazy: admin.contact },
    ],
  },
]);
