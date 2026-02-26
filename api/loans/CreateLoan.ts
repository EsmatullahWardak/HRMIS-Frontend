import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

interface CreateLoanData {
  type: string;
  amount: number;
  remaining: number;
  monthlyDeduction: number;
  status?: string;
  guarantor?: string;
  notes?: string;
  progress?: number;
}

export async function createLoan(data: CreateLoanData) {
  const response = await axios.post(`${API_URL}/loans`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
}
