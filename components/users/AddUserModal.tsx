"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "@/api/auth/users/addUser";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [role, setRole] = useState<"ADMIN" | "OFFICER" | "EMPLOYEE">(
    "EMPLOYEE"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createUser({
        name,
        email,
        password,
        is_active: isActive,
        role,
      });

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setIsActive(true);
      setRole("EMPLOYEE");

      onUserAdded(); // Refresh the user list
      onClose(); // Close the modal
      alert("User created successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create user";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
              {error}
            </div>
          )}

          <div>
            <label className='block text-sm font-medium mb-1'>Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter name'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              type='email'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              type='password'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Role</label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "ADMIN" | "OFFICER" | "EMPLOYEE")
              }
              className='w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='EMPLOYEE'>Employee</option>
              <option value='OFFICER'>Officer</option>
              <option value='ADMIN'>Admin</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Status</label>
            <select
              value={isActive ? "active" : "inactive"}
              onChange={(e) => setIsActive(e.target.value === "active")}
              className='w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          <div className='flex justify-end space-x-2'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
