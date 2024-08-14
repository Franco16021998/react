import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/delivery/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import {
  fetchDeliveryPages,
  fetchProjectId,
  fetchProjectsAll,
} from "@/app/actions/projects";
import ProjectTable from "../TItle";

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
  const totalPages = await fetchDeliveryPages(query, currentPage);
  const idProject = await fetchProjectId(params.id);
  const projects = await fetchProjectsAll();

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
        <h1 className={`${lusitana.className} text-2xl`}>
          Lista de entregables
        </h1>
      </div>
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar proyectos..." />
      </div> */}

      <div
        className="grid grid-cols-1 gap-4 mt-4"
        style={{
          backgroundColor: "#171717",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <ProjectTable projects={projects} project={idProject?.data} />

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-3">
            <Search placeholder="Buscar entregables..." />
          </div>
          <div></div>
        </div>
        <div>
          <Suspense
            key={query + currentPage}
            fallback={<InvoicesTableSkeleton />}
          >
            <Table
              query={query}
              currentPage={currentPage}
              elements={totalPages}
            />
          </Suspense>{" "}
          <div className="mt-5 flex w-full justify-center">
            <Pagination
              totalPages={totalPages?.total}
              currentPageChange={currentPage}
            />
          </div>
        </div>
      </div>

      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar entregables..." />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} elements={totalPages} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={totalPages?.total}
          currentPageChange={currentPage}
        />
      </div> */}
    </div>
  );
}
