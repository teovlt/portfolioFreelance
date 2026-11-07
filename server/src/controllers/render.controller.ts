import { Request, Response } from "express";
import { SITE_URL } from "../utils/site.js";
import { escapeHtml, experiencesSnapshot, homeSnapshot, loadProject, projectSnapshot } from "../utils/snapshot.js";

// Link previews (LinkedIn, WhatsApp, X, Slack...) don't run JavaScript: they
// only see the meta tags of the HTML they download. The site is a single
// page whose index.html carries the home page's tags, so every shared case
// study looked like the home page. nginx sends those URLs here instead; we
// take the site's index.html (served by the front container, SHELL_URL) and
// fill in the page's own title, description, image and canonical URL, plus
// an HTML copy of its content for crawlers that don't run JavaScript (see
// utils/snapshot.ts).

type PageMeta = { title: string; description: string; image?: string; imageAlt?: string; type?: string };
type Page = { meta?: PageMeta; snapshot: string };

const absoluteUrl = (value: string) => (value.startsWith("/") ? `${SITE_URL}${value}` : value);

// Tags the shell sets for the home page and that we replace
const REPLACED_META =
  /<meta\b[^>]*\b(?:name="description"|property="og:(?:type|title|description|url|image[^"]*)"|name="twitter:(?:title|description|image)")[^>]*>\s*/g;

const withSnapshot = (shell: string, snapshot: string) => shell.replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`);

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

// null: unknown project. undefined: a path this renderer doesn't handle.
// The home page keeps the meta written in index.html.
const pageFor = async (path: string): Promise<Page | null | undefined> => {
  if (path === "/") return { snapshot: await homeSnapshot() };
  if (path === "/parcours") {
    return {
      meta: {
        title: "Parcours — Téo Villet",
        description: "Formation et expériences de Téo Villet, développeur web freelance à Grenoble.",
      },
      snapshot: await experiencesSnapshot(),
    };
  }

  const slug = path.match(/^\/projects\/([^/]+)$/)?.[1];
  if (!slug) return undefined;
  const project = await loadProject(decodeURIComponent(slug).toLowerCase());
  if (!project) return null;
  return {
    meta: {
      title: `${project.title} — Téo Villet`,
      description: project.tagline?.fr ?? "",
      image: project.image,
      imageAlt: project.title,
      type: "article",
    },
    snapshot: projectSnapshot(project),
  };
};

export const renderPage = async (req: Request, res: Response) => {
  const shell = await getShell();
  // nginx falls back to the plain index.html on a 5xx
  if (!shell) return res.status(503).json({ message: "Shell unavailable" });

  const path = req.path.replace(/\/$/, "") || "/";
  const page = await pageFor(path);

  res.type("html").set("Cache-Control", "no-cache");
  // Unknown project: the app shows its not-found page, crawlers get a real 404
  if (page === null) return res.status(404).send(shell);
  if (!page) return res.send(shell);
  const filled = page.meta ? fillShell(shell, path, page.meta) : shell;
  res.send(withSnapshot(filled, page.snapshot));
};
