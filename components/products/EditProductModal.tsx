"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { productsApi, CreateProductDto, Product } from "@/lib/api/products";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
  product: Product | null;
}

export default function EditProductModal({
  isOpen,
  onClose,
  onProductUpdated,
  product,
}: EditProductModalProps) {
  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    category: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        category: product.category,
        isActive: product.isActive,
      });
    }
  }, [product]);

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

      if (!product) {
        setError("No product selected");
        setLoading(false);
        return;
      }

      await productsApi.updateProduct(product.id, formData);
      console.log("Product updated successfully");

      // Close modal first
      onClose();

      // Then refresh products list
      onProductUpdated();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update product");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            {error && (
              <div className='bg-red-50 text-red-600 p-3 rounded-md text-sm'>
                {error}
              </div>
            )}

            {/* Name */}
            <div className='grid gap-2'>
              <Label htmlFor='edit-name'>
                Name <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='edit-name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder='Enter product name'
                required
              />
            </div>

            {/* Description */}
            <div className='grid gap-2'>
              <Label htmlFor='edit-description'>Description</Label>
              <Input
                id='edit-description'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder='Enter product description'
              />
            </div>

            {/* Price */}
            <div className='grid gap-2'>
              <Label htmlFor='edit-price'>
                Price <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='edit-price'
                type='number'
                step='0.01'
                min='0'
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder='0.00'
                required
              />
            </div>

            {/* Category */}
            <div className='grid gap-2'>
              <Label htmlFor='edit-category'>
                Category <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='edit-category'
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder='Enter product category'
                required
              />
            </div>

            {/* Active Status */}
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='edit-isActive'
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked as boolean })
                }
              />
              <Label
                htmlFor='edit-isActive'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Active
              </Label>
            </div>
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
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
