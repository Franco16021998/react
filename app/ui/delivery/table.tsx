"use client";

import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";
import TableModel from "@/app/components/commons/TableModel";
import { fetchProjectsPages } from "@/app/actions/projects";

export default async function Table({
  query,
  currentPage,
  elements,
}: {
  query: string;
  currentPage: number;
  elements: {
    list: any[];
    total: number;
  };
}) {
  // const projects = await fetchProjectsPages(query, currentPage);

  const columns = [
    {
      name: "Descripcion",
      key: "description",
    },
    {
      name: "Responsable",
      key: "responsable",
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden"></div>
          <TableModel
            elements={elements?.list as any[]}
            columns={columns}
            notUpdate
            notDelete
            redirect
          />
        </div>
      </div>
    </div>
  );
}
