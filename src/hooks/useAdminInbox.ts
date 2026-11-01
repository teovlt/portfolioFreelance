import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { CONTENT_CHANGED_EVENT } from "./useStats";

const notifyChange = () => window.dispatchEvent(new Event(CONTENT_CHANGED_EVENT));

// Admin side of what visitors send (bookings, messages): read, update, delete.
// Unlike useAdminCollection there's nothing to create or reorder.
export const useAdminInbox = <T extends { _id: string }>(resource: string) => {
  const { token } = useAuth();
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      setItems(await apiRequest<T[]>(`/${resource}/admin`, { token }));
    } catch {
      setError("Impossible de charger les données.");
    } finally {
      setIsLoading(false);
    }
  }, [resource, token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // `path` is appended to the item's URL, e.g. "/status" for bookings
  const update = async (id: string, body: Record<string, unknown>, path = "") => {
    const saved = await apiRequest<T>(`/${resource}/${id}${path}`, { method: "PATCH", body, token });
    setItems((current) => current.map((item) => (item._id === id ? saved : item)));
    notifyChange();
    return saved;
  };

  const remove = async (id: string) => {
    await apiRequest(`/${resource}/${id}`, { method: "DELETE", token });
    setItems((current) => current.filter((item) => item._id !== id));
    notifyChange();
  };

  return { items, isLoading, error, refresh, update, remove };
};
