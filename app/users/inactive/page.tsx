"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAuthenticated, getUserFromToken, logout } from "@/lib/auth";
import { getInactiveUsers } from "@/api/auth/users/getInactiveUsers";
import { deleteUser } from "@/api/auth/users/deleteUser";
import UsersTable from "@/components/users/UsersTable";
import { updateUser } from "@/api/auth/users/updateUser";
import EditUserModal from "@/components/users/EditUserModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: number;
  name: string | null;
  email: string;
  createdAt: string;
  is_active: boolean;
}

export default function InactiveUsersPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const tokenData = getUserFromToken();
    const userData = localStorage.getItem("user");

    if (tokenData && userData) {
      setCurrentUser(JSON.parse(userData));
      fetchUsers();
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (
    userId: number,
    userData: { name: string; email: string; is_active: boolean }
  ) => {
    try {
      await updateUser(userId, userData);
      fetchUsers();
      setIsEditModalOpen(false);
      alert("User updated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user";
      alert(errorMessage);
      console.error("Update error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getInactiveUsers();
      setUsers(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to fetch users";
      setError(msg);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        fetchUsers();
        alert("User deleted successfully!");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to delete user";
        alert(errorMessage);
        console.error("Delete error:", error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-background'>
        <p className='text-lg'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Inactive Users</h1>
            <p className='text-muted-foreground mt-1'>
              Logged in as: {currentUser?.email}
            </p>
          </div>

          <Button onClick={handleLogout} variant='destructive'>
            Logout
          </Button>
        </div>

        {/* Inactive Users Cards */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-4 text-red-600'>
            Inactive Users ({users.length})
          </h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle className='text-lg'>
                    {user.name || "No Name"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>{user.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <UsersTable
          users={users}
          error={error}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />

        <EditUserModal
          user={editingUser}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveUser}
        />
      </div>
    </div>
  );
}
