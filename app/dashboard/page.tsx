"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data - you can replace this with real data from your API
const userData = [
  { name: "Active Users", count: 25, fill: "#22c55e" },
  { name: "Inactive Users", count: 10, fill: "#ef4444" },
];

const productData = [
  { name: "Active Products", count: 50, fill: "#22c55e" },
  { name: "Inactive Products", count: 15, fill: "#ef4444" },
];

export default function DashboardPage() {
  return (
    <div className='space-y-8'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>

      {/* Users Bar Chart */}
      <div className='bg-white p-6 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>Users Overview</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={userData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='count' name='Users' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Products Bar Chart */}
      <div className='bg-white p-6 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>Products Overview</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='count' name='Products' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
