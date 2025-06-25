import NotFound from "../pages/ErrorPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Contact } from "@/pages/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Experiences } from "@/pages/Experiences";
import { ReviewsSection } from "@/pages/Testimonials";

const RootLayout = () => (
  <>
    <title>Téo VILLET | Portfolio</title>
    <meta
      name="description"
      content="Je suis Téo, développeur fullstack basé à Grenoble. Voici mon portfolio : projets, stack technique, expériences pro et contact rapide.
          N'hésitez pas à me contacter pour toute question ou proposition de collaboration !"
    />
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  </>
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
            <Projects />
            <Services />
            <ReviewsSection />
            <Contact />
          </>
        ),
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);
