import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function getLoans() {
  const response = await axios.get(`${API_URL}/loans`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}
