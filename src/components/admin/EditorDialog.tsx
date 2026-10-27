import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const EDITOR_FORM_ID = "collection-editor-form";

// Scrollable dialog hosting a collection item's form. The form inside must use
// id={EDITOR_FORM_ID} so the footer's save button can submit it.
export const EditorDialog = ({
  open,
  onOpenChange,
  title,
  description,
  isSubmitting,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="flex max-h-[92vh] max-w-3xl flex-col gap-0 p-0">
      <DialogHeader className="border-b border-border px-6 py-5">
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">{children}</div>
      <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
          Annuler
        </Button>
        <Button type="submit" form={EDITOR_FORM_ID} disabled={isSubmitting}>
          <Save />
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
