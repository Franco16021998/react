import Form from "@/app/ui/projects/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Proyectos", href: "/dashboard/projects" },
          {
            label: "Crear Proyecto",
            href: "/dashboard/projects/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
