"use client";

import React, { useActionState, useState } from "react";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { createAttachment, StateAttachment } from "@/app/lib/actions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/theme/store";

interface ModalProps {
  idLetter: string;
}

const Modal: React.FC<ModalProps> = ({ idLetter }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const initialState: StateAttachment = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAttachment, initialState);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [comentarios, setComentarios] = useState<string>("");

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fileContent && fileName) {
      const formData = new FormData();
      formData.append("fileContent", fileContent);
      formData.append("fileName", fileName);
      formData.append("comentarios", comentarios);
      formData.append("idLetter", idLetter);

      // Llama a formAction con los datos necesarios
      formAction(formData);
      closeModal(); // Cierra el modal si es necesario
    } else {
      console.error("No file selected or file content is empty");
    }
  };

  return (
    <div>
      <button className="bg-blue-500" onClick={openModal}>
        <ArchiveBoxIcon className="w-6" />
      </button>

      {isModalOpen && (
        <form onSubmit={handleSubmit}>
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            style={isDarkMode ? { color: "black" } : { color: "#F3F4F6" }}
          >
            <div className="bg-white p-4 rounded">
              <h2>PDF Nuevo</h2>
              <div>
                <label htmlFor="pdfFile">Archivo PDF</label>
                <input
                  name="file"
                  id="pdfFile"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label htmlFor="comment">Comentario</label>
                <textarea
                  name="comentarios"
                  id="comment"
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button className="mr-2" onClick={closeModal}>
                  Cerrar
                </button>
                <button type="submit" className="bg-blue-500 text-white">
                  Grabar
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Modal;
