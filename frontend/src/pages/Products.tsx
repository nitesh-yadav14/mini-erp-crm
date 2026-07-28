import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import DataTable from "../components/DataTable";

import type { Product } from "../types/product";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts(search);

      setProducts(data.products);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: Partial<Product>) {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);

        toast.success("Product updated successfully");
      } else {
        await createProduct(data);

        toast.success("Product created successfully");
      }

      setEditingProduct(null);
      setOpen(false);

      await loadProducts();
    } catch (err) {
      console.error(err);

      toast.error("Operation failed");
    }
  }

  async function handleEdit(id: string) {
    try {
      const product = await getProductById(id);

      setEditingProduct(product);

      setOpen(true);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load product");
    }
  }

  async function handleView(id: string) {
    try {
      const product = await getProductById(id);

      setSelectedProduct(product);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load product");
    }
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this product?");

    if (!ok) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted");

      await loadProducts();
    } catch (err) {
      console.error(err);

      toast.error("Delete failed");
    }
  }
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>

          <p className="text-gray-500">Manage your inventory products</p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Table */}

      <DataTable
        headers={[
          "Product",
          "SKU",
          "Category",
          "Stock",
          "Price",
          "Warehouse",
          "Actions",
        ]}
      >
        {loading ? (
          <tr>
            <td colSpan={7} className="text-center py-8">
              Loading products...
            </td>
          </tr>
        ) : products.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center py-8 text-gray-500">
              No products found.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4 font-semibold">{product.productName}</td>

              <td className="p-4">{product.sku}</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.currentStock <= product.minimumStock
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {product.currentStock}
                </span>
              </td>

              <td className="p-4 font-medium">₹{product.unitPrice}</td>

              <td className="p-4">{product.warehouse}</td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleView(product.id)}
                    className="text-green-600 hover:text-green-800"
                    title="View Product"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Product"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Product"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>
      {/* Add / Edit Product Modal */}

      <Modal
        open={open}
        title={editingProduct ? "Edit Product" : "Add Product"}
        onClose={() => {
          setEditingProduct(null);
          setOpen(false);
        }}
      >
        <ProductForm
          initialData={editingProduct ?? undefined}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* View Product Modal */}

      <Modal
        open={selectedProduct !== null}
        title="Product Details"
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="space-y-5">
            {/* Product Info */}

            <div className="border rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-4">
                Product Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Product Name</p>

                  <p className="font-medium">{selectedProduct.productName}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">SKU</p>

                  <p className="font-medium">{selectedProduct.sku}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Category</p>

                  <p className="font-medium">{selectedProduct.category}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Warehouse</p>

                  <p className="font-medium">{selectedProduct.warehouse}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Unit Price</p>

                  <p className="font-medium">₹{selectedProduct.unitPrice}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Current Stock</p>

                  <p className="font-medium">{selectedProduct.currentStock}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Minimum Stock</p>

                  <p className="font-medium">{selectedProduct.minimumStock}</p>
                </div>
              </div>
            </div>

            {/* Stock Status */}

            <div className="border rounded-xl p-5">
              <h3 className="font-semibold mb-3">Stock Status</h3>

              {selectedProduct.currentStock <= selectedProduct.minimumStock ? (
                <div className="bg-red-100 text-red-700 rounded-lg px-4 py-3">
                  ⚠ Low Stock Alert
                </div>
              ) : (
                <div className="bg-green-100 text-green-700 rounded-lg px-4 py-3">
                  ✅ Stock Level is Healthy
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
