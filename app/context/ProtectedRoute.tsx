"use client";

// src/components/ProtectedRoute.tsx

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth() || {};
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [loading, user, router]);

  //   if (token) {
  //     return <p>Cargando...</p>;
  //   }

  return <>{children}</>;
};

export default ProtectedRoute;
