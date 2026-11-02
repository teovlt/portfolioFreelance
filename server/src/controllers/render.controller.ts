import { Request, Response } from "express";
import { Project } from "../models/Project.js";
import { SITE_URL } from "../utils/site.js";

// Link previews (LinkedIn, WhatsApp, X, Slack...) don't run JavaScript: they
// only see the meta tags of the HTML they download. The site is a single
// page whose index.html carries the home page's tags, so every shared case
// study looked like the home page. nginx sends those URLs here instead; we
// take the site's index.html (served by the front container, SHELL_URL) and
// fill in the page's own title, description, image and canonical URL.

type PageMeta = { title: string; description: string; image?: string; imageAlt?: string; type?: string };

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const absoluteUrl = (value: string) => (value.startsWith("/") ? `${SITE_URL}${value}` : value);

// Tags the shell sets for the home page and that we replace
const REPLACED_META =
  /<meta\b[^>]*\b(?:name="description"|property="og:(?:type|title|description|url|image[^"]*)"|name="twitter:(?:title|description|image)")[^>]*>\s*/g;

const fillShell = (shell: string, path: string, meta: PageMeta) => {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = escapeHtml(`${SITE_URL}${path}`);
  const image = meta.image ? escapeHtml(absoluteUrl(meta.image)) : `${SITE_URL}/og-image.jpg`;
  const tags = [
    // data-rh: the page's own Helmet tags replace these once the app runs
    `<meta data-rh="true" name="description" content="${description}" />`,
    `<link data-rh="true" rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.type ?? "website"}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    meta.imageAlt ? `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />` : "",
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].filter(Boolean);

  return shell
    .replace(REPLACED_META, "")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
};

const getShell = async () => {
  const shellUrl = process.env.SHELL_URL;
  if (!shellUrl) return null;
  // Fetched on every request rather than cached: after a deploy the shell
  // points at new asset filenames, and a stale copy would load missing files
  const res = await fetch(shellUrl);
  return res.ok ? res.text() : null;
};

// Pages whose meta don't come from the database
const staticPages: Record<string, PageMeta> = {
  "/parcours": {
    title: "Parcours — Téo Villet",
    description: "Formation et expériences de Téo Villet, développeur web freelance à Grenoble.",
  },
};

const metaFor = async (path: string): Promise<PageMeta | null | undefined> => {
  if (staticPages[path]) return staticPages[path];

  const slug = path.match(/^\/projects\/([^/]+)$/)?.[1];
  if (!slug) return undefined;
  const project = await Project.findOne({ slug: decodeURIComponent(slug).toLowerCase(), visible: { $ne: false } }).lean();
  if (!project) return null;
  return {
    title: `${project.title} — Téo Villet`,
    description: project.tagline?.fr ?? "",
    image: project.image,
    imageAlt: project.title,
    type: "article",
  };
};

export const renderPage = async (req: Request, res: Response) => {
  const shell = await getShell();
  // nginx falls back to the plain index.html on a 5xx
  if (!shell) return res.status(503).json({ message: "Shell unavailable" });

  const path = req.path.replace(/\/$/, "") || "/";
  const meta = await metaFor(path);

  res.type("html").set("Cache-Control", "no-cache");
  // Unknown project: the app shows its not-found page, crawlers get a real 404
  if (meta === null) return res.status(404).send(shell);
  res.send(meta ? fillShell(shell, path, meta) : shell);
};
