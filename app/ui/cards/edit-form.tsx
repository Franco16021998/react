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
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const defaultDate = card.fechalimite.split("T")[0];

  console.log("card", card);

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
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar Contrato</Button>
      </div>
    </form>
  );
}
