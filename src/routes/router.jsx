import { ErrorPage } from "../pages/ErrorPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "@/components/Footer";
import Ribbons from "@/components/ui/reactBits/animations/Ribbons";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Contact } from "@/pages/Contact";

const RootLayout = () => (
  <>
    {/* <Ribbons baseThickness={10} colors={["#3b82f6"]} speedMultiplier={0.42} maxAge={500} enableFade={true} enableShaderEffect={true} /> */}
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
            <Services />
            <Projects />
            <Contact />
          </>
        ),
      },
    ],
  },
]);
