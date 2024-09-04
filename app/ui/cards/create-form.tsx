"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { createCard, StateCard } from "@/app/lib/actions";
import { useActionState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          Guardando...
        </div>
      ) : (
        "Crear Documento"
      )}
    </Button>
  );
}

export default function Form({
  entregableId,
  projectId,
}: {
  entregableId: string;
  projectId: string;
}) {
  const initialState: StateCard = { message: null, errors: {} };

  const createCardAction = createCard.bind(null, entregableId, projectId);
  const [state, formAction] = useActionState(createCardAction, initialState);

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
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
                name="reference"
                // value={reference}
                className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
                required
                // onChange={(e) => setReference(e.target.value)}
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
                // value={fechalimite}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
                // onChange={(e) => setFechalimite(e.target.value)}
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
        <SubmitButton />
      </div>
    </form>
  );
}
