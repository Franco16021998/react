"use client";

import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";
import TableModel from "@/app/components/commons/TableModel";
import { fetchProjectsPages } from "@/app/actions/projects";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";

export default async function Table({
  query,
  currentPage,
  elements,
  id,
  lastSegment,
}: {
  query: string;
  currentPage: number;
  elements: {
    list: any[];
    total: number;
  };
  id: string;
  lastSegment: string;
}) {
  // const projects = await fetchProjectsPages(query, currentPage);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const columns = [
    {
      name: "Referencia",
      key: "referencia",
    },
    {
      name: "Fecha Hora",
      key: "fecha_subida_pdf",
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div
          className={`rounded-lg ${
            isDarkMode ? "#1F2937" : "bg-gray-50 "
          } p-2 md:pt-0`}
        >
          <div className="md:hidden"></div>
          <TableModel
            elements={elements?.list as any[]}
            columns={columns}
            notUpdate
            editCardRoute
            notDelete
            redirectAttachment
            id={id}
            lastSegmentUrl={lastSegment}
          />
        </div>
      </div>
    </div>
  );
}
