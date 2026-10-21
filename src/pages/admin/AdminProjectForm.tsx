import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/providers/auth-provider";
import { apiRequest, ApiError } from "@/lib/api";
import { ProjectStatus, type Project, type ProjectInput } from "@/types/project";

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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: emptyValues });

  const { fields, append, remove } = useFieldArray({ control, name: "features" });

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
      if (isEditing) {
        await apiRequest(`/projects/${slug}`, { method: "PUT", body: payload, token });
      } else {
        await apiRequest("/projects", { method: "POST", body: payload, token });
      }
      toast.success("Projet enregistré.");
      navigate("/admin/projects");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Enregistrement impossible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-display font-bold">{isEditing ? "Modifier le projet" : "Nouveau projet"}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" placeholder="mon-projet" {...register("slug")} />
            {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="image">Image</Label>
            <Input id="image" placeholder="/images/projects/mon-projet.png" {...register("image")} />
            {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="stack">Stack (séparée par des virgules)</Label>
            <Input id="stack" placeholder="React, Node.js, MongoDB" {...register("stack")} />
            {errors.stack && <p className="text-xs text-destructive">{errors.stack.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Statut</Label>
            <Select id="status" {...register("status")}>
              <option value={ProjectStatus.STARTED}>Démarré</option>
              <option value={ProjectStatus.ONGOING}>En cours</option>
              <option value={ProjectStatus.DONE}>Terminé</option>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order">Ordre d'affichage</Label>
            <Input id="order" type="number" {...register("order")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="liveLink">Lien live (optionnel)</Label>
            <Input id="liveLink" placeholder="https://..." {...register("liveLink")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="githubLink">Lien GitHub (optionnel)</Label>
            <Input id="githubLink" placeholder="https://github.com/..." {...register("githubLink")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Étude de cas</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fr">
            <TabsList className="mb-4">
              <TabsTrigger value="fr">Français</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
            {(["fr", "en"] as const).map((lang) => (
              <TabsContent key={lang} value={lang} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`tagline.${lang}`}>Tagline</Label>
                  <Textarea id={`tagline.${lang}`} rows={2} {...register(`tagline.${lang}`)} />
                  {errors.tagline?.[lang] && <p className="text-xs text-destructive">{errors.tagline[lang]?.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`role.${lang}`}>Rôle</Label>
                    <Input id={`role.${lang}`} {...register(`role.${lang}`)} />
                    {errors.role?.[lang] && <p className="text-xs text-destructive">{errors.role[lang]?.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`timeline.${lang}`}>Période</Label>
                    <Input id={`timeline.${lang}`} {...register(`timeline.${lang}`)} />
                    {errors.timeline?.[lang] && <p className="text-xs text-destructive">{errors.timeline[lang]?.message}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`overview.${lang}`}>Aperçu</Label>
                  <Textarea id={`overview.${lang}`} rows={3} {...register(`overview.${lang}`)} />
                  {errors.overview?.[lang] && <p className="text-xs text-destructive">{errors.overview[lang]?.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`challenge.${lang}`}>Le défi</Label>
                  <Textarea id={`challenge.${lang}`} rows={3} {...register(`challenge.${lang}`)} />
                  {errors.challenge?.[lang] && <p className="text-xs text-destructive">{errors.challenge[lang]?.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`approach.${lang}`}>L'approche</Label>
                  <Textarea id={`approach.${lang}`} rows={3} {...register(`approach.${lang}`)} />
                  {errors.approach?.[lang] && <p className="text-xs text-destructive">{errors.approach[lang]?.message}</p>}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fonctionnalités clés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <div className="grid sm:grid-cols-2 gap-2 flex-1">
                <Input placeholder="FR" {...register(`features.${index}.fr`)} />
                <Input placeholder="EN" {...register(`features.${index}.en`)} />
              </div>
              <Button type="button" variant="outline" size="icon" onClick={() => remove(index)} disabled={fields.length === 1}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {errors.features?.message && <p className="text-xs text-destructive">{errors.features.message}</p>}
          <Button type="button" variant="outline" size="sm" onClick={() => append({ fr: "", en: "" })}>
            <Plus className="w-4 h-4" />
            Ajouter une fonctionnalité
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => navigate("/admin/projects")}>
          Annuler
        </Button>
      </div>
    </form>
  );
};
