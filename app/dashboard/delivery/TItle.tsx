"use client";

import axios from "axios";
import { cookies } from "next/headers";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type ProjectTableProps = {
  projects: { id: number; name: string }[];
};

const ProjectTable: React.FC<ProjectTableProps> = () => {
  const pathname = usePathname();
  const [data, setData] = useState<{ code: string; description: string } | null>(null);

  useEffect(() => {
    // Extraer el último segmento de la URL

    // Realizar la llamada GET usando fetch
    const fetchData = () => {
      const segments = pathname.split("/");
      const lastSegment = segments[segments.length - 1];

      try {
        const token = localStorage.getItem("token");

        axios
          .post(
            "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data === "Token is valid") {
              axios
                .get(
                  `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects/${lastSegment}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((response) => {
                  setData(response.data);
                });
            }
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pathname]);

  console.log(pathname);

  return (
    <table className="hidden min-w-full text-gray-900 md:table">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            N
          </th>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Proyecto
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <td className="px-4 py-4 sm:pl-6">{data?.code}</td>
          <td className="px-4 py-4 sm:pl-6">{data?.description}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectTable;
