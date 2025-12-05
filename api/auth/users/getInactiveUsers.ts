import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface User {
  id: number;
  name: string | null;
  email: string;
  createdAt: string;
  is_active: boolean;
}

export const getInactiveUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/inactive`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch inactive users."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};