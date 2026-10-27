import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs font-medium text-destructive">{message}</p> : null;

export const Field = ({
  label,
  htmlFor,
  hint,
  error,
  optional,
  className,
  children,
}: {
  label: React.ReactNode;
  htmlFor?: string;
  hint?: React.ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("space-y-2", className)}>
    <Label htmlFor={htmlFor} className="flex items-center gap-1.5">
      {label}
      {optional && <span className="font-normal text-muted-foreground">(optionnel)</span>}
    </Label>
    {children}
    {error ? <FieldError message={error} /> : hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const LangTag = ({ lang }: { lang: "fr" | "en" }) => (
  <span className="pointer-events-none absolute right-2 top-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
    {lang}
  </span>
);

// One label, a French and an English input side by side
export const LocalizedField = ({
  label,
  fr,
  en,
  errors,
  multiline,
  rows = 3,
  optional,
  hint,
  placeholder,
}: {
  label: string;
  fr: UseFormRegisterReturn;
  en: UseFormRegisterReturn;
  errors?: { fr?: { message?: string }; en?: { message?: string } };
  multiline?: boolean;
  rows?: number;
  optional?: boolean;
  hint?: string;
  placeholder?: { fr?: string; en?: string };
}) => {
  const error = errors?.fr?.message ?? errors?.en?.message;
  const Control = multiline ? Textarea : Input;

  return (
    <Field
      label={label}
      htmlFor={fr.name}
      error={error ? `${error} (${errors?.fr?.message ? "FR" : "EN"})` : undefined}
      optional={optional}
      hint={hint}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {(["fr", "en"] as const).map((lang) => (
          <div key={lang} className="relative">
            <Control
              id={lang === "fr" ? fr.name : en.name}
              rows={multiline ? rows : undefined}
              placeholder={placeholder?.[lang]}
              className={cn("pr-10", errors?.[lang] && "border-destructive/60")}
              {...(lang === "fr" ? fr : en)}
            />
            <LangTag lang={lang} />
          </div>
        ))}
      </div>
    </Field>
  );
};
