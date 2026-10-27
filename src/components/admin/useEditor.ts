import { useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";

// Open/close + submit state for a collection's editor dialog
export const useEditor = <T extends { _id: string }>(save: (values: Partial<T>, id?: string) => Promise<T>) => {
  const [target, setTarget] = useState<T | "new" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const item = target && target !== "new" ? target : undefined;

  const submit = async (values: Partial<T>) => {
    setIsSubmitting(true);
    try {
      await save(values, item?._id);
      toast.success("Enregistré.");
      setTarget(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Enregistrement impossible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen: target !== null,
    item,
    openNew: () => setTarget("new"),
    openEdit: (value: T) => setTarget(value),
    onOpenChange: (open: boolean) => !open && setTarget(null),
    isSubmitting,
    submit,
  };
};
