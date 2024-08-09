import Form from "@/app/ui/cards/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default async function Page({
  params,
}: {
  params: { id: string; lastSegment: string };
}) {
  console.log("params", params);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Cartas",
            href: `/dashboard/cards/${params.id}/${params.lastSegment}`,
          },
          {
            label: "Crear Carta",
            href: `/dashboard/cards/${params.id}/${params.lastSegment}/create`,
            active: true,
          },
        ]}
      />
      <Form entregableId={params?.id} projectId={params?.lastSegment} />
    </main>
  );
}
