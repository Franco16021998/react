import Form from "@/app/ui/cards/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCardById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { id: string; lastSegment: string; idCard: string };
}) {
  const idCard = params.idCard;
  const [card] = await Promise.all([fetchCardById(idCard)]);
  //   if (!invoice) {
  //     notFound();
  //   }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Contratos",
            href: `/dashboard/cards/${params?.id}/${params.lastSegment}`,
          },
          {
            label: "Editar contratos",
            href: `/dashboard/cards/${params?.id}/${params.lastSegment}/${params.idCard}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        card={card}
        idProject={params.lastSegment}
        idEntregable={params?.id}
      />
    </main>
  );
}
