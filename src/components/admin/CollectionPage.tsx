import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

type CollectionPageProps<T extends { _id: string }> = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  newLabel: string;
  onNew: () => void;
  // Items as shown (already filtered); reorder arrows move within this list
  items: T[];
  isLoading: boolean;
  error: string | null;
  layout?: "list" | "grid";
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  emptyTitle: string;
  emptyText: string;
  itemLabel: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  // Extra buttons shown before the standard edit / delete actions
  renderActions?: (item: T) => React.ReactNode;
  onEdit: (item: T) => void;
  onDelete: (item: T) => Promise<void>;
  onMove?: (item: T, direction: -1 | 1) => Promise<void>;
  isVisible?: (item: T) => boolean;
  onToggleVisible?: (item: T) => Promise<void>;
};

const iconButton = "h-8 w-8";

export const CollectionPage = <T extends { _id: string }>({
  title,
  description,
  icon: Icon,
  newLabel,
  onNew,
  items,
  isLoading,
  error,
  layout = "list",
  toolbar,
  footer,
  emptyTitle,
  emptyText,
  itemLabel,
  renderItem,
  renderActions,
  onEdit,
  onDelete,
  onMove,
  isVisible,
  onToggleVisible,
}: CollectionPageProps<T>) => {
  const [toDelete, setToDelete] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const run = async (action: () => Promise<void>, fallback: string) => {
    try {
      await action();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : fallback);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setIsDeleting(true);
    await run(async () => {
      await onDelete(toDelete);
      toast.success(`"${itemLabel(toDelete)}" supprimé.`);
      setToDelete(null);
    }, "Suppression impossible.");
    setIsDeleting(false);
  };

  const actions = (item: T, index: number) => {
    const visible = isVisible?.(item) ?? true;
    return (
      <div className="flex items-center justify-end gap-0.5">
        {onMove && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={iconButton}
              title="Monter"
              disabled={index === 0}
              onClick={() => run(() => onMove(item, -1), "Réorganisation impossible.")}
            >
              <ChevronUp />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={iconButton}
              title="Descendre"
              disabled={index === items.length - 1}
              onClick={() => run(() => onMove(item, 1), "Réorganisation impossible.")}
            >
              <ChevronDown />
            </Button>
          </>
        )}
        {onToggleVisible && (
          <Button
            variant="ghost"
            size="icon"
            className={iconButton}
            title={visible ? "Masquer du site" : "Afficher sur le site"}
            onClick={() => run(() => onToggleVisible(item), "Modification impossible.")}
          >
            {visible ? <Eye /> : <EyeOff className="text-muted-foreground" />}
          </Button>
        )}
        {renderActions?.(item)}
        <Button variant="ghost" size="icon" className={iconButton} title="Modifier" onClick={() => onEdit(item)}>
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(iconButton, "hover:bg-destructive/10 hover:text-destructive")}
          title="Supprimer"
          onClick={() => setToDelete(item)}
        >
          <Trash2 />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Contenu</p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        <Button size="lg" className="w-fit" onClick={onNew}>
          <Plus />
          {newLabel}
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {toolbar && <div className="flex flex-col md:flex-row md:items-center gap-3 border-b border-border p-4">{toolbar}</div>}

        {isLoading && (
          <div className="divide-y divide-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-12 w-12 rounded-lg bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-40 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="px-5 py-10 text-center text-sm text-destructive">{error}</p>}

        {!isLoading && !error && items.length === 0 && (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-4 font-semibold">{emptyTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{emptyText}</p>
          </div>
        )}

        {!isLoading && !error && items.length > 0 && layout === "list" && (
          <ul className="divide-y divide-border">
            {items.map((item, index) => (
              <li
                key={item._id}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-5 py-4 hover:bg-muted/40 transition-colors",
                  isVisible && !isVisible(item) && "opacity-60",
                )}
              >
                <div className="min-w-0 flex-1">{renderItem(item)}</div>
                {actions(item, index)}
              </li>
            ))}
          </ul>
        )}

        {!isLoading && !error && items.length > 0 && layout === "grid" && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {items.map((item, index) => (
              <li
                key={item._id}
                className={cn(
                  "overflow-hidden rounded-xl border border-border bg-background",
                  isVisible && !isVisible(item) && "opacity-60",
                )}
              >
                {renderItem(item)}
                <div className="border-t border-border px-2 py-1.5">{actions(item, index)}</div>
              </li>
            ))}
          </ul>
        )}

        {footer}
      </div>

      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer cet élément ?</DialogTitle>
            <DialogDescription>
              "{toDelete && itemLabel(toDelete)}" sera définitivement supprimé. Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
