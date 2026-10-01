"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { logout, refreshSession, startSession, subscribeSession, type SessionSnapshot } from "@/lib/api";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  session: SessionSnapshot | null;
  login: (idToken: string) => Promise<SessionSnapshot>;
  logout: () => Promise<void>;
  reload: () => Promise<SessionSnapshot | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionSnapshot | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const unsubscribe = subscribeSession((next) => {
      setSession(next);
      setStatus(next ? "authenticated" : "unauthenticated");
    });
    void refreshSession();
    return unsubscribe;
  }, []);

  const login = useCallback(async (idToken: string) => {
    return startSession(idToken, "helper");
  }, []);

  const logoutAndClear = useCallback(async () => {
    await logout();
  }, []);

  const reload = useCallback(() => refreshSession(), []);

  const value = useMemo(
    () => ({ status, session, login, logout: logoutAndClear, reload }),
    [status, session, login, logoutAndClear, reload],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
