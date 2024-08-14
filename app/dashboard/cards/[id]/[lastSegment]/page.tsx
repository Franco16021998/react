import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/cards/table";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchCardsPages } from "@/app/actions/projects";
import { Create } from "@/app/components/commons/ButtonsActions";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string; lastSegment: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Llamada al servidor para obtener el número total de páginas
  const cards = await fetchCardsPages(params.id, params.lastSegment);
  console.log("params", params);

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
        <h1 className={`${lusitana.className} text-2xl`}>Lista de cartas</h1>
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
            {/* <Search placeholder="Buscar proyectos..." /> */}
          </div>
          <div>
            <Create
              label="Crear carta"
              route={`/dashboard/cards/${params?.id}/${params?.lastSegment}/create`}
            />
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
              elements={cards}
              id={params.id}
              lastSegment={params.lastSegment}
            />
          </Suspense>{" "}
        </div>
      </div>
    </div>
  );
}
