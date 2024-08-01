// "use client";

import Image from "next/image";
import { Create, Update, Delete } from "./ButtonsActions";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/theme/store";

interface Element {
  [key: string]: string;
}

export default function TableModel({
  elements,
  columns,
}: {
  elements: Element[];
  columns: { name: string; key: string }[];
}) {
  // const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <table className="hidden min-w-full text-gray-900 md:table">
      <thead className="rounded-lg text-left text-sm font-normal">
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
          {/* <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Customer
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Email
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Amount
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Date
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Status
          </th>
          <th scope="col" className="relative py-3 pl-6 pr-3">
            <span className="sr-only">Edit</span>
          </th> */}
        </tr>
      </thead>
      <tbody className="bg-white">
        {elements?.map((items) => (
          <tr
            key={items.id}
            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
          >
            {columns.map((column) => (
              <td key={column.key} className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  {/* <Image
                    src={items.image_url}
                    className="rounded-full"
                    width={28}
                    height={28}
                    alt={`${items.name}'s profile picture`}
                  /> */}
                  <p>{items[column.key]}</p>
                </div>
              </td>
            ))}

            {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex items-center gap-3">
                <Image
                  src={invoice.image_url}
                  className="rounded-full"
                  width={28}
                  height={28}
                  alt={`${invoice.name}'s profile picture`}
                />
                <p>{invoice.name}</p>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-3">{invoice.email}</td> */}

            <td className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-end gap-3">
                <Update id={items.id} />
                <Delete id={items.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
