import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  name: string | null;
  email: string;
  password: string;
  createdAt: Date;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/auth/register`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};

