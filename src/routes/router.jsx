import { ErrorPage } from "../pages/ErrorPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Contact } from "@/pages/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skills } from "@/pages/Skills";
import { Experiences } from "@/pages/Experiences";
import { ReviewsSection } from "@/pages/Testimonials";

const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <>
        <ErrorPage />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
            <About />
            <Experiences />
            <Services />
            {/* <Skills /> */}
            <Projects />
            <ReviewsSection />
            <Contact />
          </>
        ),
      },
    ],
  },
]);
