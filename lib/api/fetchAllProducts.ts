import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const getAllProducts = async (): Promise<Product[]> => {
  const API_URL = "http://localhost:3001";
  const token = localStorage.getItem("auth_token");
  const response = await axios.get(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
