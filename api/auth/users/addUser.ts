import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface User {
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  role: "ADMIN" | "OFFICER" | "EMPLOYEE";
}

export const createUser = async (data: User) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/users`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to create user. Please try again."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};
