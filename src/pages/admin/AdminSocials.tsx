import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CollectionPage } from "@/components/admin/CollectionPage";
import { EDITOR_FORM_ID, EditorDialog } from "@/components/admin/EditorDialog";
import { Field } from "@/components/admin/fields";
import { useEditor } from "@/components/admin/useEditor";
import { SocialIcon, socialIconLabels } from "@/components/SocialIcon";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { socialIcons, type Social } from "@/types/content";

const schema = z.object({
  label: z.string().min(1, "Requis"),
  icon: z.enum(socialIcons),
  url: z
    .string()
    .min(1, "Requis")
    .regex(/^(https?:\/\/|mailto:|tel:)/, "Doit commencer par https://, mailto: ou tel:"),
});

type FormValues = z.infer<typeof schema>;

const SocialForm = ({ item, onSubmit }: { item?: Social; onSubmit: (values: FormValues) => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { label: item?.label ?? "", icon: item?.icon ?? "website", url: item?.url ?? "" },
  });
  const icon = watch("icon");

  return (
    <form id={EDITOR_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5">
      <Field label="Nom" htmlFor="label" error={errors.label?.message}>
        <Input id="label" placeholder="LinkedIn" {...register("label")} />
      </Field>
      <Field label="Icône" htmlFor="icon">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
            <SocialIcon icon={icon} className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <Select id="icon" {...register("icon")}>
              {socialIcons.map((value) => (
                <option key={value} value={value}>
                  {socialIconLabels[value]}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Field>
      <Field label="Lien" htmlFor="url" error={errors.url?.message} hint="https://..., mailto:... ou tel:..." className="sm:col-span-2">
        <Input id="url" placeholder="https://www.linkedin.com/in/..." className="font-mono text-xs md:text-xs" {...register("url")} />
      </Field>
    </form>
  );
};

export const AdminSocials = () => {
  const { items, isLoading, error, save, remove, move } = useAdminCollection<Social>("socials");
  const editor = useEditor(save, items);

  return (
    <>
      <CollectionPage
        title="Réseaux"
        description="Les liens affichés dans le hero et le pied de page du site."
        icon={Share2}
        newLabel="Nouveau réseau"
        onNew={editor.openNew}
        items={items}
        isLoading={isLoading}
        error={error}
        emptyTitle="Aucun réseau"
        emptyText="Ajoute GitHub, LinkedIn, ton email…"
        itemLabel={(s) => s.label}
        onEdit={editor.openEdit}
        onDelete={(s) => remove(s._id)}
        onMove={(s, dir) => move(s, dir)}
        isVisible={(s) => s.visible}
        onToggleVisible={async (s) => {
          await save({ visible: !s.visible }, s._id);
        }}
        renderItem={(s) => (
          <div className="flex items-center gap-4 min-w-0">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <SocialIcon icon={s.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">{s.label}</p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                {s.url}
              </a>
            </div>
          </div>
        )}
      />
      <EditorDialog
        open={editor.isOpen}
        onOpenChange={editor.onOpenChange}
        title={editor.item ? "Modifier le réseau" : "Nouveau réseau"}
        isSubmitting={editor.isSubmitting}
      >
        <SocialForm item={editor.item} onSubmit={editor.submit} />
      </EditorDialog>
    </>
  );
};
