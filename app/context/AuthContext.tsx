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
import { cookies } from "next/headers";

interface User {
  userName: string;
  // Añade otras propiedades del usuario según sea necesario
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginForm: (username: string, password: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error

  useEffect(() => {
    console.log("aa");
    const initializeAuth = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      console.log(token);

      if (token) {
        const isValid = await validateToken();
        console.log(isValid);
        if (isValid) {
          const decoded: User = jwtDecode(token);
          setUser(decoded);
        } else {
          logout();
          // await refreshToken();
        }
      } else {
        logout();
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const loginForm = async (username: string, password: string) => {
    try {
      const { data } = await axios.post(
        "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      console.log(data);
      const decoded: User = jwtDecode(data.token);
      setUser(decoded);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      document.cookie = `token=${data.token}; path=/; secure; samesite=lax`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; samesite=lax`;

      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Error during login", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage("Usuario o contraseña inválidos"); // Establece el mensaje de error
      } else {
        setErrorMessage("Ocurrió un error durante el inicio de sesión");
      }
    }
  };

  const validateToken = async (): Promise<boolean> => {
    console.log("asdads");
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) return false;

    try {
      const { data } = await axios.post(
        "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data === "Token is valid" ? true : false;
    } catch (error) {
      console.error("Error validating token", error);
      return false;
    }
  };
  const refreshToken = async (): Promise<void> => {
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="))
      ?.split("=")[1];

    try {
      const { data } = await axios.post(
        "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/refreshToken",
        {
          refreshToken,
        }
      );
      const decoded: User = jwtDecode(data.token);
      setUser(decoded);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      document.cookie = `token=${data.token}; path=/; secure; samesite=lax`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; samesite=lax`;
    } catch (error) {
      console.error("Error refreshing token", error);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <AuthContext.Provider
      value={{ user, loginForm, logout, loading, validateToken, refreshToken }}
    >
      {errorMessage && <p>{errorMessage}</p>}{" "}
      {/* Muestra el mensaje de error */}
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
