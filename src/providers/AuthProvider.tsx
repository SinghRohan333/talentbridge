"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { api, setAccessToken, setOnRefreshFailure } from "@/lib/api";
import { AuthUser, UserRole } from "@/types/auth";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  loginWithGoogle: (credential: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applySession = useCallback((token: string, userData: AuthUser) => {
    setAccessToken(token);
    setUser(userData);
  }, []);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setOnRefreshFailure(clearSession);

    (async () => {
      try {
        const { data } = await api.post("/api/auth/refresh");
        setAccessToken(data.accessToken);
        const meRes = await api.get("/api/auth/me");
        setUser(meRes.data.user);
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [clearSession]);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    applySession(data.accessToken, data.user);
  };

  const register = async (payload: RegisterPayload) => {
    const { data } = await api.post("/api/auth/register", payload);
    applySession(data.accessToken, data.user);
  };

  const loginWithGoogle = async (credential: string, role?: UserRole) => {
    const { data } = await api.post("/api/auth/google", { credential, role });
    applySession(data.accessToken, data.user);
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // proceed with client-side cleanup regardless
    }
    clearSession();
  };
  const refreshUser = useCallback(async () => {
    const { data } = await api.get("/api/auth/me");
    setUser(data.user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
