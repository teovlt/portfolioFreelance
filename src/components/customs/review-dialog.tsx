import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { CheckCircle2, ImagePlus, Linkedin, Star, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";
import { PhotoSource } from "@/types/content";

const MAX_PHOTO_SIZE = 8 * 1024 * 1024;

const buildSchema = (t: (key: string) => string) =>
  z
    .object({
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
    photoSource: z.nativeEnum(PhotoSource),
    photo: z.instanceof(File).optional(),
    linkedinConsent: z.boolean(),
    // Honeypot, hidden from humans
    website2: z.string().optional(),
  })
    .superRefine((values, ctx) => {
      if (values.photoSource === PhotoSource.UPLOAD) {
        if (!values.photo) ctx.addIssue({ code: "custom", path: ["photo"], message: t("reviews.form.errors.photo") });
        else if (values.photo.size > MAX_PHOTO_SIZE) ctx.addIssue({ code: "custom", path: ["photo"], message: t("reviews.form.errors.photoSize") });
      }
      if (values.photoSource === PhotoSource.LINKEDIN) {
        if (!values.linkedinConsent) ctx.addIssue({ code: "custom", path: ["linkedinConsent"], message: t("reviews.form.errors.consent") });
        if (!/^https?:\/\/([\w-]+\.)*linkedin\.com\//i.test(values.website ?? ""))
          ctx.addIssue({ code: "custom", path: ["website"], message: t("reviews.form.errors.linkedin") });
      }
    });

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

const emptyValues: FormValues = {
  name: "",
  email: "",
  company: "",
  project: "",
  rating: 5,
  comment: "",
  website: "",
  photoSource: PhotoSource.NONE,
  photo: undefined,
  linkedinConsent: false,
  website2: "",
};

const photoChoices = [
  { value: PhotoSource.UPLOAD, icon: ImagePlus },
  { value: PhotoSource.LINKEDIN, icon: Linkedin },
  { value: PhotoSource.NONE, icon: UserRound },
] as const;

export const ReviewDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { t, i18n } = useTranslation();
  const [sent, setSent] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(buildSchema(t)), defaultValues: emptyValues });
  const [rating, photoSource, photo, linkedinConsent] = watch(["rating", "photoSource", "photo", "linkedinConsent"]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photo);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

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
      // Multipart so the optional photo is sent with the review in one request
      const body = new FormData();
      const fields = ["name", "email", "company", "project", "rating", "comment", "website", "photoSource", "website2"] as const;
      for (const key of fields) body.append(key, String(values[key] ?? ""));
      body.append("lang", i18n.language === "en" ? "en" : "fr");
      if (values.photoSource === PhotoSource.UPLOAD && values.photo) body.append("photo", values.photo);
      await apiRequest("/reviews/submit", { method: "POST", body });
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
                  {photoSource === PhotoSource.LINKEDIN ? t("reviews.form.linkedinUrl") : t("reviews.form.website")}{" "}
                  {photoSource !== PhotoSource.LINKEDIN && optional}
                </Label>
                <Input
                  id="review-website"
                  type="url"
                  placeholder={photoSource === PhotoSource.LINKEDIN ? "https://www.linkedin.com/in/..." : "https://..."}
                  {...register("website")}
                />
                {error(errors.website?.message)}
              </div>

              <div className="space-y-3">
                <Label>{t("reviews.form.photo")}</Label>
                <div role="radiogroup" className="grid grid-cols-3 gap-2">
                  {photoChoices.map(({ value, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={photoSource === value}
                      onClick={() => {
                        setValue("photoSource", value);
                        // Errors from the previous choice no longer apply
                        clearErrors(["photo", "linkedinConsent", "website"]);
                      }}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center text-xs font-medium transition-colors",
                        photoSource === value ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {t(`reviews.form.photoChoices.${value}`)}
                    </button>
                  ))}
                </div>

                {photoSource === PhotoSource.UPLOAD && (
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                      {photoPreview ? (
                        <img src={photoPreview} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <UserRound className="m-auto h-full w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <Input
                        id="review-photo"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                        className="cursor-pointer"
                        onChange={(e) => setValue("photo", e.target.files?.[0], { shouldValidate: true })}
                      />
                      {errors.photo ? error(errors.photo.message) : <p className="text-xs text-muted-foreground">{t("reviews.form.photoHint")}</p>}
                    </div>
                  </div>
                )}

                {photoSource === PhotoSource.LINKEDIN && (
                  <div className="space-y-1">
                    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                      <input
                        type="checkbox"
                        checked={linkedinConsent}
                        onChange={(e) => setValue("linkedinConsent", e.target.checked, { shouldValidate: true })}
                        className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary"
                      />
                      <span className="text-muted-foreground">{t("reviews.form.linkedinConsent")}</span>
                    </label>
                    {error(errors.linkedinConsent?.message)}
                  </div>
                )}
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
