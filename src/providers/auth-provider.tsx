import { createContext, useContext, useEffect, useState } from "react";
import { ApiError, apiRequest } from "@/lib/api";

const STORAGE_KEY = "admin-token";

export type User = {
  id: string;
  username: string;
  email: string;
};

type AuthProviderState = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(!!token);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  // Rehydrate the user from the DB on load, so a stored token for a deleted user is rejected.
  useEffect(() => {
    if (!token || user) return;
    setIsLoading(true);
    apiRequest<{ user: User }>("/auth/me", { token })
      .then((data) => setUser(data.user))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) logout();
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const login = async (identifier: string, password: string) => {
    const data = await apiRequest<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: { identifier, password },
    });
    localStorage.setItem(STORAGE_KEY, data.token);
    setUser(data.user);
    setToken(data.token);
  };

  return (
    <AuthProviderContext.Provider value={{ token, user, isLoading, isAuthenticated: !!token && !!user, login, logout }}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
