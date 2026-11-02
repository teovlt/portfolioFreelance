import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, Check, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { apiRequest, ApiError } from "@/lib/api";
import type { Availability } from "@/types/content";
import { makeBookingSchema, type BookingValues } from "@/lib/zod";

interface BookingCalendarProps {
  packageName?: string | null;
}

// Calendar cells are local dates; the server speaks in YYYY-MM-DD strings
function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs font-medium text-destructive -mt-1.5">{message}</p> : null;

export function BookingCalendar({ packageName }: BookingCalendarProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr-FR" : "en-US";

  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [availability, setAvailability] = useState<Availability | null>(null);

  const schema = useMemo(() => makeBookingSchema(t), [t]);
  const form = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", details: "", website2: "" },
  });

  const { errors } = form.formState;

  const loadAvailability = useCallback(async () => {
    const from = toKey(new Date(viewDate.getFullYear(), viewDate.getMonth(), 1));
    const to = toKey(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0));
    try {
      setAvailability(await apiRequest<Availability>(`/bookings/availability?from=${from}&to=${to}`));
    } catch {
      setAvailability(null);
    }
  }, [viewDate]);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  // Open slots for a day: not booked, and not already past in Paris time
  const openSlots = useCallback(
    (date: Date) => {
      if (!availability) return [];
      const key = toKey(date);
      const taken = availability.taken[key] ?? [];
      return availability.slots.filter((slot) => !taken.includes(slot) && !(key === availability.now.date && slot <= availability.now.time));
    },
    [availability],
  );

  const isUnavailable = (date: Date) => {
    const key = toKey(date);
    if (!availability || isWeekend(date)) return true;
    return key < availability.now.date || key > availability.maxDate || openSlots(date).length === 0;
  };

  const weekdayLabels = useMemo(() => {
    const base = new Date(2024, 0, 1); // a Monday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return new Intl.DateTimeFormat(lang, { weekday: "short" }).format(d).slice(0, 2);
    });
  }, [lang]);

  const monthLabel = new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(viewDate);

  const days = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = Array.from({ length: startOffset }, () => null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [viewDate]);

  const changeMonth = (delta: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const canGoBack = useMemo(() => {
    const today = new Date();
    return viewDate.getFullYear() > today.getFullYear() || viewDate.getMonth() > today.getMonth();
  }, [viewDate]);

  async function onSubmit(values: BookingValues) {
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);
    try {
      await apiRequest("/bookings", {
        method: "POST",
        body: { ...values, package: packageName ?? "", date: toKey(selectedDate), time: selectedSlot },
      });
      setSubmitted(true);
      loadAvailability();
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        toast.error(t("contact.booking.slotTaken"));
        setSelectedSlot(null);
        loadAvailability();
      } else {
        toast.error(t("contact.error"));
      }
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setSelectedDate(null);
    setSelectedSlot(null);
    form.reset();
  }

  if (submitted && selectedDate && selectedSlot) {
    const dateLabel = new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long" }).format(selectedDate);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-border bg-card p-10 text-center flex flex-col items-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground mb-5">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-display font-bold mb-2">{t("contact.booking.successTitle")}</h3>
        <p className="text-sm text-muted-foreground max-w-xs mb-1">{t("contact.booking.successBody")}</p>
        <p className="text-sm font-semibold capitalize">
          {dateLabel} · {selectedSlot}
        </p>
        <p className="text-xs text-muted-foreground mb-6">{packageName || " "}</p>
        <Button variant="outline" onClick={reset}>
          {t("contact.booking.another")}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="grid md:grid-cols-[1.1fr_0.9fr]">
        {/* Calendar */}
        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold capitalize">{monthLabel}</h3>
            <div className="flex gap-1.5">
              <button
                aria-label="Previous month"
                disabled={!canGoBack}
                onClick={() => changeMonth(-1)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                aria-label="Next month"
                onClick={() => changeMonth(1)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-1.5 text-center">
            {weekdayLabels.map((label, i) => (
              <div key={i} className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground pb-2">
                {label}
              </div>
            ))}
            {days.map((date, i) => {
              if (!date) return <div key={i} />;
              const disabled = isUnavailable(date);
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  className={`aspect-square rounded-full text-sm flex items-center justify-center mx-auto w-9 transition-colors ${
                    disabled
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : isSelected
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slots + form */}
        <div className="p-6 sm:p-8 flex flex-col">
          {packageName && (
            <div className="flex items-center gap-2 mb-5 text-xs">
              <span className="text-muted-foreground">{t("contact.booking.forLabel")}</span>
              <span className="font-semibold">{packageName}</span>
            </div>
          )}
          <AnimatePresence mode="wait">
            {!selectedDate ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center text-sm text-muted-foreground gap-3 py-10"
              >
                <CalendarCheck className="h-6 w-6 text-muted-foreground/50" />
                {t("contact.booking.pickDate")}
              </motion.div>
            ) : (
              <motion.div
                key={selectedDate.toDateString()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 capitalize">
                  {new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long" }).format(selectedDate)}
                </p>
                {openSlots(selectedDate).length === 0 && (
                  <p className="text-sm text-muted-foreground mb-6">{t("contact.booking.noSlots")}</p>
                )}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {openSlots(selectedDate).map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-10 rounded-full border text-sm flex items-center justify-center gap-1.5 transition-colors ${
                        selectedSlot === slot
                          ? "bg-primary border-primary text-primary-foreground font-semibold"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {slot}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedSlot && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3 overflow-hidden"
                    >
                      <Input
                        autoComplete="name"
                        placeholder={t("contact.form.name.placeholder")}
                        aria-label={t("contact.form.name.label")}
                        aria-invalid={!!errors.name}
                        className={errors.name ? "border-destructive/60" : undefined}
                        {...form.register("name")}
                      />
                      <FieldError message={errors.name?.message} />
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder={t("contact.form.email.placeholder")}
                        aria-label={t("contact.form.email.label")}
                        aria-invalid={!!errors.email}
                        className={errors.email ? "border-destructive/60" : undefined}
                        {...form.register("email")}
                      />
                      <FieldError message={errors.email?.message} />
                      <Input
                        type="tel"
                        autoComplete="tel"
                        placeholder={t("contact.booking.phonePlaceholder")}
                        aria-label={t("contact.booking.phonePlaceholder")}
                        aria-invalid={!!errors.phone}
                        className={errors.phone ? "border-destructive/60" : undefined}
                        {...form.register("phone")}
                      />
                      <FieldError message={errors.phone?.message} />
                      <Textarea
                        placeholder={t("contact.booking.detailsPlaceholder")}
                        aria-label={t("contact.booking.detailsPlaceholder")}
                        className="min-h-20 resize-none"
                        {...form.register("details")}
                      />
                      {/* Honeypot, see lib/zod */}
                      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                        <label>
                          Leave empty
                          <input tabIndex={-1} autoComplete="off" {...form.register("website2")} />
                        </label>
                      </div>
                      <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? t("contact.booking.sending") : t("contact.booking.confirm")}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
