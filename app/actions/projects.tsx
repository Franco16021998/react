import axios from "axios";

interface Project {
  id: string;
  code: string;
  description: string;
  created_at: string; // Puedes usar `Date` si deseas trabajar con objetos de fecha
  updated_at: string; // Igual que arriba, puedes usar `Date`
  is_active: boolean;
  created_by: string;
  updated_by: string | null; // Puede ser null, por lo tanto se indica con `string | null`
}

const API_URL =
  "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects";

export async function fetchProjectsPages(query: string): Promise<number> {
  try {
    // Obtén el token del localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get<Project[]>(`${API_URL}${query}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // const projectCount = response.data.length; // Calcula la cantidad de proyectos
    return 10;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}
