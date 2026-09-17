"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, AuthUser, RegisterPayload, LoginPayload } from "@/lib/api";
import { saveToken, getToken, removeToken, isTokenExpired } from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount — restore session from localStorage
  useEffect(() => {
    async function restoreSession() {
      const stored = getToken();
      if (!stored || isTokenExpired(stored)) {
        removeToken();
        setIsLoading(false);
        return;
      }

      try {
        const res = await authApi.getMe(stored);
        if (res.success && res.data?.user) {
          setUser(res.data.user);
          setToken(stored);
        } else {
          removeToken();
        }
      } catch {
        removeToken();
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await authApi.login(payload);
    if (!res.success || !res.data) {
      throw new Error(res.message ?? "Login failed");
    }
    saveToken(res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    router.push("/dashboard");
  }, [router]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await authApi.register(payload);
    if (!res.success || !res.data) {
      throw new Error(res.message ?? "Registration failed");
    }
    saveToken(res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    router.push("/dashboard");
  }, [router]);

  const logout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
