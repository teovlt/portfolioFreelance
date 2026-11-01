import { useState } from "react";
import { toast } from "sonner";
import { Inbox, Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";
import { useAdminInbox } from "@/hooks/useAdminInbox";
import { cn } from "@/lib/utils";
import type { ContactMessage } from "@/types/content";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

export const AdminMessages = () => {
  const { items, isLoading, error, update, remove } = useAdminInbox<ContactMessage>("messages");
  const [openId, setOpenId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<ContactMessage | null>(null);
  const unread = items.filter((m) => !m.read).length;

  const setRead = async (message: ContactMessage, read: boolean) => {
    try {
      await update(message._id, { read });
    } catch {
      toast.error("Modification impossible.");
    }
  };

  // Opening a message marks it as read
  const toggle = (message: ContactMessage) => {
    setOpenId(openId === message._id ? null : message._id);
    if (!message.read) setRead(message, true);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-3">Demandes</p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Messages</h1>
        <p className="mt-2 text-muted-foreground">
          Envoyés depuis le formulaire de contact.{" "}
          {unread > 0 && `${unread} non lu${unread > 1 ? "s" : ""}.`}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <Inbox className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
          <p className="font-medium">Aucun message</p>
          <p className="text-sm text-muted-foreground">Les messages envoyés depuis le site apparaîtront ici.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
          {items.map((m) => {
            const isOpen = openId === m._id;
            return (
              <li key={m._id}>
                <button
                  type="button"
                  onClick={() => toggle(m)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                >
                  <span className={cn("mt-2 h-2 w-2 flex-shrink-0 rounded-full", m.read ? "bg-transparent" : "bg-accent")} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className={cn("truncate", !m.read && "font-semibold")}>{m.name}</p>
                      <span className="flex-shrink-0 text-xs text-muted-foreground">{formatDate(m.createdAt)}</span>
                    </div>
                    <p className={cn("truncate text-sm", m.read ? "text-muted-foreground" : "font-medium")}>{m.subject}</p>
                    {!isOpen && <p className="truncate text-sm text-muted-foreground">{m.message}</p>}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pl-10 space-y-4">
                    <p className="text-sm whitespace-pre-line leading-relaxed">{m.message}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm" asChild>
                        <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`}>
                          <Reply />
                          Répondre à {m.email}
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setRead(m, !m.read)}>
                        {m.read ? <Mail /> : <MailOpen />}
                        {m.read ? "Marquer non lu" : "Marquer lu"}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        title="Supprimer"
                        onClick={() => setToDelete(m)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDeleteDialog
        label={toDelete && `Le message de ${toDelete.name}`}
        onCancel={() => setToDelete(null)}
        onConfirm={() => remove(toDelete!._id)}
      />
    </div>
  );
};
