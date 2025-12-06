const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  recentUsers: {
    id: number;
    name: string | null;
    email: string;
    createdAt: string;
  }[];
  recentProducts: {
    id: number;
    name: string;
    category: string;
    price: number;
    createdAt: string;
  }[];
}

// Fetch dashboard stats
export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return response.json();
}