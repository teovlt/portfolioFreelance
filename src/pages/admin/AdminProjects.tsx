import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/providers/auth-provider";
import { apiRequest, ApiError } from "@/lib/api";
import type { Project } from "@/types/project";

export const AdminProjects = () => {
  const { projects, isLoading, error, refresh } = useProjects();
  const { token } = useAuth();
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setIsDeleting(true);
    try {
      await apiRequest(`/projects/${toDelete.slug}`, { method: "DELETE", token });
      toast.success(`"${toDelete.title}" supprimé.`);
      setToDelete(null);
      refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Suppression impossible.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Projets</h1>
        <Button asChild>
          <Link to="/admin/projects/new">
            <Plus className="w-4 h-4" />
            Nouveau projet
          </Link>
        </Button>
      </div>

      {isLoading && <p className="text-muted-foreground">Chargement...</p>}
      {error && <p className="text-destructive">{error}</p>}

      <div className="space-y-3">
        {projects.map((project) => (
          <Card key={project._id} className="p-4 flex items-center gap-4">
            <img src={project.image} alt={project.title} className="w-16 h-11 rounded-md object-cover border border-border flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{project.title}</p>
              <p className="text-sm text-muted-foreground truncate">{project.stack.join(", ")}</p>
            </div>
            <Badge variant="outline" className="flex-shrink-0">
              {project.status}
            </Badge>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button asChild variant="outline" size="icon">
                <Link to={`/admin/projects/${project.slug}/edit`}>
                  <Pencil className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" onClick={() => setToDelete(project)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer ce projet ?</DialogTitle>
            <DialogDescription>
              "{toDelete?.title}" sera définitivement supprimé. Cette action est irréversible.
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
