"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAuthenticated, getUserFromToken } from "@/lib/auth";
import AddProductModal from "@/components/products/AddProductModal";
import { productsApi } from "@/lib/api/products";
import { Pencil, Trash2 } from "lucide-react";
import EditProductModal from "@/components/products/EditProductModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
      fetchProducts();
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAllProducts();
      console.log("Fetched products:", data); // Debug log
      // Ensure data is always an array
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("API returned non-array data:", data);
        setProducts([]);
      }
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to fetch products";
      setError(msg);
      console.error("Error fetching products:", err);
      setProducts([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = () => {
    fetchProducts(); // Refresh the products list
  };
  const handleProductUpdated = () => {
    fetchProducts(); // Refresh the products list
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setDeleteLoading(true);
    try {
      await productsApi.deleteProduct(productToDelete.id);
      console.log("Product deleted successfully");
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
      fetchProducts(); // Refresh the products list
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <p className='text-lg'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>
              Products Management
            </h1>
            <p className='text-gray-600 mt-1'>Manage your products here</p>
          </div>

          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Product</Button>
        </div>

        {/* Products Display */}
        <div className='bg-white rounded-lg shadow p-6'>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}

          {products.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-500'>
                No products found. Add your first product!
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Description
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Price
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Category
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {product.name}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-500'>
                        {product.description || "-"}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        ${product.price.toFixed(2)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {product.category}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleEditClick(product)}
                            className='h-8 w-8 p-0'
                          >
                            <Pencil className='h-4 w-4 text-blue-600' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDeleteClick(product)}
                            className='h-8 w-8 p-0'
                          >
                            <Trash2 className='h-4 w-4 text-red-600' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={handleProductUpdated}
        product={selectedProduct}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{productToDelete?.name}
              ". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
              className='bg-red-600 hover:bg-red-700'
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
