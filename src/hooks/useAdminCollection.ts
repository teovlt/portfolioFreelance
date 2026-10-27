import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { CONTENT_CHANGED_EVENT } from "./useStats";

const notifyChange = () => window.dispatchEvent(new Event(CONTENT_CHANGED_EVENT));

// Admin side of a collection served by the server's createCrudRouter
export const useAdminCollection = <T extends { _id: string }>(resource: string) => {
  const { token } = useAuth();
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      setItems(await apiRequest<T[]>(`/${resource}/admin`, { token }));
    } catch {
      setError("Impossible de charger le contenu.");
    } finally {
      setIsLoading(false);
    }
  }, [resource, token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = async (values: Partial<T>, id?: string) => {
    const saved = id
      ? await apiRequest<T>(`/${resource}/${id}`, { method: "PUT", body: values, token })
      : await apiRequest<T>(`/${resource}`, { method: "POST", body: values, token });
    setItems((current) => (id ? current.map((item) => (item._id === id ? saved : item)) : [...current, saved]));
    notifyChange();
    return saved;
  };

  const remove = async (id: string) => {
    await apiRequest(`/${resource}/${id}`, { method: "DELETE", token });
    setItems((current) => current.filter((item) => item._id !== id));
    notifyChange();
  };

  // Swaps `item` with its neighbour in `scope` (the list as currently shown,
  // possibly filtered), then persists the order of the whole collection
  const move = async (item: T, direction: -1 | 1, scope: T[] = items) => {
    const neighbour = scope[scope.findIndex((i) => i._id === item._id) + direction];
    if (!neighbour) return;

    const next = [...items];
    const a = next.findIndex((i) => i._id === item._id);
    const b = next.findIndex((i) => i._id === neighbour._id);
    [next[a], next[b]] = [next[b], next[a]];
    setItems(next);

    try {
      setItems(await apiRequest<T[]>(`/${resource}/reorder`, { method: "PUT", body: { ids: next.map((i) => i._id) }, token }));
    } catch (err) {
      refresh();
      throw err;
    }
  };

  return { items, isLoading, error, refresh, save, remove, move };
};
