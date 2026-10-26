import NotFound from "../pages/ErrorPage";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Contact } from "@/pages/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Experiences } from "@/pages/Experiences";
import { ProjectCaseStudy } from "@/pages/ProjectCaseStudy";
import { PackageProvider } from "@/providers/package-provider";
import { scrollToId } from "@/utils/scrollToSection";
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminProjects } from "@/pages/admin/AdminProjects";
import { AdminProjectForm } from "@/pages/admin/AdminProjectForm";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      scrollToId(hash.slice(1), "instant");
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

const RootLayout = () => (
  <PackageProvider>
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
            <About />
            <Experiences />
            <Services />
            <Projects />
            <Contact />
          </>
        ),
      },
      {
        path: "/projects/:slug",
        element: <ProjectCaseStudy />,
      },
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
    ],
  },
]);
