import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Briefcase, GraduationCap, Route } from "lucide-react";
import { Select } from "@/components/ui/select";
import { BilingualListField } from "@/components/admin/BilingualListField";
import { CollectionPage } from "@/components/admin/CollectionPage";
import { EDITOR_FORM_ID, EditorDialog } from "@/components/admin/EditorDialog";
import { Field, LocalizedField } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useEditor } from "@/components/admin/useEditor";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { experienceTypes, type Experience, type ExperienceType } from "@/types/content";

export const experienceTypeLabels: Record<ExperienceType, string> = {
  formation: "Formation",
  alternance: "Alternance",
  stage: "Stage",
  emploi: "Emploi",
  freelance: "Freelance",
};

const localizedText = z.object({ fr: z.string().min(1, "Requis"), en: z.string().min(1, "Requis") });

const schema = z.object({
  type: z.enum(experienceTypes),
  logo: z.string().optional(),
  org: localizedText,
  title: localizedText,
  location: localizedText,
  date: localizedText,
  description: localizedText,
  highlights: z.array(localizedText),
});

type FormValues = z.infer<typeof schema>;

const emptyText = { fr: "", en: "" };

const ExperienceForm = ({ item, onSubmit }: { item?: Experience; onSubmit: (values: FormValues) => void }) => {
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
      type: item?.type ?? "emploi",
      logo: item?.logo ?? "",
      org: item?.org ?? emptyText,
      title: item?.title ?? emptyText,
      location: item?.location ?? emptyText,
      date: item?.date ?? emptyText,
      description: item?.description ?? emptyText,
      highlights: item?.highlights ?? [emptyText],
    },
  });
  const logo = watch("logo");

  return (
    <form id={EDITOR_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-[160px_1fr] gap-6">
        <Field label="Logo" optional>
          <ImageUpload value={logo} onChange={(url) => setValue("logo", url)} previewClassName="aspect-square bg-white" allowClear />
        </Field>
        <div className="space-y-5">
          <Field label="Type" htmlFor="type">
            <Select id="type" {...register("type")}>
              {experienceTypes.map((value) => (
                <option key={value} value={value}>
                  {experienceTypeLabels[value]}
                </option>
              ))}
            </Select>
          </Field>
          <LocalizedField label="Intitulé" fr={register("title.fr")} en={register("title.en")} errors={errors.title} />
          <LocalizedField label="Établissement / entreprise" fr={register("org.fr")} en={register("org.en")} errors={errors.org} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <LocalizedField label="Lieu" fr={register("location.fr")} en={register("location.en")} errors={errors.location} />
        <LocalizedField
          label="Période"
          fr={register("date.fr")}
          en={register("date.en")}
          errors={errors.date}
          placeholder={{ fr: "2023 — aujourd'hui", en: "2023 — present" }}
        />
      </div>
      <LocalizedField
        label="Description"
        multiline
        rows={3}
        fr={register("description.fr")}
        en={register("description.en")}
        errors={errors.description}
      />
      <BilingualListField label="Points clés" name="highlights" control={control} register={register} addLabel="Ajouter un point" />
    </form>
  );
};

export const AdminExperiences = () => {
  const { items, isLoading, error, save, remove, move } = useAdminCollection<Experience>("experiences");
  const editor = useEditor(save);

  return (
    <>
      <CollectionPage
        title="Parcours"
        description="Formations et expériences de la section « Mon parcours », de la plus récente à la plus ancienne."
        icon={Route}
        newLabel="Nouvelle étape"
        onNew={editor.openNew}
        items={items}
        isLoading={isLoading}
        error={error}
        emptyTitle="Parcours vide"
        emptyText="Ajoute une formation ou une expérience."
        itemLabel={(e) => e.title.fr}
        onEdit={editor.openEdit}
        onDelete={(e) => remove(e._id)}
        onMove={(e, dir) => move(e, dir)}
        isVisible={(e) => e.visible}
        onToggleVisible={async (e) => {
          await save({ visible: !e.visible }, e._id);
        }}
        renderItem={(e) => (
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-white p-1.5">
              {e.logo ? (
                <img src={e.logo} alt="" className="h-full w-full object-contain" />
              ) : e.type === "formation" ? (
                <GraduationCap className="h-5 w-5 text-neutral-400" />
              ) : (
                <Briefcase className="h-5 w-5 text-neutral-400" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{e.title.fr}</p>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {experienceTypeLabels[e.type]}
                </span>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {e.org.fr} · {e.location.fr}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{e.date.fr}</p>
            </div>
          </div>
        )}
      />
      <EditorDialog
        open={editor.isOpen}
        onOpenChange={editor.onOpenChange}
        title={editor.item ? "Modifier l'étape" : "Nouvelle étape du parcours"}
        isSubmitting={editor.isSubmitting}
      >
        <ExperienceForm item={editor.item} onSubmit={editor.submit} />
      </EditorDialog>
    </>
  );
};
