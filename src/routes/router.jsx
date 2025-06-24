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
        <NotFound />
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
            <Projects />
            <Services />
            <ReviewsSection />
            <Contact />
          </>
        ),
      },
    ],
  },
]);
