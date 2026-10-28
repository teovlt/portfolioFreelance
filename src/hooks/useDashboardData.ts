import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import type { ContactInfo, Experience, Package, Photo, Review, Social } from "@/types/content";
import type { Project } from "@/types/project";
import { CONTENT_CHANGED_EVENT } from "./useStats";

export type DashboardData = {
  projects: Project[];
  reviews: Review[];
  packages: Package[];
  experiences: Experience[];
  photos: Photo[];
  socials: Social[];
  contact: ContactInfo | null;
};

// Every collection in full: they're small, and the dashboard previews them all
export const useDashboardData = () => {
  const { token } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [projects, reviews, packages, experiences, photos, socials, contact] = await Promise.all([
        apiRequest<Project[]>("/projects/admin", { token }),
        apiRequest<Review[]>("/reviews/admin", { token }),
        apiRequest<Package[]>("/packages/admin", { token }),
        apiRequest<Experience[]>("/experiences/admin", { token }),
        apiRequest<Photo[]>("/photos/admin", { token }),
        apiRequest<Social[]>("/socials/admin", { token }),
        apiRequest<ContactInfo | null>("/contact"),
      ]);
      setData({ projects, reviews, packages, experiences, photos, socials, contact });
      setError(null);
    } catch {
      setError("Impossible de charger le contenu.");
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setReviewStatus = async (review: Review, status: Review["status"]) => {
    const saved = await apiRequest<Review>(`/reviews/${review._id}`, { method: "PUT", body: { status }, token });
    setData((current) => current && { ...current, reviews: current.reviews.map((r) => (r._id === saved._id ? saved : r)) });
    // Keeps the sidebar's pending badge in sync
    window.dispatchEvent(new Event(CONTENT_CHANGED_EVENT));
  };

  return { data, isLoading: !data && !error, error, setReviewStatus };
};
