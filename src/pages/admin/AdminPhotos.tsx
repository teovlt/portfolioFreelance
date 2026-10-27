import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Images } from "lucide-react";
import { CollectionPage } from "@/components/admin/CollectionPage";
import { EDITOR_FORM_ID, EditorDialog } from "@/components/admin/EditorDialog";
import { Field, LocalizedField } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useEditor } from "@/components/admin/useEditor";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import type { Photo } from "@/types/content";

const localizedText = z.object({ fr: z.string().min(1, "Requis"), en: z.string().min(1, "Requis") });

const schema = z.object({
  src: z.string().min(1, "Ajoute une image"),
  position: z.string(),
  alt: localizedText,
});

type FormValues = z.infer<typeof schema>;

const PhotoForm = ({ item, onSubmit }: { item?: Photo; onSubmit: (values: FormValues) => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { src: item?.src ?? "", position: item?.position ?? "50% 50%", alt: item?.alt ?? { fr: "", en: "" } },
  });
  const [src, position] = watch(["src", "position"]);

  return (
    <form id={EDITOR_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-[240px_1fr] gap-6">
      <Field label="Photo" error={errors.src?.message}>
        <ImageUpload
          value={src}
          onChange={(url) => setValue("src", url, { shouldValidate: true })}
          previewClassName="aspect-[4/5]"
          focalPoint={position}
          onFocalPointChange={(p) => setValue("position", p)}
        />
      </Field>
      <div className="space-y-5">
        <LocalizedField
          label="Texte alternatif"
          hint="Décrit la photo pour les lecteurs d'écran et le référencement."
          multiline
          rows={4}
          fr={register("alt.fr")}
          en={register("alt.en")}
          errors={errors.alt}
        />
        <p className="text-xs text-muted-foreground">
          Point focal : <span className="font-mono">{position}</span>
        </p>
      </div>
    </form>
  );
};

export const AdminPhotos = () => {
  const { items, isLoading, error, save, remove, move } = useAdminCollection<Photo>("photos");
  const editor = useEditor(save, items);

  return (
    <>
      <CollectionPage
        title="Photos"
        description="Le carrousel de la section « À propos », dans l'ordre d'affichage."
        icon={Images}
        newLabel="Ajouter une photo"
        onNew={editor.openNew}
        items={items}
        isLoading={isLoading}
        error={error}
        layout="grid"
        emptyTitle="Aucune photo"
        emptyText="Téléverse une première photo pour la section À propos."
        itemLabel={(p) => p.alt.fr || "Photo"}
        onEdit={editor.openEdit}
        onDelete={(p) => remove(p._id)}
        onMove={(p, dir) => move(p, dir)}
        isVisible={(p) => p.visible}
        onToggleVisible={async (p) => {
          await save({ visible: !p.visible }, p._id);
        }}
        renderItem={(p) => (
          <button type="button" onClick={() => editor.openEdit(p)} className="block w-full text-left">
            <div className="aspect-[4/5] bg-muted">
              <img src={p.src} alt={p.alt.fr} className="h-full w-full object-cover" style={{ objectPosition: p.position }} />
            </div>
            <p className="line-clamp-2 px-3 pt-2.5 text-xs text-muted-foreground">{p.alt.fr}</p>
          </button>
        )}
      />
      <EditorDialog
        open={editor.isOpen}
        onOpenChange={editor.onOpenChange}
        title={editor.item ? "Modifier la photo" : "Nouvelle photo"}
        isSubmitting={editor.isSubmitting}
      >
        <PhotoForm item={editor.item} onSubmit={editor.submit} />
      </EditorDialog>
    </>
  );
};
