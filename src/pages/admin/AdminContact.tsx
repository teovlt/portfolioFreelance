import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, LocalizedField } from "@/components/admin/fields";
import { apiRequest, ApiError } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import type { ContactInfo } from "@/types/content";
import { SocialsSection } from "./AdminSocials";

const schema = z.object({
  email: z.string().email("Email invalide"),
  phone: z.string(),
  whatsapp: z.string(),
  location: z.object({ fr: z.string().min(1, "Requis"), en: z.string().min(1, "Requis") }),
  locationUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  siret: z.string(),
  legalAddress: z.string(),
  vatMention: z.string(),
  hostName: z.string(),
  hostAddress: z.string(),
});

type FormValues = z.infer<typeof schema>;

const emptyValues: FormValues = {
  email: "",
  phone: "",
  whatsapp: "",
  location: { fr: "", en: "" },
  locationUrl: "",
  siret: "",
  legalAddress: "",
  vatMention: "",
  hostName: "",
  hostAddress: "",
};

const toValues = (info: ContactInfo): FormValues => ({
  email: info.email,
  phone: info.phone,
  whatsapp: info.whatsapp ?? "",
  location: info.location,
  locationUrl: info.locationUrl,
  siret: info.siret ?? "",
  legalAddress: info.legalAddress ?? "",
  vatMention: info.vatMention ?? "",
  hostName: info.hostName ?? "",
  hostAddress: info.hostAddress ?? "",
});

export const AdminContact = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: emptyValues });

  const [email, phone, location] = watch(["email", "phone", "location"]);

  useEffect(() => {
    apiRequest<ContactInfo | null>("/contact")
      .then((info) => info && reset(toValues(info)))
      .catch(() => toast.error("Impossible de charger les coordonnées."))
      .finally(() => setIsLoading(false));
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const saved = await apiRequest<ContactInfo>("/contact", { method: "PUT", body: values, token });
      reset(toValues(saved));
      toast.success("Coordonnées enregistrées.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Enregistrement impossible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 rounded-lg bg-muted animate-pulse" />
        <div className="h-80 rounded-2xl bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Contenu</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Coordonnées et réseaux</h1>
            <p className="mt-2 text-muted-foreground">
              Tout ce qui permet de vous joindre : email, téléphone, WhatsApp, localisation, réseaux et mentions légales.
            </p>
          </div>
          <Button type="submit" size="lg" className="w-fit" disabled={isSubmitting || !isDirty}>
            <Save />
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-4">
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Email" htmlFor="email" error={errors.email?.message}>
                <Input id="email" type="email" {...register("email")} />
              </Field>
              <Field label="Téléphone" htmlFor="phone" optional hint="Format affiché tel quel, ex. +33 6 12 34 56 78.">
                <Input id="phone" type="tel" {...register("phone")} />
              </Field>
              <Field
                label="WhatsApp"
                htmlFor="whatsapp"
                optional
                hint="Ajoute une ligne dans Contact et l'icône avec les réseaux. Vide = rien."
              >
                <Input id="whatsapp" type="tel" placeholder="+33 6 12 34 56 78" {...register("whatsapp")} />
              </Field>
            </div>
            <LocalizedField label="Localisation" fr={register("location.fr")} en={register("location.en")} errors={errors.location} />
            <Field
              label="Lien de la localisation"
              htmlFor="locationUrl"
              optional
              error={errors.locationUrl?.message}
              hint="Ouvert au clic sur la localisation (Google Maps…)."
            >
              <Input
                id="locationUrl"
                placeholder="https://maps.google.com/..."
                className="font-mono text-xs md:text-xs"
                {...register("locationUrl")}
              />
            </Field>
          </section>

          <section className="lg:col-start-1 rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="font-semibold">Mentions légales</h2>
              <p className="text-sm text-muted-foreground">
                Obligatoires pour un site professionnel. Affichées sur la page{" "}
                <Link to="/mentions-legales" target="_blank" className="underline underline-offset-2">
                  Mentions légales
                </Link>
                .
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="SIRET" htmlFor="siret">
                <Input id="siret" placeholder="123 456 789 00012" {...register("siret")} />
              </Field>
              <Field
                label="Mention TVA"
                htmlFor="vatMention"
                optional
                hint="En micro-entreprise : « TVA non applicable, art. 293 B du CGI »."
              >
                <Input id="vatMention" placeholder="TVA non applicable, art. 293 B du CGI" {...register("vatMention")} />
              </Field>
            </div>
            <Field label="Adresse de l'entreprise" htmlFor="legalAddress" hint="Adresse déclarée de ta micro-entreprise.">
              <Input id="legalAddress" {...register("legalAddress")} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Hébergeur" htmlFor="hostName" hint="Le fournisseur du serveur (OVH, Hostinger, Hetzner…).">
                <Input id="hostName" {...register("hostName")} />
              </Field>
              <Field label="Adresse de l'hébergeur" htmlFor="hostAddress">
                <Input id="hostAddress" {...register("hostAddress")} />
              </Field>
            </div>
          </section>

          <aside className="space-y-4 lg:row-start-1 lg:col-start-2 lg:row-span-2">
            <section className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Aperçu</p>
              <ul className="space-y-4 text-sm">
                {[
                  { icon: MapPin, label: "Localisation", value: location?.fr },
                  { icon: Mail, label: "Email", value: email },
                  { icon: Phone, label: "Téléphone", value: phone },
                ].map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium">{label}</p>
                      <p className="truncate text-muted-foreground">{value || "—"}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </form>

      <SocialsSection />
    </div>
  );
};
