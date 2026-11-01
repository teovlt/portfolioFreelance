import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Same confirmation as CollectionPage's, for pages that don't use it
export const ConfirmDeleteDialog = ({
  label,
  onCancel,
  onConfirm,
}: {
  // What's being deleted; the dialog is open while it's set
  label: string | null;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const confirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      toast.success(`${label} supprimé.`);
      onCancel();
    } catch {
      toast.error("Suppression impossible.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={!!label} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer cet élément ?</DialogTitle>
          <DialogDescription>{label} sera définitivement supprimé. Cette action est irréversible.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={confirm} disabled={isDeleting}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
