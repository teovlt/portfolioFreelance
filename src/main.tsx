import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider } from "./providers/auth-provider";
import "./lib/i18n";
import { Toaster } from "./components/ui/sonner";
import { Helmet } from "react-helmet";
import { MotionConfig } from "framer-motion";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Helmet>
          <title>Téo Villet</title>
          <meta name="description" content="Portfolio Téo Villet" />
        </Helmet>
        {/* Entrance animations fall back to plain fades for reduced-motion users */}
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
