"use client";

import Link from "next/link";

export default function BackButton({
  previousPageUrl,
}: {
  previousPageUrl?: any;
}) {
  return (
    <Link
      href={`/dashboard/delivery/${previousPageUrl?.lastSegment}`}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Regresar
    </Link>
  );
}
