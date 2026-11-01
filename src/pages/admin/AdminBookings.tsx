import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CalendarClock, Check, Mail, Phone, RotateCcw, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";
import { useAdminInbox } from "@/hooks/useAdminInbox";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { BookingStatus, type Booking } from "@/types/content";

const statusMeta: Record<BookingStatus, { label: string; dot: string; badge: string }> = {
  [BookingStatus.PENDING]: {
    label: "À confirmer",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
  [BookingStatus.CONFIRMED]: {
    label: "Confirmé",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  [BookingStatus.DECLINED]: {
    label: "Refusé",
    dot: "bg-muted-foreground",
    badge: "bg-muted text-muted-foreground border-border",
  },
};

type Filter = "upcoming" | "past" | BookingStatus.DECLINED;

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`),
  );

export const AdminBookings = () => {
  const { items, isLoading, error, update, remove } = useAdminInbox<Booking>("bookings");
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [toDelete, setToDelete] = useState<Booking | null>(null);
  const today = todayKey();

  const groups = useMemo(() => {
    const active = items.filter((b) => b.status !== BookingStatus.DECLINED);
    return {
      // Soonest first for what's coming, most recent first for history
      upcoming: active.filter((b) => b.date >= today).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
      past: active.filter((b) => b.date < today),
      [BookingStatus.DECLINED]: items.filter((b) => b.status === BookingStatus.DECLINED),
    };
  }, [items, today]);

  // Land on the history when nothing is coming up
  useEffect(() => {
    if (!isLoading && groups.upcoming.length === 0 && groups.past.length > 0) setFilter("past");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const setStatus = async (booking: Booking, status: BookingStatus) => {
    try {
      await update(booking._id, { status }, "/status");
      toast.success(
        {
          [BookingStatus.CONFIRMED]: "Rendez-vous confirmé.",
          [BookingStatus.DECLINED]: "Rendez-vous refusé, le créneau est de nouveau libre.",
          [BookingStatus.PENDING]: "Rendez-vous remis en attente.",
        }[status],
      );
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Modification impossible.");
    }
  };

  const filters: { value: Filter; label: string }[] = [
    { value: "upcoming", label: "À venir" },
    { value: "past", label: "Passés" },
    { value: BookingStatus.DECLINED, label: "Refusés" },
  ];
  const shown = groups[filter];

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-3">Demandes</p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Rendez-vous</h1>
        <p className="mt-2 text-muted-foreground">
          Les appels réservés depuis le site. Un créneau réservé n'est plus proposé ; le refuser le libère.
        </p>
      </div>

      <div className="flex gap-1 overflow-x-auto">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              "flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              filter === value ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {label}
            <span className={cn("tabular-nums", filter === value ? "opacity-60" : "opacity-50")}>{groups[value].length}</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <CalendarClock className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
          <p className="font-medium">Aucun rendez-vous</p>
          <p className="text-sm text-muted-foreground">Les appels réservés sur le site apparaîtront ici.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((b) => {
            const meta = statusMeta[b.status];
            return (
              <li key={b._id} className="rounded-2xl border border-border bg-card p-5 flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="lg:w-52 flex-shrink-0">
                  <p className="font-semibold capitalize">{formatDate(b.date)}</p>
                  <p className="font-serif text-2xl font-semibold">{b.time}</p>
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{b.name}</p>
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", meta.badge)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                      {meta.label}
                    </span>
                    {b.package && <span className="text-xs text-muted-foreground">· {b.package}</span>}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <a href={`tel:${b.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      {b.phone}
                    </a>
                    <a href={`mailto:${b.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground truncate">
                      <Mail className="h-3.5 w-3.5" />
                      {b.email}
                    </a>
                  </div>
                  {b.details && <p className="text-sm whitespace-pre-line">{b.details}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  {b.status === BookingStatus.PENDING && (
                    <Button size="sm" onClick={() => setStatus(b, BookingStatus.CONFIRMED)}>
                      <Check />
                      Confirmer
                    </Button>
                  )}
                  {b.status !== BookingStatus.DECLINED ? (
                    <Button size="sm" variant="outline" onClick={() => setStatus(b, BookingStatus.DECLINED)}>
                      <X />
                      Refuser
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setStatus(b, BookingStatus.PENDING)}>
                      <RotateCcw />
                      Rétablir
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    title="Supprimer"
                    onClick={() => setToDelete(b)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDeleteDialog
        label={toDelete && `Le rendez-vous de ${toDelete.name}`}
        onCancel={() => setToDelete(null)}
        onConfirm={() => remove(toDelete!._id)}
      />
    </div>
  );
};
