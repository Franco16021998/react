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
  idLetter: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateProject = FormSchemaProject.omit({ id: true, date: true });
const CreateAttachment = FormSchemaAttachment.omit({ id: true });

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
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  try {
    const token = cookies().get("token")?.value;

    // if (!token) {
    //   throw new Error("No token found");
    // }

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

    // console.log("aaa");
    // console.log("aaa", response);

    // const projectCount = response.data.length;
    // return response;
  } catch (error) {
    // console.log(req);
    console.error("Error fetching projects:", error);
    // throw new Error("Failed to fetch projects.");
  }

  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");

  // Test it out:
}

export async function createAttachment(
  prevState: StateAttachment,
  formData: FormData
) {
  const validatedFields = CreateAttachment.safeParse({
    fileContent: formData.get("fileContent"),
    fileName: formData.get("fileName"),
    comentarios: formData.get("comentarios"),
    idLetter: formData.get("idLetter"),
  });

  console.log("aaa", formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { fileContent, fileName, comentarios, idLetter } = validatedFields.data;

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
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/letters/${idLetter}?action=upload`,
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
      console.log('asdasdasdas',response);

      revalidatePath("/dashboard/attachments/" + idLetter);
      redirect("/dashboard/attachments/" + idLetter);
    }
  } catch (error) {
    // console.log(req);
    console.error("Error fetching projects:", error);
    // throw new Error("Failed to fetch projects.");
  }

  revalidatePath("/dashboard/attachments/" + idLetter);
  redirect("/dashboard/attachments/" + idLetter);

  // Test it out:
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
