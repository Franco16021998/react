"use client";

import Image from "next/image";
import { Create, Update, Delete, DeleteAttachment } from "./ButtonsActions";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";
import PdfModal from "@/app/dashboard/attachments/ShowPdf";
import {
  CheckIcon,
  ArrowPathIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

// import { useRouter } from "next/router";

// import { useSelector } from "react-redux";
// import { RootState } from "@/app/theme/store";

interface Element {
  [key: string]: string;
}

export default function TableModel({
  elements,
  columns,
  notUpdate,
  notDelete,
  redirect,
  redirectAttachment,
  actionPdf,
  base64,
  editCardRoute,
  id,
  lastSegmentUrl,
  deleteAttachment,
}: {
  elements: Element[];
  columns: { name: string; key: string }[];
  notUpdate?: boolean;
  notDelete?: boolean;
  redirect?: boolean;
  redirectAttachment?: boolean;
  actionPdf?: boolean;
  base64?: { downloadUrl: string; fileName: string };
  editCardRoute?: boolean;
  id?: string;
  lastSegmentUrl?: string;
  deleteAttachment?: boolean;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const lastSegment = segments[segments.length - 1];
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("elements", loading);

  useEffect(() => {
    setLoading(false);
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [elements]);

  // const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  const handleCheckboxChange = (id: string, items: any) => {
    setPending(true);
    router.push("/dashboard/delivery/" + id);
    //setPending(false);
  };

  const handleRedirectCards = (id: string, items: any) => {
    // router.push("/dashboard/delivery/" + id);
    setPending(true);
    router.push(`/dashboard/cards/${id}/${lastSegment}`);
  };

  const handleRedirectAttachment = (id: string, items: any) => {
    // router.push("/dashboard/delivery/" + id);
    setPending(true);
    router.push(`/dashboard/attachments/${id}`);
  };

  // const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  if (elements?.length === 0) {
    return <h1>No hay registros</h1>;
  } else {
    return (
      <>
        <div className="md:hidden">
          {elements?.map((items) => (
            <div
              key={items.id}
              className="mb-2 w-full rounded-md bg-white p-4 text-black"
            >
              <div className="flex w-full items-center justify-between pt-4">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    // className="whitespace-nowrap py-3 pl-6 pr-3"
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <p>{items[column.key]}</p>
                    </div>
                  </td>
                ))}
                <div className="flex justify-end ">
                  {actionPdf && <PdfModal pdfUrl={base64?.downloadUrl} />}

                  {pathname === "/dashboard/projects" && (
                    <button
                      onClick={() => handleCheckboxChange(items.id, items)}
                      className="bg-orange-500 rounded-md border p-2 hover:bg-orange-600 disabled:opacity-50"
                      disabled={pending}
                    >
                      {pending ? (
                        <>
                          <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                        </>
                      ) : (
                        <>
                          <CheckIcon className="w-5 text-white" />
                        </>
                      )}
                    </button>
                  )}
                  {!notUpdate && <Update id={items.id} route={"projects"} />}
                  {!notDelete && <Delete id={items.id} />}
                  {editCardRoute && (
                    <Link
                      href={`/dashboard/cards/${id}/${lastSegmentUrl}/${items.id}/edit`}
                      className="rounded-md border p-2 hover:bg-gray-100"
                    >
                      <PencilIcon className="w-5" />
                    </Link>
                  )}

                  {redirect && (
                    <button
                      onClick={() => handleRedirectCards(items.id, items)}
                      className="bg-green-500 rounded-md border p-2 hover:bg-green-600 disabled:opacity-50"
                      disabled={pending}
                    >
                      {pending ? (
                        <>
                          <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                        </>
                      ) : (
                        <>
                          <EnvelopeIcon className="w-5 text-white" />
                        </>
                      )}
                    </button>
                  )}
                  {redirectAttachment && (
                    <button
                      onClick={() => handleRedirectAttachment(items.id, items)}
                      className="bg-green-500 rounded-md border p-2  hover:bg-green-600 disabled:opacity-50"
                      disabled={pending}
                    >
                      {pending ? (
                        <>
                          <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                        </>
                      ) : (
                        <>
                          <EnvelopeIcon className="w-5 text-white" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <table
          className="hidden min-w-full text-gray-900 md:table"
          style={
            isDarkMode
              ? { backgroundColor: "#141414" }
              : { backgroundColor: "#F3F4F6" }
          }
        >
          <thead
            className="rounded-lg text-left text-sm font-normal"
            style={
              isDarkMode ? { color: "white" } : { backgroundColor: "#F3F4F6" }
            }
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          {loading && (
            <tbody className="bg-white">
              {elements?.map((items) => (
                <tr
                  key={items.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="whitespace-nowrap py-3 pl-6 pr-3"
                    >
                      <div className="flex items-center gap-3">
                        <p>{items[column.key]}</p>
                      </div>
                    </td>
                  ))}

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {actionPdf && <PdfModal pdfUrl={base64?.downloadUrl} />}

                      {pathname === "/dashboard/projects" && (
                        <button
                          onClick={() => handleCheckboxChange(items.id, items)}
                          className="bg-orange-500 rounded-md border p-2 hover:bg-orange-600 disabled:opacity-50"
                          disabled={pending}
                        >
                          {pending ? (
                            <>
                              <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                            </>
                          ) : (
                            <>
                              <CheckIcon className="w-5 text-white" />
                            </>
                          )}
                        </button>
                      )}
                      {!notUpdate && (
                        <Update id={items.id} route={"projects"} />
                      )}
                      {!notDelete && <Delete id={items.id} />}
                      {deleteAttachment && <DeleteAttachment id={items.id} />}
                      {editCardRoute && (
                        <Link
                          href={`/dashboard/cards/${id}/${lastSegmentUrl}/${items.id}/edit`}
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          <PencilIcon className="w-5" />
                        </Link>
                      )}

                      {redirect && (
                        <button
                          onClick={() => handleRedirectCards(items.id, items)}
                          className="bg-green-500 rounded-md border p-2 hover:bg-green-600 disabled:opacity-50"
                          disabled={pending}
                        >
                          {pending ? (
                            <>
                              <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                            </>
                          ) : (
                            <>
                              <EnvelopeIcon className="w-5 text-white" />
                            </>
                          )}
                        </button>
                      )}
                      {redirectAttachment && (
                        <button
                          onClick={() =>
                            handleRedirectAttachment(items.id, items)
                          }
                          className="bg-green-500 rounded-md border p-2  hover:bg-green-600 disabled:opacity-50"
                          disabled={pending}
                        >
                          {pending ? (
                            <>
                              <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                            </>
                          ) : (
                            <>
                              <EnvelopeIcon className="w-5 text-white" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {!loading && (
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center text-white w-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-2">Cargando...</span>
              </div>
            </div>
          )}
        </table>
      </>
    );
  }
}
