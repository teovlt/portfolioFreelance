import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";

// Open/close + submit state for a collection's editor dialog. The dialog can
// also be opened from a link: `?new` for a new item, `?edit=<id>` for an
// existing one (used by the dashboard's quick actions).
export const useEditor = <T extends { _id: string }>(save: (values: Partial<T>, id?: string) => Promise<T>, items: T[] = []) => {
  const [target, setTarget] = useState<T | "new" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const editId = params.get("edit");
    if (!editId && !params.has("new")) return;

    if (editId) {
      // Wait for the collection to load before looking the item up
      const found = items.find((i) => i._id === editId);
      if (!found) return;
      setTarget(found);
    } else {
      setTarget("new");
    }

    params.delete("edit");
    params.delete("new");
    setParams(params, { replace: true });
  }, [params, setParams, items]);

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
