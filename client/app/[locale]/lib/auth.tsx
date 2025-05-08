"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import api from "./api";

// Constants for localStorage keys
const TOKEN_KEY = "fibank_token";
const USER_KEY = "fibank_user";

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
        // Try to get user data from localStorage first
        const storedUser = localStorage.getItem(USER_KEY);
        const token = localStorage.getItem(TOKEN_KEY);

        if (storedUser && token) {
          // If we have stored user data, use it immediately
          setUser(JSON.parse(storedUser));

          try {
            // Validate the token by making a request to /me endpoint
            const response = await api.get("/users/me");
            const userData = response.data.user;

            // Store only essential fields
            const storedUserData = extractStoredUserData(userData);

            // Update state and localStorage
            setUser(userData);
            localStorage.setItem(USER_KEY, JSON.stringify(storedUserData));
          } catch (err) {
            // If token validation fails, clear auth data
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            setUser(null);
          }
        } else {
          // No stored user/token found
          setUser(null);
        }
      } catch (error) {
        // If any error occurs, clear auth data
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
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
      const userData = response.data.user;

      // Store only essential fields
      const storedUserData = extractStoredUserData(userData);

      // Store token and essential user data in localStorage
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(storedUserData));

      // Update state with full user data
      setUser(userData);

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
      const responseUserData = response.data.user;

      // Store only essential fields
      const storedUserData = extractStoredUserData(responseUserData);

      // Store token and essential user data in localStorage
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(storedUserData));

      // Update state with full user data
      setUser(responseUserData);

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
    // Clear all auth data from localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Update state
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
