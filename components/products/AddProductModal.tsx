"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { productsApi, CreateProductDto } from "@/lib/api/products";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
}: AddProductModalProps) {
  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    category: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.category || formData.price <= 0) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const result = await productsApi.createProduct(formData);
      console.log("Product created successfully:", result);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        isActive: true,
      });

      // Close modal first
      onClose();

      // Then refresh products list
      onProductAdded();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create product");
      console.error("Error creating product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
              {error}
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='name'>
              Product Name <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter product name'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter product description (optional)'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='price'>
              Price <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='price'
              name='price'
              type='number'
              step='0.01'
              min='0'
              value={formData.price}
              onChange={handleChange}
              placeholder='0.00'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='category'>
              Category <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              placeholder='Enter product category'
              required
            />
          </div>

          <div className='flex items-center space-x-2'>
            <input
              id='isActive'
              name='isActive'
              type='checkbox'
              checked={formData.isActive}
              onChange={handleChange}
              className='h-4 w-4 rounded border-gray-300'
            />
            <Label htmlFor='isActive' className='cursor-pointer'>
              Active Product
            </Label>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
