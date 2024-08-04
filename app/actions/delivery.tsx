import axios from "axios";
import { cookies } from "next/headers";

const API_URL =
  "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects";

export async function fetchProjectsPagesNumberPages(
  query: string
): Promise<any> {
  try {
    const token = cookies().get("token")?.value;
    console.log(token);

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
      console.log(response);
      return response?.data?.length;
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

export async function fetchProjectsPages(
  query: string,
  currentPage: number
): Promise<any> {
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
      const response = await axios.get(
        `https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects?search=${query}&page=${currentPage}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { list: response?.data?.projects, total: response?.data?.total };
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
