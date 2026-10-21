import { createContext, useContext, useState } from "react";
import { apiRequest } from "@/lib/api";

const STORAGE_KEY = "admin-token";

type AuthProviderState = {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

  const login = async (email: string, password: string) => {
    const data = await apiRequest<{ token: string }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    localStorage.setItem(STORAGE_KEY, data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  };

  return <AuthProviderContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>{children}</AuthProviderContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
