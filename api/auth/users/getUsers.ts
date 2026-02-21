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

export interface UsersResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UsersSummary {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  officers: number;
  employees: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getUsers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
}): Promise<UsersResponse> => {
  try {
    const response = await axios.get<UsersResponse>(`${API_URL}/users`, {
      params,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch users.");
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const getUsersSummary = async (): Promise<UsersSummary> => {
  try {
    const response = await axios.get<UsersSummary>(`${API_URL}/users/summary`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user summary."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};
