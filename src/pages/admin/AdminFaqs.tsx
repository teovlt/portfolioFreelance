import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HelpCircle } from "lucide-react";
import { CollectionPage } from "@/components/admin/CollectionPage";
import { EDITOR_FORM_ID, EditorDialog } from "@/components/admin/EditorDialog";
import { LocalizedField } from "@/components/admin/fields";
import { useEditor } from "@/components/admin/useEditor";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import type { Faq } from "@/types/content";

const localizedText = z.object({ fr: z.string().min(1, "Requis"), en: z.string().min(1, "Requis") });

const schema = z.object({
  question: localizedText,
  answer: localizedText,
});

type FormValues = z.infer<typeof schema>;

const emptyText = { fr: "", en: "" };

const FaqForm = ({ item, onSubmit }: { item?: Faq; onSubmit: (values: FormValues) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { question: item?.question ?? emptyText, answer: item?.answer ?? emptyText },
  });

  return (
    <form id={EDITOR_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <LocalizedField label="Question" fr={register("question.fr")} en={register("question.en")} errors={errors.question} />
      <LocalizedField
        label="Réponse"
        multiline
        rows={5}
        fr={register("answer.fr")}
        en={register("answer.en")}
        errors={errors.answer}
        hint="{{tarifs}} et {{delais}} sont remplacés par les prix et délais des packages visibles, pour ne jamais être en décalage."
      />
    </form>
  );
};

export const AdminFaqs = () => {
  const { items, isLoading, error, save, remove, move } = useAdminCollection<Faq>("faqs");
  const editor = useEditor(save, items);

  return (
    <>
      <CollectionPage
        title="FAQ"
        description="Les questions de la section « Vos questions », dans l'ordre affiché sur le site."
        icon={HelpCircle}
        newLabel="Nouvelle question"
        onNew={editor.openNew}
        items={items}
        isLoading={isLoading}
        error={error}
        emptyTitle="Aucune question"
        emptyText="La section FAQ est masquée sur le site tant qu'elle est vide."
        itemLabel={(f) => f.question.fr}
        onEdit={editor.openEdit}
        onDelete={(f) => remove(f._id)}
        onMove={(f, dir) => move(f, dir)}
        isVisible={(f) => f.visible}
        onToggleVisible={async (f) => {
          await save({ visible: !f.visible }, f._id);
        }}
        renderItem={(f) => (
          <div className="min-w-0">
            <p className="font-semibold">{f.question.fr}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{f.answer.fr}</p>
          </div>
        )}
      />
      <EditorDialog
        open={editor.isOpen}
        onOpenChange={editor.onOpenChange}
        title={editor.item ? "Modifier la question" : "Nouvelle question"}
        isSubmitting={editor.isSubmitting}
      >
        <FaqForm item={editor.item} onSubmit={editor.submit} />
      </EditorDialog>
    </>
  );
};
