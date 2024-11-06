import { Home } from "../pages/Home";
import { ErrorPage } from "../pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import { About } from "../pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
        <About />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);
