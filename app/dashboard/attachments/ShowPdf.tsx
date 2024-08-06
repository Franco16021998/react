import React, { useState } from "react";
import Modal from "react-modal";

// Modal.setAppElement("#root"); // Asegura que la aplicación tenga un elemento raíz

interface PdfModalProps {
  pdfUrl: any;
}

const PdfModal: React.FC<PdfModalProps> = ({ pdfUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  return (
    <div>
      <button onClick={openModal}>Ver PDF</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="PDF Viewer"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
          },
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <button onClick={closeModal} style={{ alignSelf: "flex-end" }}>
            Cerrar
          </button>
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </div>
  );
};

export default PdfModal;
