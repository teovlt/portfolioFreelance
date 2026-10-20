"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, Check, ChevronLeft, ChevronRight, Clock } from "lucide-react";

const ALL_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  details: z.string().optional(),
});

interface BookingCalendarProps {
  packageName?: string | null;
}

function slotsForDate(date: Date) {
  return ALL_SLOTS.filter((_, i) => (date.getDate() + i) % 4 !== 0);
}

function isPast(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function BookingCalendar({ packageName }: BookingCalendarProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr-FR" : "en-US";

  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", details: "" },
  });

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

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);
    const dateLabel = new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long" }).format(selectedDate);

    const messageParts = [
      `${values.name} — ${t("contact.booking.formMessage", { date: dateLabel, time: selectedSlot })}`,
      values.details ? t("contact.booking.detailsSuffix", { details: values.details }) : null,
    ].filter(Boolean);

    try {
      const response = await fetch("https://formspree.io/f/mdkgvoeq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          subject: packageName ? `${t("contact.booking.formSubject")} — ${packageName}` : t("contact.booking.formSubject"),
          message: messageParts.join(" "),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        toast.error(t("contact.error"));
      }
    } catch (error) {
      toast.error(t("contact.failure"));
      console.error(error);
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
              const disabled = isPast(date) || isWeekend(date);
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
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {slotsForDate(selectedDate).map((slot) => (
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
                      <Input placeholder={t("contact.form.name.placeholder")} {...form.register("name")} />
                      <Input placeholder={t("contact.form.email.placeholder")} {...form.register("email")} />
                      <Textarea
                        placeholder={t("contact.booking.detailsPlaceholder")}
                        className="min-h-20 resize-none"
                        {...form.register("details")}
                      />
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
