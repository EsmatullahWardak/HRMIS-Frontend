import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const updateUser = async (
  userId: number,
  userData: { name: string; email: string; is_active?: boolean }
) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update user."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};
