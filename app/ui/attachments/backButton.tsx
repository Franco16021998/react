"use client";

export default function BackButton() {
  const handleBack = () => {
    window.history.back(); // Navega a la página anterior
  };

  return (
    <button
      onClick={handleBack}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Regresar
    </button>
  );
}
