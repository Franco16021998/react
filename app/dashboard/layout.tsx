"use client";

import SideNav from "@/app/ui/dashboard/sidenav";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "../theme/store";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div
        className={clsx("flex-grow p-6 md:overflow-y-auto md:p-12", {
          "text-white": isDarkMode,
          "bg-gray-50": !isDarkMode,
          "bg-gray-900": isDarkMode,
        })}
      >
        {children}
      </div>
    </div>
  );
}
