import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import type { Project } from "@/types/project";

// The public site only gets published projects; `admin` also returns hidden ones
export const useProjects = ({ admin = false }: { admin?: boolean } = {}) => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = admin ? await apiRequest<Project[]>("/projects/admin", { token }) : await apiRequest<Project[]>("/projects");
      setProjects(data);
    } catch {
      setError("Impossible de charger les projets.");
    } finally {
      setIsLoading(false);
    }
  }, [admin, token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, setProjects, isLoading, error, refresh };
};
