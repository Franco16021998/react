"use client";

import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { createCard, StateCard } from "@/app/lib/actions";
import { useActionState, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";
import { usePathname } from "next/navigation";

export default function Form({
  entregableId,
  projectId,
}: {
  entregableId: string;
  projectId: string;
}) {
  const initialState: StateCard = { message: null, errors: {} };

  const [state, formAction] = useActionState(createCard, initialState);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const router = usePathname();
  const [reference, setReference] = useState<string>("");
  const [fechalimite, setFechalimite] = useState<string>("");
  const params = router.split("/");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("reference", reference);
    formData.append("fechalimite", fechalimite);
    formData.append("entregable_id", params?.[3]);
    formData.append("proyecto_id", params?.[4]);

    // Llama a formAction con los datos necesarios
    formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="rounded-md bg-gray-50 p-4 md:p-6"
        style={isDarkMode ? { color: "black" } : { color: "#F3F4F6" }}
      >
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Coloca la referencia
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="reference"
                name="referencia"
                value={reference}
                className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
                required
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Fecha limite
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date"
                name="fechalimite"
                type="date"
                value={fechalimite}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
                onChange={(e) => setFechalimite(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/cards/${entregableId}/${projectId}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear Documento</Button>
      </div>
    </form>
  );
}
