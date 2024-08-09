"use client";

import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createProject, StateProjects } from "@/app/lib/actions";
import { useActionState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: StateProjects = { message: null, errors: {} };
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const [state, formAction] = useActionState(createProject, initialState);

  return (
    <form
      action={formAction}
      style={isDarkMode ? { color: "black" } : { color: "#F3F4F6" }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Coloca un codigo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="code"
                name="code"
                // type="number"
                // step="0.01"
                // placeholder="Coloca la descripcion"
                className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
                required
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Coloca una descripcion
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                // type="number"
                // step="0.01"
                // placeholder="Coloca la descripcion"
                className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
                required
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/projects"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Proyecto</Button>
      </div>
    </form>
  );
}
