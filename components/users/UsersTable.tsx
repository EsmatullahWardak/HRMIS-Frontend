"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

interface User {
  id: number;
  name: string | null;
  email: string;
  createdAt: string;
}

interface UsersTableProps {
  users: User[];
  error: string | null;
  onDeleteUser: (userId: number) => void;
  onEditUser: (user: User) => void;
  onAddUser: () => void;
}

export default function UsersTable({
  users,
  error,
  onDeleteUser,
  onEditUser,
  onAddUser,
}: UsersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className='p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
            {error}
          </div>
        )}

        {users.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>No users found.</p>
        ) : (
          <div className='overflow-x-auto'>
            <div className='flex justify-end mb-4'>
              <Button onClick={onAddUser}>+ Add User</Button>
            </div>

            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-3 font-semibold'>ID</th>
                  <th className='text-left p-3 font-semibold'>Name</th>
                  <th className='text-left p-3 font-semibold'>Email</th>
                  <th className='text-left p-3 font-semibold'>Created At</th>

                  <th className='text-left p-3 font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className='border-b hover:bg-gray-50'>
                    <td className='p-3'>{user.id}</td>
                    <td className='p-3'>{user.name || "N/A"}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className='p-3'>
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 mr-1'
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => onEditUser(user)}
                        className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
