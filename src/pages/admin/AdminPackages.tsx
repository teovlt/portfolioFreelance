import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock, Package as PackageIcon, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { BilingualListField } from "@/components/admin/BilingualListField";
import { CollectionPage } from "@/components/admin/CollectionPage";
import { EDITOR_FORM_ID, EditorDialog } from "@/components/admin/EditorDialog";
import { Field, LocalizedField } from "@/components/admin/fields";
import { useEditor } from "@/components/admin/useEditor";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { cn } from "@/lib/utils";
import { pricingModes, type Package, type PricingMode } from "@/types/content";

const localizedText = z.object({ fr: z.string().min(1, "Requis"), en: z.string().min(1, "Requis") });

const pricingLabels: Record<PricingMode, string> = {
  oneTime: "Paiement unique",
  subscription: "Abonnement",
  both: "Les deux",
};

const schema = z
  .object({
    title: localizedText,
    description: localizedText,
    pricing: z.enum(pricingModes),
    price: z.string(),
    monthlyPrice: z.string(),
    commitment: z.object({ fr: z.string(), en: z.string() }),
    duration: localizedText,
    badge: z.object({ fr: z.string(), en: z.string() }),
    popular: z.boolean(),
    deliverables: z.array(localizedText).min(1, "Ajoute au moins un élément inclus"),
  })
  .superRefine((values, ctx) => {
    if (values.pricing !== "subscription" && !values.price.trim()) {
      ctx.addIssue({ code: "custom", path: ["price"], message: "Requis" });
    }
    if (values.pricing !== "oneTime" && !values.monthlyPrice.trim()) {
      ctx.addIssue({ code: "custom", path: ["monthlyPrice"], message: "Requis" });
    }
  });

type FormValues = z.infer<typeof schema>;

const emptyText = { fr: "", en: "" };

const PackageForm = ({ item, onSubmit }: { item?: Package; onSubmit: (values: FormValues) => void }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title ?? emptyText,
      description: item?.description ?? emptyText,
      pricing: item?.pricing ?? "oneTime",
      price: item?.price ?? "",
      monthlyPrice: item?.monthlyPrice ?? "",
      commitment: item?.commitment ?? emptyText,
      duration: item?.duration ?? emptyText,
      badge: item?.badge ?? emptyText,
      popular: item?.popular ?? false,
      deliverables: item?.deliverables ?? [emptyText],
    },
  });
  const popular = watch("popular");
  const pricing = watch("pricing");

  return (
    <form id={EDITOR_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <LocalizedField label="Nom du package" fr={register("title.fr")} en={register("title.en")} errors={errors.title} />
      <LocalizedField
        label="Description"
        multiline
        rows={2}
        fr={register("description.fr")}
        en={register("description.en")}
        errors={errors.description}
      />
      <Field label="Tarification" hint="« Les deux » laisse le client choisir entre payer en une fois ou au mois.">
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-border p-1">
          {pricingModes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setValue("pricing", mode)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pricing === mode ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pricingLabels[mode]}
            </button>
          ))}
        </div>
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        {pricing !== "subscription" && (
          <Field label="Prix" htmlFor="price" error={errors.price?.message} hint="Affiché après « À partir de ».">
            <Input id="price" placeholder="1 400€" {...register("price")} />
          </Field>
        )}
        {pricing !== "oneTime" && (
          <Field label="Prix mensuel" htmlFor="monthlyPrice" error={errors.monthlyPrice?.message} hint="Affiché suivi de « /mois ».">
            <Input id="monthlyPrice" placeholder="65€" {...register("monthlyPrice")} />
          </Field>
        )}
      </div>
      {pricing !== "oneTime" && (
        <LocalizedField
          label="Engagement"
          optional
          fr={register("commitment.fr")}
          en={register("commitment.en")}
          placeholder={{ fr: "Engagement 24 mois", en: "24-month commitment" }}
          hint="Affiché sous le prix mensuel."
        />
      )}
      <LocalizedField
        label="Durée"
        fr={register("duration.fr")}
        en={register("duration.en")}
        errors={errors.duration}
        placeholder={{ fr: "1 à 2 semaines", en: "1 to 2 weeks" }}
      />
      <LocalizedField
        label="Badge"
        optional
        fr={register("badge.fr")}
        en={register("badge.en")}
        hint="Petite étiquette au-dessus du titre, ex. « Plus populaire »."
      />
      <label className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3">
        <span>
          <span className="block text-sm font-medium">Mettre en avant</span>
          <span className="block text-xs text-muted-foreground">Carte surélevée et bordure colorée, pour le package recommandé.</span>
        </span>
        <Switch checked={popular} onCheckedChange={(checked) => setValue("popular", checked)} />
      </label>
      <BilingualListField
        label="Inclus"
        name="deliverables"
        control={control}
        register={register}
        error={errors.deliverables?.message ?? errors.deliverables?.root?.message}
        addLabel="Ajouter un élément"
      />
    </form>
  );
};

export const AdminPackages = () => {
  const { items, isLoading, error, save, remove, move } = useAdminCollection<Package>("packages");
  const editor = useEditor(save, items);

  return (
    <>
      <CollectionPage
        title="Packages"
        description="Les offres et tarifs de la section « Packages professionnels »."
        icon={PackageIcon}
        newLabel="Nouveau package"
        onNew={editor.openNew}
        items={items}
        isLoading={isLoading}
        error={error}
        emptyTitle="Aucun package"
        emptyText="Crée ta première offre."
        itemLabel={(p) => p.title.fr}
        onEdit={editor.openEdit}
        onDelete={(p) => remove(p._id)}
        onMove={(p, dir) => move(p, dir)}
        isVisible={(p) => p.visible}
        onToggleVisible={async (p) => {
          await save({ visible: !p.visible }, p._id);
        }}
        renderItem={(p) => (
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-24 flex-shrink-0">
              {p.pricing !== "subscription" && <p className="font-serif text-2xl font-semibold leading-none">{p.price}</p>}
              {p.pricing !== "oneTime" && (
                <p
                  className={cn(
                    "font-serif font-semibold leading-none",
                    p.pricing === "subscription" ? "text-2xl" : "mt-1 text-sm text-muted-foreground",
                  )}
                >
                  {p.monthlyPrice}
                  <span className="text-xs font-normal">/mois</span>
                </p>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{p.title.fr}</p>
                {p.popular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                    <Sparkles className="h-3 w-3" />
                    En avant
                  </span>
                )}
                {p.badge.fr && !p.popular && (
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {p.badge.fr}
                  </span>
                )}
              </div>
              <p className="truncate text-sm text-muted-foreground">{p.description.fr}</p>
              <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {p.duration.fr}
                </span>
                <span>
                  {p.deliverables.length} élément{p.deliverables.length > 1 ? "s" : ""} inclus
                </span>
              </p>
            </div>
          </div>
        )}
      />
      <EditorDialog
        open={editor.isOpen}
        onOpenChange={editor.onOpenChange}
        title={editor.item ? `Modifier « ${editor.item.title.fr} »` : "Nouveau package"}
        isSubmitting={editor.isSubmitting}
      >
        <PackageForm item={editor.item} onSubmit={editor.submit} />
      </EditorDialog>
    </>
  );
};
