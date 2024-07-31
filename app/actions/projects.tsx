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

export async function fetchProjectsPages(query: string): Promise<any> {
  try {
    const token = cookies().get("token")?.value;
    console.log(token);

    // if (!token) {
    //   throw new Error("No token found");
    // }

    const response = await axios.get(
      "https://339r05d9n5.execute-api.us-east-1.amazonaws.com/Prod/projects",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMmE3OTlkZC1mNDk0LTQxNDMtYmEzOC1lNWYxMmY5ZjIwNDgiLCJpYXQiOjE3MjI0MzY0ODgsImV4cCI6MTcyMjQzNjU0OH0.Ox0nxnBpwngvlxbGSZpE9Ml8uuQqi6h-Gr9MJBGARkc`,
        },
      }
    );
    console.log("aaa");
    // console.log("aaa", response);

    // const projectCount = response.data.length;
    // return response;
  } catch (error) {
    // console.log(req);
    console.error("Error fetching projects:", error);
    // throw new Error("Failed to fetch projects.");
  }
}
