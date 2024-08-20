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
import ReturnIcon from "@/app/components/commons/ReturnArrow";
import BackButton from "@/app/ui/attachments/backButton";

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

  return (
    <div className="w-full">
      <div
        className="flex w-full items-center justify-between"
        style={{
          backgroundColor: "#171717",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <h1 className={`${lusitana.className} text-2xl`}>Lista de adjuntos</h1>
        <BackButton />
      </div>

      <div
        className="grid grid-cols-1 gap-4 mt-4"
        style={{
          backgroundColor: "#171717",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        {" "}
        <div>Estado Fecha-hora PDF</div>
        <Modal idLetter={params?.id} />
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <Table
            query={query}
            currentPage={currentPage}
            elements={attachments}
            base64={base64}
          />
        </Suspense>
      </div>

      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages?.total} /> */}
      </div>
    </div>
  );
}
