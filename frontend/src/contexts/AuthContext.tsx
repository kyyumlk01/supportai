import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { clearStoredToken, getCurrentUser, getStoredToken, login as loginRequest, storeToken } from "../services/auth";
import type { AuthUser, LoginCredentials } from "../types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials, remember: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      if (!getStoredToken()) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch {
        clearStoredToken();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login: async (credentials, remember) => {
        const response = await loginRequest(credentials);
        storeToken(response.token, remember);
        setUser(response.user);
      },
      logout: () => {
        clearStoredToken();
        setUser(null);
      },
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

