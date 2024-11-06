import { Home } from "../pages/Home";
import { ErrorPage } from "../pages/ErrorPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { About } from "../pages/About";
import { Navbar } from "../components/Navbar";
import { PreviewProject } from "../components/PreviewProject";
import { Projects } from "../pages/Projects";

const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
            <About />
            <PreviewProject />
          </>
        ),
      },
      {
        path: "/projects",
        element: <Projects />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
