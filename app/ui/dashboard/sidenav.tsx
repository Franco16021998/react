"use client";

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../theme/themeSlice";
import { useEffect } from "react";
import { RootState } from "../../theme/store";
import clsx from "clsx";

export default function SideNav() {
  const { logout, user } = useAuth() || {};
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div
      className={clsx("flex h-full flex-col px-3 py-4 md:px-2", {
        "bg-black": isDarkMode === true,
      })}
    >
      <Link
        className={clsx(
          "mb-2 flex h-20 items-end justify-start rounded-md  p-4 md:h-40",
          {
            "bg-black": isDarkMode === true,
            "bg-blue-600": isDarkMode === false,
          }
        )}
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div
          className={clsx("hidden h-auto w-full grow rounded-md  md:block", {
            "bg-black": isDarkMode === true,
            "bg-gray-50": isDarkMode === false,
          })}
        ></div>
        <div className="text-xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text p-2 rounded text-center shadow-lg">
          {user?.userName}
        </div>
        <div
          className={clsx("flex items-center justify-between p-2", {
            "text-white": isDarkMode,
          })}
        >
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleToggleDarkMode}
            className="toggle-checkbox"
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logout && logout();
          }}
        >
          <button
            className={clsx(
              "flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "text-white": isDarkMode,
                "bg-gray-50": !isDarkMode,
                "bg-black": isDarkMode,
              }
            )}
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
