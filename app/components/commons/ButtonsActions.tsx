"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteAttachment, deleteInvoice, deleteItem } from "@/app/lib/actions";
import { useState } from "react";

export function Create({ label, route }: { label: string; route: string }) {
  return (
    <Link
      href={route}
      className="flex h-10 items-center justify-center align-middle rounded-lg bg-[#7a4dfd] px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{label}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function Update({ id, route }: { id: string; route: string }) {
  return (
    <Link
      href={`/dashboard/${route}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function Delete({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    setIsModalOpen(true); // Abre el modal
  };

  const handleCancelClick = () => {
    setIsModalOpen(false); // Cierra el modal si se cancela la acción
  };

  const confirmDelete = async () => {
    // Aquí va la lógica de borrado
    await deleteItem(id);
    setIsModalOpen(false); // Cierra el modal después de la eliminación
  };

  return (
    <>
      <form>
        <button
          onClick={handleDeleteClick}
          className="rounded-md border p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold">
              ¿Confirmas que deseas eliminar este ítem?
            </h2>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={confirmDelete} // Ejecuta la eliminación al confirmar
                className="bg-red-500 text-black p-2 rounded-md hover:bg-red-600"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancelClick} // Cierra el modal si se cancela
                className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteAttachment({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    setIsModalOpen(true); // Abre el modal
  };

  const handleCancelClick = () => {
    setIsModalOpen(false); // Cierra el modal si se cancela la acción
  };

  const confirmDelete = async () => {
    // Aquí va la lógica de borrado
    await deleteAttachment(id);
    setIsModalOpen(false); // Cierra el modal después de la eliminación
  };

  return (
    <>
      <form>
        <button
          onClick={handleDeleteClick}
          className="rounded-md border p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold">
              ¿Confirmas que deseas eliminar este ítem?
            </h2>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={confirmDelete} // Ejecuta la eliminación al confirmar
                className="bg-red-500 text-black p-2 rounded-md hover:bg-red-600"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancelClick} // Cierra el modal si se cancela
                className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
