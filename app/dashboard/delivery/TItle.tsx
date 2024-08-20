"use client";

import React, { useEffect, useState } from "react";
import Autocomplete from "@/app/components/commons/Autocomple";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";

type ProjectTableProps = {
  projects: { id: number; description: string }[];
  project: { description: string; code: string } | null;
};

const ProjectTable: React.FC<ProjectTableProps> = ({ project, projects }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [title, setTitle] = useState<any | null>(project);

  const [data, setData] = useState<{
    code: string;
    description: string;
  } | null>(null);

  const [selectedProject, setSelectedProject] = useState<{
    id: number;
    description: string;
  } | null>(null);

  console.log("selectedProject", selectedProject);

  useEffect(() => {
    if (selectedProject) {
      // Actualiza la URL sin recargar la página
      const newUrl = `/dashboard/delivery/${selectedProject.id}`;
      setTitle(selectedProject);
      window.history.replaceState(null, "", newUrl);
    }
  }, [selectedProject]);

  const handleSelect = (project: { id: number; description: string }) => {
    setSelectedProject(project);
  };

  return (
    <>
      <Autocomplete items={projects} onSelect={handleSelect} />

      <table className="hidden min-w-full text-gray-900 md:table ">
        <thead
          className="rounded-lg text-left text-sm font-normal"
          style={
            isDarkMode
              ? { backgroundColor: "#1F2937", color: "white" }
              : { backgroundColor: "#F3F4F6" }
          }
        >
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Nº
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Proyecto
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-4 py-4 sm:pl-6">{title?.code}</td>
            <td className="px-4 py-4 sm:pl-6">{title?.description}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProjectTable;
