import { Router } from "express";
import { areaText, findLanding, landingStructuredData, landings } from "../content/landings.js";

// Pages per kind of client (see content/landings.ts). Static content: no
// database, cached by browsers for an hour
export const landingRouter = Router();

landingRouter.get("/", (req, res) => {
  res.set("Cache-Control", "public, max-age=3600").json(landings.map(({ slug, trade }) => ({ slug, trade })));
});

landingRouter.get("/:slug", (req, res) => {
  const landing = findLanding(req.params.slug);
  if (!landing) return res.status(404).json({ message: "Not found" });
  res.set("Cache-Control", "public, max-age=3600").json({
    ...landing,
    area: areaText(landing.audience),
    structuredData: landingStructuredData(landing),
    others: landings.filter((l) => l.slug !== landing.slug).map(({ slug, trade }) => ({ slug, trade })),
  });
});
