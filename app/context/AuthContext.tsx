"use client";
// src/context/AuthContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface User {
  userName: string;
  // Añade otras propiedades del usuario según sea necesario
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginForm: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: User = jwtDecode(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  const loginForm = async (username: string, password: string) => {
    try {
      const { data } = await axios.post(
        "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/login",
        {
          username,
          password,
        }
      );
      const decoded: User = jwtDecode(data.result.token);
      setUser(decoded);
      localStorage.setItem("token", data.result.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginForm, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
