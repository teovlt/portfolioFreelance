import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider } from "./providers/theme-provider";
import "./lib/i18n";
import { Toaster } from "./components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Helmet } from "react-helmet";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Helmet>
        <meta
          title="Téo Villet - Développeur Freelance à Grenoble - Portfolio"
          name="description"
          content="Je suis Téo, développeur fullstack basé à Grenoble. Voici mon portfolio : projets, stack technique, expériences pro et contact rapide. N'hésitez pas à me contacter pour toute question ou proposition de collaboration !"
        />
      </Helmet>
      <RouterProvider router={router} />
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  </StrictMode>,
);
