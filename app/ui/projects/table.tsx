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

export default async function InvoicesTable({
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
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const columns = [
    {
      name: "Codigo",
      key: "code",
    },
    {
      name: "Descripcion",
      key: "description",
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
          <div className="md:hidden">
            {/* {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
          <TableModel elements={elements?.list as any[]} columns={columns} />
        </div>
      </div>
    </div>
  );
}
