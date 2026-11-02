import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Served from our own domain rather than Google Fonts, which would hand every
// visitor's IP address to Google
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider } from "./providers/auth-provider";
import "./lib/i18n";
import { Toaster } from "./components/ui/sonner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <HelmetProvider>
          {/* Title of pages that don't set their own (e.g. the admin) */}
          <Helmet defaultTitle="Téo Villet - Développeur Fullstack Freelance à Grenoble" />
          {/* Entrance animations fall back to plain fades for reduced-motion users */}
          <MotionConfig reducedMotion="user">
            <RouterProvider router={router} />
          </MotionConfig>
          <Toaster />
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
