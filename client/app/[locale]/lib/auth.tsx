"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import api from "./api";
import { addToast } from "@heroui/react";
import { useTranslations } from "next-intl";

const TOKEN_KEY = "fibank_token";
const USER_KEY = "fibank_user";
const LOGOUT_FLAG = "just_logged_out";

export interface User {
  id: string;
  uin: string;
  nameCyrillic: string;
  nameLatin: string;
  email: string;
  username: string;
  role: "user" | "admin";
}

// Simplified user type for localStorage
interface StoredUser {
  id: string;
  email: string;
  nameCyrillic: string;
  nameLatin: string;
  username: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  justLoggedIn: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  uin: string;
  uinForeigner?: string;
  nameCyrillic: string;
  nameLatin: string;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to extract only needed user fields for localStorage
const extractStoredUserData = (userData: any): StoredUser => {
  return {
    id: userData.id,
    email: userData.email,
    nameCyrillic: userData.nameCyrillic,
    nameLatin: userData.nameLatin,
    username: userData.username,
    role: userData.role,
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("auth");

  // Auth cache duration (30 minutes)
  const AUTH_CACHE_DURATION = 30 * 60 * 1000;

  useEffect(() => {
    if (justLoggedIn) {
      const timer = setTimeout(() => {
        setJustLoggedIn(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [justLoggedIn]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem(USER_KEY);
        const token = localStorage.getItem(TOKEN_KEY);
        const lastVerifiedAt = localStorage.getItem("auth_last_verified");
        const currentTime = Date.now();

        if (storedUser && token) {
          setUser(JSON.parse(storedUser));

          const shouldVerify =
            !lastVerifiedAt ||
            currentTime - parseInt(lastVerifiedAt) > AUTH_CACHE_DURATION;

          if (shouldVerify) {
            try {
              const response = await api.get("/users/me");
              const userData = response.data.user;
              const storedUserData = extractStoredUserData(userData);

              setUser(userData);
              localStorage.setItem(USER_KEY, JSON.stringify(storedUserData));

              localStorage.setItem(
                "auth_last_verified",
                currentTime.toString()
              );
            } catch (err) {
              localStorage.removeItem(TOKEN_KEY);
              localStorage.removeItem(USER_KEY);
              localStorage.removeItem("auth_last_verified");
              setUser(null);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem("auth_last_verified");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post("/auth/login", { username, password });
      const userData = response.data.user;

      const storedUserData = extractStoredUserData(userData);

      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(storedUserData));

      setUser(userData);
      setJustLoggedIn(true);

      localStorage.setItem("auth_last_verified", Date.now().toString());

      addToast({
        title: t("loginSuccess"),
        description: t("welcomeBack"),
        variant: "solid",
        color: "success",
      });

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post("/auth/register", userData);
      const responseUserData = response.data.user;

      const storedUserData = extractStoredUserData(responseUserData);

      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(storedUserData));

      setUser(responseUserData);
      setJustLoggedIn(true);

      localStorage.setItem("auth_last_verified", Date.now().toString());

      addToast({
        title: t("registerSuccess"),
        description: t("accountCreated"),
        variant: "solid",
        color: "success",
      });

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Flag to not show warning on log out
    sessionStorage.setItem(LOGOUT_FLAG, "true");
    setTimeout(() => {
      sessionStorage.removeItem(LOGOUT_FLAG);
    }, 3000);

    setUser(null);

    localStorage.removeItem("auth_last_verified");

    addToast({
      title: t("logoutSuccess"),
      description: t("logoutMessage"),
      variant: "solid",
      color: "success",
    });

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        justLoggedIn,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const t = useTranslations("auth");
  const redirectedRef = useRef(false);

  useEffect(() => {
    const justLoggedOut = sessionStorage.getItem(LOGOUT_FLAG) === "true";

    if (
      !isLoading &&
      !isAuthenticated &&
      !redirectedRef.current &&
      !justLoggedOut
    ) {
      redirectedRef.current = true;

      addToast({
        title: t("authRequired"),
        description: t("redirectingToLogin"),
        variant: "solid",
        color: "warning",
      });

      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router, t]);

  return { isLoading };
}
