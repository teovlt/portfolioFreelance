import { cn } from "@/lib/utils";
import { ProjectStatus } from "@/types/project";

export const statusMeta: Record<ProjectStatus, { label: string; dot: string; badge: string }> = {
  [ProjectStatus.DONE]: {
    label: "Terminé",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  [ProjectStatus.ONGOING]: {
    label: "En cours",
    dot: "bg-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  [ProjectStatus.STARTED]: {
    label: "Démarré",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
};

export const ProjectStatusBadge = ({ status, className }: { status: ProjectStatus; className?: string }) => {
  const meta = statusMeta[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", meta.badge, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
};
