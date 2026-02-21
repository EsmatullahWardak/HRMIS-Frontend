"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  id: number;
  name: string | null;
  email: string;
  is_active: boolean;
  role: "ADMIN" | "OFFICER" | "EMPLOYEE";
}

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    userId: number,
    userData: {
      name: string;
      email: string;
      is_active: boolean;
      role: "ADMIN" | "OFFICER" | "EMPLOYEE";
    }
  ) => void;
}

export default function EditUserModal({
  user,
  isOpen,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [role, setRole] = useState<"ADMIN" | "OFFICER" | "EMPLOYEE">(
    "EMPLOYEE"
  );

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setIsActive(user.is_active);
      setRole(user.role);
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      onSave(user.id, { name, email, is_active: isActive, role });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter name'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              type='email'
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
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
