import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/projects/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchProjectsPages } from "@/app/actions/projects";
import { Create } from "@/app/components/commons/ButtonsActions";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Llamada al servidor para obtener el número total de páginas
  const totalPages = await fetchProjectsPages(query, currentPage);

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
        <h1 className={`${lusitana.className} text-2xl`}>Proyectos</h1>
      </div>
      <div
        className="grid grid-cols-1 gap-4 mt-4"
        style={{
          backgroundColor: "#171717",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-3">
            <Search placeholder="Buscar proyectos..." />
          </div>
          <div>
            <Create label="Crear proyecto" route="/dashboard/projects/create" />
          </div>
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
        </div>
      </div>

      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages?.total} />
      </div> */}
    </div>
  );
}
