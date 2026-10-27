import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "./fields";

// A bullet list where every line has a French and an English version
export const BilingualListField = ({
  label,
  name,
  control,
  register,
  error,
  addLabel = "Ajouter une ligne",
}: {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  addLabel?: string;
}) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <span className="flex h-9 w-6 flex-shrink-0 items-center justify-center text-xs font-semibold tabular-nums text-muted-foreground">
              {index + 1}
            </span>
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              <Input placeholder="FR" {...register(`${name}.${index}.fr`)} />
              <Input placeholder="EN" {...register(`${name}.${index}.en`)} />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => remove(index)}
              aria-label="Retirer"
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
      <FieldError message={error} />
      <Button type="button" variant="outline" size="sm" onClick={() => append({ fr: "", en: "" })}>
        <Plus />
        {addLabel}
      </Button>
    </div>
  );
};
