import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import type { Stats } from "@/types/content";

export const CONTENT_CHANGED_EVENT = "admin:content-changed";

// Refetches whenever `refreshKey` changes or a collection is edited, so the
// pending-reviews badge stays current after moderating
export const useStats = (refreshKey?: unknown) => {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState(0);

  useEffect(() => {
    const onChange = () => setChanges((n) => n + 1);
    window.addEventListener(CONTENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONTENT_CHANGED_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (!token) return;
    apiRequest<Stats>("/stats", { token })
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch(() => setError("Impossible de charger les statistiques."))
      .finally(() => setIsLoading(false));
  }, [token, refreshKey, changes]);

  return { stats, isLoading, error };
};
