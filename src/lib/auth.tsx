import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UserType = "customer" | "provider";

export type DwUser = {
  name: string;
  email: string;
  type: UserType;
};

type AuthValue = {
  user: DwUser | null;
  ready: boolean;
  signIn: (user: DwUser) => void;
  signOut: () => void;
};

const KEY = "devwork.session";
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DwUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as DwUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      signIn: (next) => {
        setUser(next);
        try {
          window.localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
      },
      signOut: () => {
        setUser(null);
        try {
          window.localStorage.removeItem(KEY);
        } catch {
          /* ignore */
        }
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
