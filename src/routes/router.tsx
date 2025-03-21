import { Base } from "../pages/Base";
import { ErrorPage } from "../pages/ErrorPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "@/components/Footer";
import Ribbons from "@/components/ui/reactBits/animations/Ribbons";

const RootLayout = () => (
  <>
    <Ribbons
      baseThickness={10}
      colors={["#00d8ff"]}
      speedMultiplier={0.42}
      maxAge={500}
      enableFade={true}
      enableShaderEffect={true}
    ></Ribbons>
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
        element: <Base />,
      },
    ],
  },
]);
