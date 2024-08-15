"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [pending, setPending] = useState(false);

  const router = useRouter();
  const { loginForm } = useAuth() || {};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard/projects");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true); // Inicia el estado de carga

    try {
      if (loginForm) {
        const a = await loginForm(formData.username, formData.password);
      }

      // try {
      //   const response = await axios.post(
      //     "https://api.anaprevention.com/v1/authentication/authenticate",
      //     formData
      //   );
      //   console.log(response);
      //   document.cookie = `token=${response.data.result.token}; path=/`;
      //   router.push("/dashboard");
      // } catch (error) {
      //   console.error("Login failed:", error);
      // }
    } catch (error) {
      console.error("Login failed:", error);
      setPending(false);
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 2000);
    }
  };

  return (
    <form  onSubmit={handleSubmit}>
      <div
        className="flex-1 rounded-lg px-6 pb-4 pt-8"
        style={{
          backgroundColor: "#171717",
          color: "black",
        }}
      >
        <h1 className={`${lusitana.className} mb-3 text-3xl text-white`}>
          Iniciar sesión
        </h1>
        <div className="w-full">
          <div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Entra tu usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={pending}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Entra tu contraseña"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                disabled={pending}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full disabled:opacity-50 bg-[#7a4dfd]" disabled={pending}>
          {pending ? (
            <>Cargando...</>
          ) : (
            <>
              Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 " />
            </>
          )}
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}
