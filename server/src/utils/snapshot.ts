import { areaText, faqsOf, type Landing, landings } from "../content/landings.js";
import { ContactInfo } from "../models/ContactInfo.js";
import { Experience } from "../models/Experience.js";
import { Faq } from "../models/Faq.js";
import { Package } from "../models/Package.js";
import { Project } from "../models/Project.js";
import { Review, ReviewStatus } from "../models/Review.js";

// The site is a React app whose content comes from the API, so the HTML it
// ships is an empty <div id="root">. Google runs the JavaScript and sees the
// page, but most other crawlers (Bing at times, ChatGPT, Perplexity, Claude,
// link previews) only read the HTML. These snapshots put the same content, in
// French, as plain HTML inside #root. React replaces it as soon as it starts,
// so visitors only ever see the real page; it's visually hidden meanwhile so
// the unstyled text doesn't flash before the app paints.

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Text = { fr?: string | null; en?: string | null } | null | undefined;
const fr = (text: Text) => text?.fr || text?.en || "";

// Builds markup from escaped values: every interpolated value goes through
// escapeHtml unless it is markup built by html`` itself
type Raw = { __html: string };
const raw = (value: string): Raw => ({ __html: value });
const html = (strings: TemplateStringsArray, ...values: (string | number | Raw | Raw[] | null | undefined | false)[]) =>
  raw(
    strings.reduce((out, chunk, i) => {
      const value = values[i - 1];
      const rendered =
        value == null || value === false
          ? ""
          : Array.isArray(value)
            ? value.map((v) => v.__html).join("")
            : typeof value === "object"
              ? value.__html
              : escapeHtml(String(value));
      return out + rendered + chunk;
    }),
  );

const list = <T>(items: T[], render: (item: T) => Raw) => items.map(render);

// Same technique as Tailwind's sr-only, inline because the snapshot is read
// before any stylesheet applies
const HIDDEN = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0";

const wrap = (body: Raw) => `<div data-snapshot style="${HIDDEN}">${body.__html}</div>`;

const nav = html`<nav>
  <a href="/">Accueil</a> <a href="/#services-section">Tarifs</a> <a href="/#projects-section">Projets</a>
  <a href="/parcours">Parcours</a> <a href="/#contact-section">Contact</a>
</nav>`;

const footer = html`<footer>
  <p>Téo Villet, développeur web freelance à Grenoble. Sites vitrines, applications et outils sur mesure.</p>
  <p>Sites internet pour : ${list(landings, (l) => html`<a href="/${l.slug}">${l.trade}</a> `)}</p>
  <a href="/mentions-legales">Mentions légales</a> <a href="/confidentialite">Confidentialité</a>
</footer>`;

const priceOf = (p: { pricing?: string | null; price?: string | null; monthlyPrice?: string | null }) =>
  p.pricing === "subscription" ? (p.monthlyPrice ? `${p.monthlyPrice}/mois` : "") : p.price || "";

export const homeSnapshot = async () => {
  const [contact, packages, projects, reviews, faqs] = await Promise.all([
    ContactInfo.findOne().lean(),
    Package.find({ visible: true }).sort({ order: 1 }).lean(),
    Project.find({ visible: { $ne: false } }).sort({ order: 1 }).lean(),
    Review.find({ status: ReviewStatus.PUBLISHED }).sort({ order: 1 }).lean(),
    Faq.find({ visible: true }).sort({ order: 1 }).lean(),
  ]);

  // FAQ answers can quote {{tarifs}} / {{delais}}, as on the site (usePackagePricing)
  const prices = packages
    .filter((p) => priceOf(p))
    .map((p) => `${fr(p.title)} : dès ${priceOf(p)}.`)
    .join(" ");
  const durations = packages
    .filter((p) => fr(p.duration))
    .map((p) => `${fr(p.title)} : ${fr(p.duration)}.`)
    .join(" ");
  const answer = (text: string) => text.replace(/{{\s*tarifs\s*}}/g, prices).replace(/{{\s*delais\s*}}/g, durations).trim();

  return wrap(html`${nav}
<main>
  <section>
    <h1>Des sites qui vous ramènent des clients.</h1>
    <p>Développeur web freelance à Grenoble. Je crée votre site sur mesure, du premier appel à la mise en ligne, pour les restaurants, artisans, commerçants, indépendants et associations.</p>
    <a href="/#contact-section">Réserver un appel gratuit</a>
  </section>

  ${packages.length > 0 &&
  html`<section>
    <h2>Tarifs</h2>
    ${list(
      packages,
      (p) => html`<article>
        <h3>${fr(p.title)}</h3>
        <p>${fr(p.description)}</p>
        ${priceOf(p) && html`<p>À partir de ${priceOf(p)}</p>`}
        ${fr(p.duration) && html`<p>Délai : ${fr(p.duration)}</p>`}
        ${p.deliverables.length > 0 && html`<ul>${list(p.deliverables, (d) => html`<li>${fr(d)}</li>`)}</ul>`}
      </article>`,
    )}
  </section>`}

  <section>
    <h2>Comment ça se passe</h2>
    <ol>
      <li>On s'appelle (30 min, gratuit) : vous me parlez de votre activité et de ce que vous attendez du site.</li>
      <li>Je vous envoie un devis sous 24 h, avec le détail de chaque poste et le prix final.</li>
      <li>Je construis le site (1 à 8 semaines) : vous validez d'abord la maquette, puis suivez l'avancement sur un lien de test.</li>
      <li>Mise en ligne : je publie le site et vous montre comment modifier vos contenus.</li>
    </ol>
  </section>

  ${projects.length > 0 &&
  html`<section>
    <h2>Mes réalisations</h2>
    <ul>
      ${list(projects, (p) => html`<li><a href="/projects/${encodeURIComponent(p.slug)}">${p.title}</a> : ${fr(p.tagline)}</li>`)}
    </ul>
  </section>`}

  ${reviews.length > 0 &&
  html`<section>
    <h2>Avis clients</h2>
    ${list(
      reviews,
      (r) => html`<blockquote>
        <p>${fr(r.comment)}</p>
        <footer>${r.name}${fr(r.company) && html`, ${fr(r.company)}`} (${r.rating}/5)</footer>
      </blockquote>`,
    )}
  </section>`}

  <section>
    <h2>À propos</h2>
    <p>Je suis Téo, développeur web freelance à Grenoble. Depuis 4 ans, je crée des sites et des outils pour des indépendants, des petites entreprises et des laboratoires de recherche. Vous parlez directement à la personne qui construit votre site : pas d'agence, pas de sous-traitance.</p>
    <a href="/parcours">Voir mon parcours complet</a>
  </section>

  ${faqs.length > 0 &&
  html`<section>
    <h2>Questions fréquentes</h2>
    <dl>${list(faqs, (f) => html`<dt>${fr(f.question)}</dt><dd>${answer(fr(f.answer))}</dd>`)}</dl>
  </section>`}

  <section>
    <h2>Contact</h2>
    <p>Réservez un appel gratuit, sans engagement. Je vous envoie ensuite un devis détaillé sous 24 h.</p>
    ${contact?.email && html`<p>Email : <a href="mailto:${contact.email}">${contact.email}</a></p>`}
    ${contact?.phone && html`<p>Téléphone : <a href="tel:${contact.phone.replace(/[^+\d]/g, "")}">${contact.phone}</a></p>`}
    <p>${fr(contact?.location) || "Grenoble, France"}</p>
  </section>
</main>
${footer}`);
};

type ProjectDoc = NonNullable<Awaited<ReturnType<typeof loadProject>>>;
export const loadProject = (slug: string) => Project.findOne({ slug, visible: { $ne: false } }).lean();

export const projectSnapshot = (p: ProjectDoc) =>
  wrap(html`${nav}
<main>
  <article>
    <h1>${p.title}</h1>
    <p>${fr(p.tagline)}</p>
    <p>Rôle : ${fr(p.role)}. Période : ${fr(p.timeline)}.</p>
    ${p.liveLink && html`<p><a href="${p.liveLink}">Voir le site en ligne</a></p>`}
    <h2>Le projet</h2>
    <p>${fr(p.overview)}</p>
    <h2>Le défi</h2>
    <p>${fr(p.challenge)}</p>
    <h2>L'approche</h2>
    <p>${fr(p.approach)}</p>
    ${p.features.length > 0 && html`<h2>Fonctionnalités</h2><ul>${list(p.features, (f) => html`<li>${fr(f)}</li>`)}</ul>`}
    ${p.stack.length > 0 && html`<p>Technologies : ${p.stack.join(", ")}</p>`}
  </article>
  <p><a href="/#contact-section">Un projet similaire ? Réservez un appel gratuit</a></p>
</main>
${footer}`);

export const experiencesSnapshot = async () => {
  const experiences = await Experience.find({ visible: true }).sort({ order: 1 }).lean();
  return wrap(html`${nav}
<main>
  <h1>Mon parcours</h1>
  ${list(
    experiences,
    (e) => html`<article>
      <h2>${fr(e.title)} · ${fr(e.org)}</h2>
      <p>${fr(e.date)} · ${fr(e.location)}</p>
      <p>${fr(e.description)}</p>
      ${e.highlights.length > 0 && html`<ul>${list(e.highlights, (h) => html`<li>${fr(h)}</li>`)}</ul>`}
    </article>`,
  )}
</main>
${footer}`);
};

export const landingSnapshot = async (l: Landing) => {
  const packages = await Package.find({ visible: true }).sort({ order: 1 }).lean();
  return wrap(html`${nav}
<main>
  <section>
    <p>${l.eyebrow}</p>
    <h1>${l.titleStart} ${l.titleHighlight}</h1>
    <p>${l.intro}</p>
    <a href="#contact-section">Réserver un appel gratuit</a>
  </section>
  <section>
    <h2>Ce qui vous freine aujourd'hui</h2>
    ${list(l.pains, (p) => html`<article><h3>${p.title}</h3><p>${p.text}</p></article>`)}
  </section>
  <section>
    <h2>Ce que contient votre site</h2>
    <ul>${list(l.features, (f) => html`<li>${f}</li>`)}</ul>
    <p>${areaText(l)}</p>
  </section>
  <section>
    <h2>Les pages d'un site type</h2>
    <dl>${list(l.pages, (p) => html`<dt>${p.name}</dt><dd>${p.text}</dd>`)}</dl>
  </section>
  ${packages.length > 0 &&
  html`<section>
    <h2>Tarifs</h2>
    <ul>${list(packages, (p) => html`<li>${fr(p.title)}${priceOf(p) && html` : à partir de ${priceOf(p)}`}${fr(p.duration) && html`, ${fr(p.duration)}`}</li>`)}</ul>
  </section>`}
  <section>
    <h2>Questions fréquentes</h2>
    <dl>${list(faqsOf(l), (f) => html`<dt>${f.q}</dt><dd>${f.a}</dd>`)}</dl>
  </section>
  <section id="contact-section">
    <h2>Parlons de votre projet</h2>
    <p>Un appel de 30 minutes, gratuit et sans engagement, puis un devis détaillé sous 24 h.</p>
    <a href="/#contact-section">Réserver un appel</a>
  </section>
</main>
${footer}`);
};
