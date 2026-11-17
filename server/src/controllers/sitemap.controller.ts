import { Request, Response } from "express";
import { Project } from "../models/Project.js";
import { landings } from "../content/landings.js";
import { SITE_URL } from "../utils/site.js";

// Last change of the static pages: the day the server started, i.e. the last
// deploy, unless it passes its own date (SITE_UPDATED_AT=2026-11-17). Set once
// at start rather than on each request, so Google isn't told every page
// changes daily
export const STATIC_LASTMOD = (() => {
  const fromEnv = process.env.SITE_UPDATED_AT;
  const date = fromEnv && !Number.isNaN(Date.parse(fromEnv)) ? new Date(fromEnv) : new Date();
  return date.toISOString().slice(0, 10);
})();

// Pages that always exist; project case studies are added from the database
// so a new or hidden project shows up (or disappears) without a redeploy
const staticPages = [
  { path: "/", priority: "1.0" },
  { path: "/parcours", priority: "0.5" },
  // One page per kind of client, aimed at local searches
  ...landings.map(({ slug }) => ({ path: `/${slug}`, priority: "0.8" })),
];

export const getSitemap = async (req: Request, res: Response) => {
  // Same filter as the public API: projects saved before `visible` existed are published
  const projects = await Project.find({ visible: { $ne: false } }).select("slug updatedAt").lean();

  const urls = [
    ...staticPages.map(({ path, priority }) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${STATIC_LASTMOD}</lastmod>\n    <priority>${priority}</priority>\n  </url>`),
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
