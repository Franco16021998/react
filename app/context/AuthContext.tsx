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
  email: string;
  // Añade otras propiedades del usuario según sea necesario
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginForm: (
    userName: string,
    password: string,
    companyId: string,
    subsidiaryId: string
  ) => Promise<void>;
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

  const loginForm = async (
    userName: string,
    password: string,
    companyId: string,
    subsidiaryId: string
  ) => {
    try {
      const { data } = await axios.post(
        "https://api.anaprevention.com/v1/authentication/authenticate",
        {
          userName,
          password,
          companyId,
          subsidiaryId,
        }
      );
      console.log(data);
      const decoded: User = jwtDecode(data.result.token);
      console.log(decoded);
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
