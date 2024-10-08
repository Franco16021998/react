"use client";

import React, { useActionState, useEffect, useState } from "react";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { createAttachment, StateAttachment } from "@/app/lib/actions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";
import { Button } from "@/app/ui/button";
import { useFormStatus } from "react-dom";

interface ModalProps {
  idLetter: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          Guardando...
        </div>
      ) : (
        "Grabar"
      )}
    </Button>
  );
}

const Modal: React.FC<ModalProps> = ({ idLetter }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const initialState: StateAttachment = { message: null, errors: {} };
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [comentarios, setComentarios] = useState<string>("");
  const createCardAttachment = createAttachment.bind(
    null,
    fileContent,
    fileName,
    comentarios,
    idLetter
  );

  const [state, formAction] = useActionState(
    createCardAttachment,
    initialState
  );

  useEffect(() => {
    setIsModalOpen(false);
  }, [state]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(",")[1];
        setFileContent(base64String || "");
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (fileContent && fileName) {
  //     const formData = new FormData();
  //     formData.append("fileContent", fileContent);
  //     formData.append("fileName", fileName);
  //     formData.append("comentarios", comentarios);
  //     formData.append("idLetter", idLetter);

  //     // Llama a formAction con los datos necesarios
  //     formAction(formData);
  //     // closeModal(); // Cierra el modal si es necesario
  //   } else {
  //     console.error("No file selected or file content is empty");
  //   }
  // };

  return (
    <div>
      <button
        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        onClick={openModal}
      >
        <ArchiveBoxIcon className="w-6 h-6" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            action={formAction}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl w-4/12 relative"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Nuevo Archivo PDF
            </h2>

            <div className="mb-4">
              <label
                htmlFor="pdfFile"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Selecciona un archivo PDF
              </label>
              <input
                type="file"
                id="pdfFile"
                name="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Comentario
              </label>
              <textarea
                id="comment"
                name="comentarios"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black"
                rows={4}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cerrar
              </button>
              <SubmitButton />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Modal;
