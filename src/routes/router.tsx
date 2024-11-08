import { Base } from "../pages/Base";
import { ErrorPage } from "../pages/ErrorPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

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
        element: <Base />,
      },
    ],
  },
]);
