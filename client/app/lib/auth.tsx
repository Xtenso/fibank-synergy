"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import api from "./api";

// Types
export interface User {
  id: string;
  uin: string;
  nameCyrillic: string;
  nameLatin: string;
  email: string;
  username: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await api.get("/users/me");
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login user
  const login = async (username: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post("/auth/login", { username, password });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post("/auth/register", userData);

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = (): void => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Auth protection hook
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/auth/login");
    }
  }, [isAuthenticated, isLoading]);

  return { isLoading };
}
