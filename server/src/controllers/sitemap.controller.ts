import { Request, Response } from "express";
import { Project } from "../models/Project.js";

const SITE_URL = "https://www.teovillet.fr";

// Pages that always exist; project case studies are added from the database
// so a new or hidden project shows up (or disappears) without a redeploy
const staticPages = [
  { path: "/", priority: "1.0" },
  { path: "/parcours", priority: "0.5" },
];

export const getSitemap = async (req: Request, res: Response) => {
  const projects = await Project.find({ visible: true }).select("slug updatedAt").lean();

  const urls = [
    ...staticPages.map(({ path, priority }) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <priority>${priority}</priority>\n  </url>`),
    ...projects.map(
      ({ slug, updatedAt }) =>
        `  <url>\n    <loc>${SITE_URL}/projects/${encodeURIComponent(slug)}</loc>\n    <lastmod>${new Date(updatedAt).toISOString().slice(0, 10)}</lastmod>\n    <priority>0.7</priority>\n  </url>`,
    ),
  ];

  res
    .type("application/xml")
    .set("Cache-Control", "public, max-age=3600")
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
};
