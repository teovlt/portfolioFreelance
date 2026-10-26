import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowUpRight, Github, Globe, ImageIcon, Info, Languages, ListChecks, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/providers/auth-provider";
import { apiRequest, ApiError } from "@/lib/api";
import { ProjectStatus, type Project, type ProjectInput } from "@/types/project";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

const localizedText = z.object({ fr: z.string().min(1, "Requis"), en: z.string().min(1, "Requis") });

const schema = z.object({
  slug: z
    .string()
    .min(1, "Requis")
    .regex(/^[a-z0-9-]+$/, "Lettres minuscules, chiffres et tirets uniquement"),
  title: z.string().min(1, "Requis"),
  image: z.string().min(1, "Requis"),
  stack: z.string().min(1, "Requis"),
  status: z.nativeEnum(ProjectStatus),
  order: z.coerce.number().int(),
  liveLink: z.string().optional().or(z.literal("")),
  githubLink: z.string().optional().or(z.literal("")),
  tagline: localizedText,
  role: localizedText,
  timeline: localizedText,
  overview: localizedText,
  challenge: localizedText,
  approach: localizedText,
  features: z.array(localizedText).min(1, "Ajoutez au moins une fonctionnalité"),
});

type FormValues = z.infer<typeof schema>;

const emptyValues: FormValues = {
  slug: "",
  title: "",
  image: "",
  stack: "",
  status: ProjectStatus.STARTED,
  order: 0,
  liveLink: "",
  githubLink: "",
  tagline: { fr: "", en: "" },
  role: { fr: "", en: "" },
  timeline: { fr: "", en: "" },
  overview: { fr: "", en: "" },
  challenge: { fr: "", en: "" },
  approach: { fr: "", en: "" },
  features: [{ fr: "", en: "" }],
};

const caseStudyFields = ["tagline", "role", "timeline", "overview", "challenge", "approach"] as const;

const toFormValues = (project: Project): FormValues => ({
  slug: project.slug,
  title: project.title,
  image: project.image,
  stack: project.stack.join(", "),
  status: project.status,
  order: project.order,
  liveLink: project.liveLink ?? "",
  githubLink: project.githubLink ?? "",
  tagline: project.tagline,
  role: project.role,
  timeline: project.timeline,
  overview: project.overview,
  challenge: project.challenge,
  approach: project.approach,
  features: project.features,
});

export const AdminProjectForm = () => {
  const { slug } = useParams();
  const isEditing = !!slug;
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: emptyValues });

  const { fields, append, remove } = useFieldArray({ control, name: "features" });

  const [title, image, stack, status] = watch(["title", "image", "stack", "status"]);
  const stackItems = (stack ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    if (!slug) return;
    apiRequest<Project>(`/projects/${slug}`)
      .then((project) => reset(toFormValues(project)))
      .catch(() => toast.error("Projet introuvable."))
      .finally(() => setIsLoading(false));
  }, [slug, reset]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    // `values` is already validated against `schema` by zodResolver, so every
    // required field is guaranteed present here despite how the resolver's
    // generic inference prints the parameter type.
    const payload = {
      ...values,
      stack: values.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      liveLink: values.liveLink || undefined,
      githubLink: values.githubLink || undefined,
    } as ProjectInput;

    try {
      const saved = isEditing
        ? await apiRequest<Project>(`/projects/${slug}`, { method: "PUT", body: payload, token })
        : await apiRequest<Project>("/projects", { method: "POST", body: payload, token });
      toast.success("Projet enregistré.");
      reset(toFormValues(saved));
      // Stay on the form; only move when the URL no longer matches the project
      // (new project created, or slug renamed).
      if (saved.slug !== slug) navigate(`/admin/projects/${saved.slug}/edit`, { replace: true });
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
        <div className="h-64 rounded-2xl bg-muted animate-pulse" />
        <div className="h-96 rounded-2xl bg-muted animate-pulse" />
      </div>
    );
  }

  const fieldError = (message?: string) => (message ? <p className="text-xs font-medium text-destructive">{message}</p> : null);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="min-w-0">
          <Link
            to="/admin/projects"
            className="group mb-4 flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Tous les projets
          </Link>
          <p className="eyebrow mb-3">{isEditing ? "Édition" : "Création"}</p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight truncate">
            {isEditing ? title || "Modifier le projet" : "Nouveau projet"}
          </h1>
          {isEditing && <p className="mt-2 font-mono text-sm text-muted-foreground">/projects/{slug}</p>}
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <Button asChild variant="outline">
              <Link to={`/projects/${slug}`} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight />
                Voir
              </Link>
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            <Save />
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      {/* General */}
      <FormSection icon={Info} title="Informations générales" description="Ce qui apparaît sur la carte du projet dans la liste du portfolio.">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" placeholder="Mon super projet" {...register("title")} />
            {fieldError(errors.title?.message)}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <div className="flex rounded-md border border-input shadow-sm focus-within:ring-1 focus-within:ring-ring">
              <span className="flex items-center rounded-l-md border-r border-input bg-muted/60 px-3 font-mono text-xs text-muted-foreground">/projects/</span>
              <Input id="slug" placeholder="mon-projet" className="border-0 shadow-none focus-visible:ring-0 font-mono" {...register("slug")} />
            </div>
            {fieldError(errors.slug?.message)}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="stack">Stack</Label>
            <Input id="stack" placeholder="React, Node.js, MongoDB" {...register("stack")} />
            {stackItems.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {stackItems.map((tech) => (
                  <span key={tech} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {errors.stack ? fieldError(errors.stack.message) : <p className="text-xs text-muted-foreground">Séparée par des virgules.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select id="status" {...register("status")}>
              <option value={ProjectStatus.STARTED}>Démarré</option>
              <option value={ProjectStatus.ONGOING}>En cours</option>
              <option value={ProjectStatus.DONE}>Terminé</option>
            </Select>
            {status && <ProjectStatusBadge status={status} className="mt-1" />}
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Ordre d'affichage</Label>
            <Input id="order" type="number" {...register("order")} />
            <p className="text-xs text-muted-foreground">0 = affiché en premier.</p>
          </div>
        </div>
      </FormSection>

      {/* Media & links */}
      <FormSection icon={ImageIcon} title="Visuel & liens" description="L'image de couverture et les liens externes affichés sur l'étude de cas.">
        <div className="grid sm:grid-cols-[200px_1fr] gap-5">
          <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/50">
            {image && !imageBroken ? (
              <img src={image} alt="" className="h-full w-full object-cover" onError={() => setImageBroken(true)} />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground">
                <ImageIcon className="h-5 w-5" />
                {image ? "Image introuvable" : "Aperçu"}
              </div>
            )}
          </div>
          <div className="min-w-0 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                placeholder="/images/projects/mon-projet.png"
                className="font-mono text-xs md:text-xs"
                {...register("image", { onChange: () => setImageBroken(false) })}
              />
              {fieldError(errors.image?.message)}
              <p className="text-xs text-muted-foreground">Chemin relatif au dossier public, ou URL complète.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="liveLink" className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Lien live <span className="font-normal text-muted-foreground">(optionnel)</span>
                </Label>
                <Input id="liveLink" placeholder="https://..." {...register("liveLink")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink" className="flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5" /> GitHub <span className="font-normal text-muted-foreground">(optionnel)</span>
                </Label>
                <Input id="githubLink" placeholder="https://github.com/..." {...register("githubLink")} />
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      {/* Case study */}
      <FormSection icon={Languages} title="Étude de cas" description="Le contenu de la page détaillée, à rédiger en français et en anglais.">
        <Tabs defaultValue="fr">
          <TabsList className="mb-5">
            {(["fr", "en"] as const).map((lang) => (
              <TabsTrigger key={lang} value={lang} className="gap-2">
                {lang === "fr" ? "Français" : "English"}
                {caseStudyFields.some((field) => errors[field]?.[lang]) && <span className="h-1.5 w-1.5 rounded-full bg-destructive" />}
              </TabsTrigger>
            ))}
          </TabsList>
          {(["fr", "en"] as const).map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor={`tagline.${lang}`}>Tagline</Label>
                <Textarea id={`tagline.${lang}`} rows={2} {...register(`tagline.${lang}`)} />
                {fieldError(errors.tagline?.[lang]?.message)}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor={`role.${lang}`}>Rôle</Label>
                  <Input id={`role.${lang}`} {...register(`role.${lang}`)} />
                  {fieldError(errors.role?.[lang]?.message)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`timeline.${lang}`}>Période</Label>
                  <Input id={`timeline.${lang}`} {...register(`timeline.${lang}`)} />
                  {fieldError(errors.timeline?.[lang]?.message)}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`overview.${lang}`}>Aperçu</Label>
                <Textarea id={`overview.${lang}`} rows={4} {...register(`overview.${lang}`)} />
                {fieldError(errors.overview?.[lang]?.message)}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`challenge.${lang}`}>Le défi</Label>
                <Textarea id={`challenge.${lang}`} rows={4} {...register(`challenge.${lang}`)} />
                {fieldError(errors.challenge?.[lang]?.message)}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`approach.${lang}`}>L'approche</Label>
                <Textarea id={`approach.${lang}`} rows={4} {...register(`approach.${lang}`)} />
                {fieldError(errors.approach?.[lang]?.message)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </FormSection>

      {/* Features */}
      <FormSection icon={ListChecks} title="Fonctionnalités clés" description="La liste à puces de l'étude de cas, une ligne par fonctionnalité.">
        <div className="space-y-3">
          <div className="hidden sm:grid grid-cols-[28px_1fr_1fr_36px] gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span />
            <span>Français</span>
            <span>English</span>
            <span />
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <span className="flex h-9 w-7 flex-shrink-0 items-center justify-center text-xs font-semibold tabular-nums text-muted-foreground">
                {index + 1}
              </span>
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <Input placeholder="FR" {...register(`features.${index}.fr`)} />
                <Input placeholder="EN" {...register(`features.${index}.en`)} />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                aria-label="Retirer"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          {fieldError(errors.features?.message)}
          <Button type="button" variant="outline" size="sm" onClick={() => append({ fr: "", en: "" })}>
            <Plus />
            Ajouter une fonctionnalité
          </Button>
        </div>
      </FormSection>

      {/* Footer actions */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/85 px-4 py-3 shadow-lg backdrop-blur">
        <p className="hidden sm:block text-sm text-muted-foreground">
          {Object.keys(errors).length > 0 ? (
            <span className="font-medium text-destructive">Certains champs sont incomplets.</span>
          ) : (
            "Les modifications sont publiées dès l'enregistrement."
          )}
        </p>
        <div className="ml-auto flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/projects")}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save />
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const FormSection = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section className="grid xl:grid-cols-[240px_1fr] gap-4 xl:gap-8">
    <div className="xl:pt-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-sans text-base font-semibold tracking-normal">{title}</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
    <div className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">{children}</div>
  </section>
);
