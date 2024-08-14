import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteInvoice } from "@/app/lib/actions";

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
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
