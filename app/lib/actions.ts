"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const FormSchemaProject = z.object({
  id: z.string(),
  code: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  description: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  date: z.string(),
});

const FormSchemaAttachment = z.object({
  id: z.string(),
  fileContent: z.string(),
  fileName: z.string(),
  comentarios: z.string(),
  // idLetter: z.string(),
});

const FormCard = z.object({
  id: z.string(),
  reference: z.string(),
  fechalimite: z.string(),
  entregable_id: z.string(),
  proyecto_id: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateProject = FormSchemaProject.omit({ id: true, date: true });
const CreateAttachment = FormSchemaAttachment.omit({ id: true });
const CreateCard = FormCard.omit({ id: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateProjects = {
  errors?: {
    description?: string[];
    code?: string[];
  };
  message?: string | null;
};

export type StateAttachment = {
  errors?: {
    fileContent?: string[];
    fileName?: string[];
    comentarios?: string[];
  };
  message?: string | null;
};

export type StateCard = {
  errors?: {
    reference?: string[];
    fechalimite?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");

  // Test it out:
}

export async function createProject(
  prevState: StateProjects,
  formData: FormData
) {
  const validatedFields = CreateProject.safeParse({
    code: formData.get("code"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { code, description } = validatedFields.data;

  try {
    const token = cookies().get("token")?.value;

    const { data } = await axios.post(
      "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data === "Token is valid") {
      await axios.post(
        "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects",
        {
          code: code,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      revalidatePath("/dashboard/projects");
      redirect("/dashboard/projects");
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

const UpdateProject = FormSchemaProject.omit({ id: true, date: true });

export async function editProject(
  id: string,
  prevState: StateProjects,
  formData: FormData
) {
  const validatedFields = UpdateProject.safeParse({
    code: formData.get("code"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { code, description } = validatedFields.data;

  try {
    const token = cookies().get("token")?.value;

    const { data } = await axios.post(
      "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data === "Token is valid") {
      await axios.put(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects/${id}`,
        {
          code: code,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      revalidatePath("/dashboard/projects");
      redirect("/dashboard/projects");
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function createAttachment(
  prevState: StateAttachment,
  formData: FormData
) {
  const validatedFields = CreateAttachment.safeParse({
    fileContent: formData.get("fileContent"),
    fileName: formData.get("fileName"),
    comentarios: formData.get("comentarios"),
    // idLetter: formData.get("idLetter"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { fileContent, fileName, comentarios } = validatedFields.data;

  try {
    const token = cookies().get("token")?.value;

    const { data } = await axios.post(
      "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data === "Token is valid") {
      const response = await axios.patch(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/letters/${formData.get(
          "idLetter"
        )}?action=upload`,
        {
          fileContent: fileContent,
          fileName: fileName,
          comentarios: comentarios,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    // console.log(req);
    console.error("Error fetching projects:", error);
    // throw new Error("Failed to fetch projects.");
  }

  revalidatePath("/dashboard/attachments/" + formData.get("idLetter"));
  redirect("/dashboard/attachments/" + formData.get("idLetter"));

  // Test it out:
}

const FormCardEdit = z.object({
  id: z.string(),
  reference: z.string(),
  fechalimite: z.string(),
});

const UpdateCard = FormCardEdit.omit({ id: true });

export async function editCard(
  idCard: string,
  idProject: string,
  idEntregable: string,
  prevState: StateCard,
  formData: FormData
) {
  const validatedFields = UpdateCard.safeParse({
    reference: formData.get("reference"),
    fechalimite: formData.get("fechalimite"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Invoice.",
    };
  }
  const { reference, fechalimite } = validatedFields.data;

  try {
    const token = cookies().get("token")?.value;

    const { data } = await axios.post(
      "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data === "Token is valid") {
      await axios.put(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/letters/${idCard}`,
        {
          referencia: reference,
          fechalimite: fechalimite,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  revalidatePath("/dashboard/cards/" + idEntregable + "/" + idProject);
  redirect("/dashboard/cards/" + idEntregable + "/" + idProject);
}

export async function createCard(prevState: StateCard, formData: FormData) {
  const validatedFields = CreateCard.safeParse({
    reference: formData.get("reference"),
    fechalimite: formData.get("fechalimite"),
    entregable_id: formData.get("entregable_id"),
    proyecto_id: formData.get("proyecto_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { reference, fechalimite, entregable_id, proyecto_id } =
    validatedFields.data;

  try {
    const token = cookies().get("token")?.value;

    const { data } = await axios.post(
      "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data === "Token is valid") {
      const response = await axios.post(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/letters`,
        {
          referencia: reference,
          fechalimite: fechalimite,
          entregable_id: entregable_id,
          proyecto_id: proyecto_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  revalidatePath("/dashboard/cards/" + entregable_id + "/" + proyecto_id);
  redirect("/dashboard/cards/" + entregable_id + "/" + proyecto_id);
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

export async function deleteItem(id: string) {
  try {
    const token = cookies().get("token")?.value;

    const { data } = await axios.post(
      "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/authentication/validateToken",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data === "Token is valid") {
      const response = await axios.delete(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    revalidatePath("/dashboard/projects");

  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}
