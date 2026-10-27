import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";

const buildSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().trim().min(2, t("reviews.form.errors.name")),
    email: z.string().trim().email(t("reviews.form.errors.email")).optional().or(z.literal("")),
    company: z.string().optional(),
    project: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().min(10, t("reviews.form.errors.comment")),
    website: z
      .string()
      .trim()
      .regex(/^https?:\/\/\S+$/, t("reviews.form.errors.website"))
      .optional()
      .or(z.literal("")),
    // Honeypot, hidden from humans
    website2: z.string().optional(),
  });

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

const emptyValues: FormValues = { name: "", email: "", company: "", project: "", rating: 5, comment: "", website: "", website2: "" };

export const ReviewDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { t, i18n } = useTranslation();
  const [sent, setSent] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(buildSchema(t)), defaultValues: emptyValues });
  const rating = watch("rating");

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next && sent) {
      // Start fresh next time once the dialog has finished closing
      setTimeout(() => {
        setSent(false);
        reset(emptyValues);
      }, 200);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await apiRequest("/reviews/submit", { method: "POST", body: { ...values, lang: i18n.language === "en" ? "en" : "fr" } });
      setSent(true);
    } catch {
      toast.error(t("reviews.form.error"));
    }
  };

  const optional = <span className="font-normal text-muted-foreground">({t("reviews.form.optional")})</span>;
  const error = (message?: string) => (message ? <p className="text-xs font-medium text-destructive">{message}</p> : null);
  const shownRating = hovered ?? rating;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto">
        {sent ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <DialogTitle className="mt-5 font-display text-2xl">{t("reviews.form.successTitle")}</DialogTitle>
            <DialogDescription className="mt-2 max-w-sm">{t("reviews.form.successText")}</DialogDescription>
            <Button className="mt-8" onClick={() => handleOpenChange(false)}>
              {t("reviews.form.close")}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">{t("reviews.form.title")}</DialogTitle>
              <DialogDescription>{t("reviews.form.description")}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
              <div className="space-y-2">
                <Label>{t("reviews.form.rating")}</Label>
                <div className="flex gap-1" onMouseLeave={() => setHovered(null)}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setValue("rating", value)}
                      onMouseEnter={() => setHovered(value)}
                      aria-label={`${value}/5`}
                      aria-pressed={value === rating}
                      className="p-0.5"
                    >
                      <Star className={cn("h-7 w-7 transition-colors", value <= shownRating ? "fill-accent text-accent" : "text-border")} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="review-name">{t("reviews.form.name")}</Label>
                  <Input id="review-name" autoComplete="name" placeholder={t("reviews.form.namePlaceholder")} {...register("name")} />
                  {error(errors.name?.message)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-email">
                    {t("reviews.form.email")} {optional}
                  </Label>
                  <Input id="review-email" type="email" autoComplete="email" {...register("email")} />
                  {errors.email ? (
                    error(errors.email.message)
                  ) : (
                    <p className="text-xs text-muted-foreground">{t("reviews.form.emailHint")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-company">
                    {t("reviews.form.company")} {optional}
                  </Label>
                  <Input id="review-company" placeholder={t("reviews.form.companyPlaceholder")} {...register("company")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-project">
                    {t("reviews.form.project")} {optional}
                  </Label>
                  <Input id="review-project" placeholder={t("reviews.form.projectPlaceholder")} {...register("project")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-comment">{t("reviews.form.comment")}</Label>
                <Textarea
                  id="review-comment"
                  rows={5}
                  className="resize-none"
                  placeholder={t("reviews.form.commentPlaceholder")}
                  {...register("comment")}
                />
                {error(errors.comment?.message)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-website">
                  {t("reviews.form.website")} {optional}
                </Label>
                <Input id="review-website" type="url" placeholder="https://..." {...register("website")} />
                {error(errors.website?.message)}
              </div>

              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Leave empty
                  <input tabIndex={-1} autoComplete="off" {...register("website2")} />
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("reviews.form.submitting") : t("reviews.form.submit")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
