import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, EyeOff, Mail, MessageSquareQuote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CollectionPage } from "@/components/admin/CollectionPage";
import { EDITOR_FORM_ID, EditorDialog } from "@/components/admin/EditorDialog";
import { Field, LocalizedField } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useEditor } from "@/components/admin/useEditor";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { cn } from "@/lib/utils";
import { ReviewStatus, type Review } from "@/types/content";

export const reviewStatusMeta: Record<ReviewStatus, { label: string; dot: string; badge: string }> = {
  [ReviewStatus.PENDING]: {
    label: "En attente",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
  [ReviewStatus.PUBLISHED]: {
    label: "Publié",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  [ReviewStatus.HIDDEN]: {
    label: "Masqué",
    dot: "bg-muted-foreground",
    badge: "bg-muted text-muted-foreground border-border",
  },
};

const ReviewStatusBadge = ({ status, className }: { status: ReviewStatus; className?: string }) => {
  const meta = reviewStatusMeta[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", meta.badge, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
};

const optionalText = z.object({ fr: z.string(), en: z.string() });

const schema = z.object({
  name: z.string().min(1, "Requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  image: z.string().optional(),
  website: z.string().optional(),
  rating: z.coerce.number().int().min(1).max(5),
  status: z.nativeEnum(ReviewStatus),
  company: optionalText,
  project: optionalText,
  comment: optionalText.refine((value) => value.fr.trim() || value.en.trim(), { message: "Requis dans au moins une langue", path: ["fr"] }),
});

type FormValues = z.infer<typeof schema>;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Stars = ({ rating, className }: { rating: number; className?: string }) => (
  <span className={cn("flex items-center gap-0.5", className)} aria-label={`${rating}/5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={cn("h-3 w-3", i < rating ? "fill-accent text-accent" : "text-border")} />
    ))}
  </span>
);

const ReviewForm = ({ item, onSubmit }: { item?: Review; onSubmit: (values: FormValues) => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name ?? "",
      email: item?.email ?? "",
      image: item?.image ?? "",
      website: item?.website ?? "",
      rating: item?.rating ?? 5,
      status: item?.status ?? ReviewStatus.PUBLISHED,
      company: item?.company ?? { fr: "", en: "" },
      project: item?.project ?? { fr: "", en: "" },
      comment: item?.comment ?? { fr: "", en: "" },
    },
  });
  const [image, rating] = watch(["image", "rating"]);

  return (
    <form id={EDITOR_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {item?.submitted && (
        <p className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Avis envoyé depuis le site le{" "}
          {new Date(item.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}. Il n'a été écrit que
          dans une langue : ajoute la traduction si tu veux, sinon le site affiche l'original dans les deux langues.
        </p>
      )}

      <div className="grid sm:grid-cols-[160px_1fr] gap-6">
        <Field label="Photo" optional>
          <ImageUpload value={image} onChange={(url) => setValue("image", url)} previewClassName="aspect-square" allowClear />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5 content-start">
          <Field label="Nom" htmlFor="name" error={errors.name?.message}>
            <Input id="name" {...register("name")} />
          </Field>
          <Field label="Note" htmlFor="rating">
            <div className="flex items-center gap-1 h-9">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue("rating", value)}
                  aria-label={`${value} étoile${value > 1 ? "s" : ""}`}
                  className="p-0.5"
                >
                  <Star
                    className={cn(
                      "h-6 w-6 transition-colors",
                      value <= rating ? "fill-accent text-accent" : "text-border hover:text-accent/60",
                    )}
                  />
                </button>
              ))}
            </div>
          </Field>
          <Field label="Statut" htmlFor="status">
            <Select id="status" {...register("status")}>
              {Object.values(ReviewStatus).map((value) => (
                <option key={value} value={value}>
                  {reviewStatusMeta[value].label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Site / LinkedIn" htmlFor="website" optional>
            <Input id="website" placeholder="https://..." {...register("website")} />
          </Field>
          <Field
            label="Email"
            htmlFor="email"
            optional
            error={errors.email?.message}
            hint="Privé, jamais affiché sur le site."
            className="sm:col-span-2"
          >
            <Input id="email" type="email" {...register("email")} />
          </Field>
        </div>
      </div>

      <LocalizedField label="Avis" multiline rows={5} fr={register("comment.fr")} en={register("comment.en")} errors={errors.comment} />
      <LocalizedField label="Poste / entreprise" optional fr={register("company.fr")} en={register("company.en")} />
      <LocalizedField label="Projet concerné" optional fr={register("project.fr")} en={register("project.en")} />
    </form>
  );
};

type Filter = "all" | ReviewStatus;

export const AdminReviews = () => {
  const { items, isLoading, error, save, remove, move } = useAdminCollection<Review>("reviews");
  const editor = useEditor(save, items);
  const [filter, setFilter] = useState<Filter>("all");
  const [initialFilterSet, setInitialFilterSet] = useState(false);

  const counts = useMemo(
    () => ({
      all: items.length,
      [ReviewStatus.PENDING]: items.filter((r) => r.status === ReviewStatus.PENDING).length,
      [ReviewStatus.PUBLISHED]: items.filter((r) => r.status === ReviewStatus.PUBLISHED).length,
      [ReviewStatus.HIDDEN]: items.filter((r) => r.status === ReviewStatus.HIDDEN).length,
    }),
    [items],
  );

  // Land on the pending reviews when there are some to moderate
  useEffect(() => {
    if (isLoading || initialFilterSet) return;
    if (counts[ReviewStatus.PENDING] > 0) setFilter(ReviewStatus.PENDING);
    setInitialFilterSet(true);
  }, [isLoading, initialFilterSet, counts]);

  const shown = filter === "all" ? items : items.filter((r) => r.status === filter);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "Tous" },
    { value: ReviewStatus.PENDING, label: reviewStatusMeta[ReviewStatus.PENDING].label },
    { value: ReviewStatus.PUBLISHED, label: "Publiés" },
    { value: ReviewStatus.HIDDEN, label: "Masqués" },
  ];

  const setStatus = async (review: Review, status: ReviewStatus) => {
    await save({ status }, review._id);
  };

  return (
    <>
      <CollectionPage
        title="Avis"
        description="Les témoignages clients du hero. Ceux envoyés depuis le site arrivent « en attente » jusqu'à ce que tu les publies."
        icon={MessageSquareQuote}
        newLabel="Ajouter un avis"
        onNew={editor.openNew}
        items={shown}
        isLoading={isLoading}
        error={error}
        emptyTitle={items.length === 0 ? "Aucun avis" : "Rien ici"}
        emptyText={items.length === 0 ? "Les avis laissés sur le site apparaîtront ici." : "Aucun avis avec ce statut."}
        itemLabel={(r) => `Avis de ${r.name}`}
        onEdit={editor.openEdit}
        onDelete={(r) => remove(r._id)}
        onMove={(r, dir) => move(r, dir, shown)}
        toolbar={
          <div className="flex gap-1 overflow-x-auto">
            {filters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={cn(
                  "flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === value ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted",
                )}
              >
                {label}
                <span className={cn("tabular-nums", filter === value ? "opacity-60" : "opacity-50")}>{counts[value]}</span>
              </button>
            ))}
          </div>
        }
        renderActions={(r) =>
          r.status === ReviewStatus.PUBLISHED ? (
            <Button variant="ghost" size="sm" className="h-8 px-3" onClick={() => setStatus(r, ReviewStatus.HIDDEN)}>
              <EyeOff />
              Masquer
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="h-8 px-3" onClick={() => setStatus(r, ReviewStatus.PUBLISHED)}>
              <Check />
              Publier
            </Button>
          )
        }
        renderItem={(r) => (
          <div className="flex items-start gap-4 min-w-0">
            <Avatar className="h-11 w-11 flex-shrink-0">
              {r.image && <AvatarImage src={r.image} alt={r.name} className="object-cover" />}
              <AvatarFallback className="text-xs">{initials(r.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <p className="font-semibold">{r.name}</p>
                <Stars rating={r.rating} />
                <ReviewStatusBadge status={r.status} />
                {r.submitted && (
                  <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Via le site
                  </span>
                )}
              </div>
              {(r.company.fr || r.company.en) && <p className="truncate text-xs text-muted-foreground">{r.company.fr || r.company.en}</p>}
              <p className="mt-1.5 line-clamp-2 text-sm text-foreground/80">"{r.comment.fr || r.comment.en}"</p>
              {r.email && (
                <a
                  href={`mailto:${r.email}`}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-3 w-3" />
                  {r.email}
                </a>
              )}
            </div>
          </div>
        )}
      />
      <EditorDialog
        open={editor.isOpen}
        onOpenChange={editor.onOpenChange}
        title={editor.item ? `Avis de ${editor.item.name}` : "Nouvel avis"}
        isSubmitting={editor.isSubmitting}
      >
        <ReviewForm item={editor.item} onSubmit={editor.submit} />
      </EditorDialog>
    </>
  );
};
