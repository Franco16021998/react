import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/attachments/table";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import {
  fetchAttachmentsPages,
  fetchGetAttachment,
} from "@/app/actions/projects";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Llamada al servidor para obtener el número total de páginas
  const attachments = await fetchAttachmentsPages(params.id);
  const base64 = await fetchGetAttachment(params.id);

  console.log("base64", base64);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Lista de adjuntos</h1>
      </div>

      <div className="flex w-full items-center justify-center  space-x-4">
        <div>Estado Fecha-hora PDF</div>
        <Modal idLetter={params?.id} />
        <button
        // className="bg-blue-500"
        // onClick={() => redirect("/dashboard/projects")}
        >
          {" "}
          <ArrowLeftCircleIcon className="w-6 h-6 text-blue-600 cursor-pointer" />{" "}
        </button>
      </div>

      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar proyectos..." />
      </div> */}

      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar entregables..." />
      </div> */}

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} elements={attachments} base64={base64} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages?.total} /> */}
      </div>
    </div>
  );
}
