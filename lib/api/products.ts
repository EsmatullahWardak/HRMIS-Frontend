import axios from "axios";

const API_URL = "http://localhost:3001";

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  category: string;
  isActive?: boolean;
}

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

export const productsApi = {
  // Create a new product
  createProduct: async (data: CreateProductDto): Promise<Product> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/products`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Update a product
  updateProduct: async (
    id: number,
    data: CreateProductDto
  ): Promise<Product> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.put(`${API_URL}/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: number): Promise<Product> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${API_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
