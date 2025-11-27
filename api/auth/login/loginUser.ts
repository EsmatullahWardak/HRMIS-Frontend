import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginUser) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "login failed. Please try again."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};