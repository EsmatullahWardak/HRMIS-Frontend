import axios from "axios";

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
  const response = await axios.post("http://localhost:3001/loans", data);
  return response.data;
}
