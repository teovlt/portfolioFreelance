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
import type { Package } from "@/types/content";

const localizedText = z.object({ fr: z.string().min(1, "Requis"), en: z.string().min(1, "Requis") });

const schema = z.object({
  title: localizedText,
  description: localizedText,
  price: z.string().min(1, "Requis"),
  duration: localizedText,
  badge: z.object({ fr: z.string(), en: z.string() }),
  popular: z.boolean(),
  deliverables: z.array(localizedText).min(1, "Ajoute au moins un élément inclus"),
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
      price: item?.price ?? "",
      duration: item?.duration ?? emptyText,
      badge: item?.badge ?? emptyText,
      popular: item?.popular ?? false,
      deliverables: item?.deliverables ?? [emptyText],
    },
  });
  const popular = watch("popular");

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
      <div className="grid sm:grid-cols-[180px_1fr] gap-5">
        <Field label="Prix" htmlFor="price" error={errors.price?.message} hint="Affiché après « À partir de ».">
          <Input id="price" placeholder="1 400€" {...register("price")} />
        </Field>
        <LocalizedField
          label="Durée"
          fr={register("duration.fr")}
          en={register("duration.en")}
          errors={errors.duration}
          placeholder={{ fr: "1 à 2 semaines", en: "1 to 2 weeks" }}
        />
      </div>
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
  const editor = useEditor(save);

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
              <p className="font-serif text-2xl font-semibold leading-none">{p.price}</p>
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
