import EditProjectForm from "@/app/ui/projects/edit-form"; 
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchProjectById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [project] = await Promise.all([fetchProjectById(id)]);
  console.log("project12", project);

  //   if (!invoice) {
  //     notFound();
  //   }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Proyectos", href: "/dashboard/invoices" },
          {
            label: "Editar Proyecto",
            href: `/dashboard/projects/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProjectForm project={project} />
    </main>
  );
}
