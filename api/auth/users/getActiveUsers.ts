import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface User {
  id: number;
  name: string | null;
  email: string;
  createdAt: string;
  is_active: boolean;
  role: "ADMIN" | "OFFICER" | "EMPLOYEE";
}

export const getActiveUsers = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/users/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch users."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};
