"use client";

import SideNav from "@/app/ui/dashboard/sidenav";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "../theme/store";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { user } = useAuth() || {};
  console.log("user", user);

  return (
    <>
      <div className="w-full bg-[#262626] flex items-center justify-between p-4">
        <div
          className="flex items-center space-x-4 "
          style={{
            padding: "1rem",
          }}
        >
          <GlobeAltIcon className="h-6 w-6 rotate-[15deg] text-[#7a4dfd]" />
          <div>
            <h1 className="text-white font-bold">AID INGENIEROS</h1>
            <p className="text-gray-400 text-sm">
              PROYECTOS, CONSTRUCCIONES, MONTAJES E INSTALACIONES
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {/* <img src="ruta-a-la-imagen-del-usuario" alt="Usuario" className="w-8 h-8 rounded-full"> */}
          <span className="ml-2 text-white">{user?.names}</span>
        </div>
      </div>

      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div
          className={clsx("flex-grow p-6 md:overflow-y-auto md:p-12", {
            "text-white": isDarkMode,
            "bg-gray-50": !isDarkMode,
            "bg-[#262626]": isDarkMode,
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
}
