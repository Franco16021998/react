import axios from "axios";
import { cookies } from "next/headers";

interface Project {
  id: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  created_by: string;
  updated_by: string | null;
}

const API_URL =
  "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects";

export async function fetchProjectsAll(): Promise<any> {
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
      console.log("vb");
      const response = await axios.get(
        "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      return response.data;
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
}

const calcularCantidadDeHojas = (total: number, limit: number): number => {
  if (limit <= 0) return 0; // Para evitar división por cero
  return Math.ceil(total / limit);
};

export async function fetchProjectsPages(
  query: string,
  currentPage: number
): Promise<any> {
  try {
    const token = cookies().get("token")?.value;

    // if (!token) {
    //   throw new Error("No token found");
    // }
    console.log("token", "asdasdasdas");

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
      const response = await axios.get(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects?search=${query}&page=${currentPage}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        list: response?.data?.projects,
        total: calcularCantidadDeHojas(response?.data?.total, 10),
      };
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    // throw new Error("Failed to fetch projects.");
  }
}

export async function fetchDeliveryPages(
  query: string,
  currentPage: number
): Promise<any> {
  try {
    const token = cookies().get("token")?.value;
    console.log("query", query);

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
      const response = await axios.get(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/deliverable?search=${query}&page=${currentPage}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response?.data);

      return {
        list: response?.data?.deliverables,
        total: calcularCantidadDeHojas(response?.data?.total, 10),
      };
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
}

export async function fetchProjectId(id: string): Promise<any> {
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
      const response = await axios.get(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response?.data);

      return response;
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    // throw new Error("Failed to fetch projects.");
  }
}

export async function fetchCardsPages(
  deliveryId: string,
  projectId: string
): Promise<any> {
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
      const response = await axios.get(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/letters?entregable_id=${deliveryId}&proyecto_id=${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response?.data);

      return { list: response?.data };
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
}

export async function fetchAttachmentsPages(id: string): Promise<any> {
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
      const response = await axios.get(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/letters/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const list = [];
      list.push(response?.data);

      console.log("response", response?.data);

      return { list: list };
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
}

export async function fetchGetAttachment(id: string): Promise<any> {
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
      const response = await axios.get(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/letters/${id}?action=download`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response?.data);

      return response?.data;
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
}
