"use client";

import { Card, CustomerField, InvoiceForm } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { editCard, State, StateCard } from "@/app/lib/actions";
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
        "Editar Documento"
      )}
    </Button>
  );
}

export default function EditCardForm({
  card,
  idProject,
  idEntregable,
}: {
  card: Card;
  idProject: string;
  idEntregable: string;
}) {
  const initialState: StateCard = { message: null, errors: {} };
  const updateInvoiceWithId = editCard.bind(
    null,
    card.id,
    idProject,
    idEntregable
  );
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);
  console.log(state)
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const defaultDate = card.fechalimite.split("T")[0];

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
                className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={card.referencia}
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
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={defaultDate}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/cards/${idEntregable}/${idProject}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
