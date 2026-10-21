import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { Project } from "@/types/project";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<Project[]>("/projects");
      setProjects(data);
    } catch {
      setError("Impossible de charger les projets.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, isLoading, error, refresh };
};
