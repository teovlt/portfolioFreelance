import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { usePublicContent } from "@/hooks/usePublicContent";
import type { ContactInfo } from "@/types/content";

const OWNER = "Téo Villet";

const LegalPage = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const fr = i18n.language !== "en";

  return (
    <section className="pt-32 pb-24 px-4">
      <Helmet>
        <title>{`${title} — ${OWNER}`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {fr ? "Retour au site" : "Back to the site"}
        </Link>
        <h1 className="text-4xl md:text-5xl mb-12">{title}</h1>
        <div className="space-y-10 text-muted-foreground leading-relaxed [&_h2]:text-xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_strong]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </section>
  );
};

// Only the filled-in lines are shown, so a field left empty in the admin
// doesn't print an empty label
const Details = ({ rows }: { rows: [string, string | undefined][] }) => (
  <dl className="grid sm:grid-cols-[180px_1fr] gap-x-6 gap-y-2">
    {rows
      .filter(([, value]) => value)
      .map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="font-medium text-foreground">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
  </dl>
);

export const LegalNotice = () => {
  const { i18n } = useTranslation();
  const fr = i18n.language !== "en";
  const { data: info } = usePublicContent<ContactInfo | null>("/contact", null);

  return (
    <LegalPage
      title={fr ? "Mentions légales" : "Legal notice"}
      description={fr ? "Mentions légales du site teovillet.fr." : "Legal notice for teovillet.fr."}
    >
      <div>
        <h2>{fr ? "Éditeur du site" : "Publisher"}</h2>
        <Details
          rows={[
            [fr ? "Nom" : "Name", fr ? `${OWNER}, entrepreneur individuel` : `${OWNER}, sole proprietor`],
            ["SIRET", info?.siret],
            [fr ? "Adresse" : "Address", info?.legalAddress],
            ["Email", info?.email],
            [fr ? "Téléphone" : "Phone", info?.phone],
            [fr ? "TVA" : "VAT", info?.vatMention],
          ]}
        />
      </div>

      <div>
        <h2>{fr ? "Directeur de la publication" : "Publication director"}</h2>
        <p>{OWNER}</p>
      </div>

      <div>
        <h2>{fr ? "Hébergement" : "Hosting"}</h2>
        <Details
          rows={[
            [fr ? "Hébergeur" : "Host", info?.hostName],
            [fr ? "Adresse" : "Address", info?.hostAddress],
          ]}
        />
      </div>

      <div>
        <h2>{fr ? "Propriété intellectuelle" : "Intellectual property"}</h2>
        <p>
          {fr
            ? `Les textes, le design et le code de ce site sont la propriété de ${OWNER}. Les captures et noms des projets présentés restent la propriété de leurs titulaires respectifs et sont montrés avec leur accord. Toute reproduction sans autorisation est interdite.`
            : `The text, design and code of this site belong to ${OWNER}. Screenshots and names of the projects shown remain the property of their respective owners and are displayed with their consent. Any reproduction without permission is prohibited.`}
        </p>
      </div>

      <div>
        <h2>{fr ? "Données personnelles" : "Personal data"}</h2>
        <p>
          {fr ? "Voir la " : "See the "}
          <Link to="/confidentialite">{fr ? "politique de confidentialité" : "privacy policy"}</Link>.
        </p>
      </div>
    </LegalPage>
  );
};

export const PrivacyPolicy = () => {
  const { i18n } = useTranslation();
  const fr = i18n.language !== "en";
  const { data: info } = usePublicContent<ContactInfo | null>("/contact", null);
  const email = info?.email;

  return (
    <LegalPage
      title={fr ? "Politique de confidentialité" : "Privacy policy"}
      description={fr ? "Comment teovillet.fr traite vos données personnelles." : "How teovillet.fr handles your personal data."}
    >
      <div>
        <h2>{fr ? "Responsable du traitement" : "Data controller"}</h2>
        <p>
          {OWNER}
          {email && (
            <>
              {" — "}
              <a href={`mailto:${email}`}>{email}</a>
            </>
          )}
        </p>
      </div>

      <div>
        <h2>{fr ? "Données collectées" : "Data collected"}</h2>
        <ul>
          <li>
            <strong>{fr ? "Formulaire de contact et réservation d'appel" : "Contact form and call booking"}</strong>
            {fr
              ? " : nom, email, téléphone si vous le donnez, message et créneau choisi. Ces informations me sont transmises par email via le service Formspree."
              : ": name, email, phone if you provide it, message and chosen slot. They are sent to me by email through the Formspree service."}
          </li>
          <li>
            <strong>{fr ? "Avis clients" : "Client reviews"}</strong>
            {fr
              ? " : nom, entreprise, site web, photo, note et commentaire. Ils sont enregistrés sur le serveur du site et publiés seulement après ma validation."
              : ": name, company, website, photo, rating and comment. They are stored on the site's server and only published after I approve them."}
          </li>
        </ul>
      </div>

      <div>
        <h2>{fr ? "Pourquoi" : "Why"}</h2>
        <p>
          {fr
            ? "Uniquement pour répondre à votre demande, préparer un devis et, pour les avis, les afficher sur le site avec votre accord. Vos données ne sont jamais vendues ni utilisées pour de la publicité."
            : "Only to answer your request, prepare a quote and, for reviews, display them on the site with your consent. Your data is never sold or used for advertising."}
        </p>
      </div>

      <div>
        <h2>{fr ? "Durée de conservation" : "Retention"}</h2>
        <p>
          {fr
            ? "Les demandes de contact sont conservées 3 ans après notre dernier échange. Les avis restent en ligne jusqu'à ce que vous demandiez leur retrait."
            : "Contact requests are kept for 3 years after our last exchange. Reviews stay online until you ask for their removal."}
        </p>
      </div>

      <div>
        <h2>{fr ? "Cookies" : "Cookies"}</h2>
        <p>
          {fr
            ? "Ce site n'utilise aucun cookie publicitaire ni outil de mesure d'audience. Seules vos préférences d'affichage (thème et langue) sont gardées dans votre navigateur."
            : "This site uses no advertising cookies or analytics. Only your display preferences (theme and language) are kept in your browser."}
        </p>
      </div>

      <div>
        <h2>{fr ? "Vos droits" : "Your rights"}</h2>
        <p>
          {fr
            ? "Vous pouvez demander l'accès, la rectification ou la suppression de vos données, ou vous opposer à leur traitement, en m'écrivant"
            : "You can ask to access, correct or delete your data, or object to its processing, by emailing me"}
          {email && (
            <>
              {" "}
              {fr ? "à" : "at"} <a href={`mailto:${email}`}>{email}</a>
            </>
          )}
          .{" "}
          {fr ? "Vous pouvez aussi saisir la " : "You can also file a complaint with the "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
            CNIL
          </a>
          .
        </p>
      </div>
    </LegalPage>
  );
};
