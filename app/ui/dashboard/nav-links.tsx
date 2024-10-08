"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "../../theme/store";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: "Inicio", href: "/dashboard", icon: HomeIcon },
  // {
  //   name: "Invoices",
  //   href: "/dashboard/invoices",
  //   icon: DocumentDuplicateIcon,
  // },
  // {
  //   name: "Usuarios",
  //   href: "/dashboard/security/users",
  //   icon: UserIcon,
  // },
  {
    name: "SGI",
    href: "/dashboard/projects",
    icon: UserIcon,
  },
  // {
  //   name: "Lista de entregables",
  //   href: "/dashboard/delivery",
  //   icon: UserIcon,
  // },
];

export default function NavLinks() {
  const pathname = usePathname();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
                "bg-gray-50": !isDarkMode,
                "bg-black": isDarkMode,
                "text-white": isDarkMode && pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-6 text-[#7a4dfd]" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
