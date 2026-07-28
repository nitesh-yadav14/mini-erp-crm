import { useEffect, useState } from "react";
import { Plus, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import InventoryForm from "../components/InventoryForm";

import type { Product } from "../types/product";

import { getAllProducts } from "../services/product.service";

import { updateStock, getMovements } from "../services/inventory.service";

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [movements, setMovements] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [movementType, setMovementType] = useState<"IN" | "OUT">("IN");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getAllProducts();

      setProducts(data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }

  async function loadMovements(productId: string) {
    try {
      const data = await getMovements(productId);

      setMovements(data);

      const product = products.find((p) => p.id === productId) ?? null;

      setSelectedProduct(product);
    } catch (err) {
      toast.error("Unable to load stock history");
    }
  }

  async function handleUpdate(data: any) {
    if (!selectedProduct) return;

    try {
      await updateStock(selectedProduct.id, {
        ...data,
        movementType,
      });

      toast.success("Stock updated successfully");

      setOpen(false);

      await loadProducts();

      await loadMovements(selectedProduct.id);
    } catch (err) {
      toast.error("Failed to update stock");
    }
  }
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>

          <p className="text-gray-500">Manage warehouse stock</p>
        </div>
      </div>

      {/* Products Table */}

      <DataTable
        headers={[
          "Product",
          "SKU",
          "Current Stock",
          "Minimum",
          "Warehouse",
          "Actions",
        ]}
      >
        {loading ? (
          <tr>
            <td colSpan={6} className="text-center py-8">
              Loading inventory...
            </td>
          </tr>
        ) : products.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-8 text-gray-500">
              No products available
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{product.productName}</td>

              <td className="p-4">{product.sku}</td>

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

              <td className="p-4">{product.minimumStock}</td>

              <td className="p-4">{product.warehouse}</td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setMovementType("IN");
                      setSelectedProduct(product);
                      setOpen(true);
                    }}
                    className="text-green-600 hover:text-green-800"
                    title="Stock In"
                  >
                    <ArrowUpCircle size={20} />
                  </button>

                  <button
                    onClick={() => {
                      setMovementType("OUT");
                      setSelectedProduct(product);
                      setOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                    title="Stock Out"
                  >
                    <ArrowDownCircle size={20} />
                  </button>

                  <button
                    onClick={() => loadMovements(product.id)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm"
                  >
                    History
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>
      {/* Stock Update Modal */}

      <Modal
        open={open}
        title={movementType === "IN" ? "Stock In" : "Stock Out"}
        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
        }}
      >
        {selectedProduct && (
          <InventoryForm
            movementType={movementType}
            product={selectedProduct}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>

      {/* Stock History */}

      <Modal
        open={selectedProduct !== null && !open}
        title={`Stock History ${
          selectedProduct ? `- ${selectedProduct.productName}` : ""
        }`}
        onClose={() => {
          setSelectedProduct(null);
          setMovements([]);
        }}
      >
        <div className="max-h-[450px] overflow-y-auto">
          {movements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No stock movements found.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3">Date</th>

                  <th className="text-left p-3">Type</th>

                  <th className="text-left p-3">Qty</th>

                  <th className="text-left p-3">Reason</th>

                  <th className="text-left p-3">By</th>
                </tr>
              </thead>

              <tbody>
                {movements.map((movement) => (
                  <tr key={movement.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {new Date(movement.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          movement.movementType === "IN"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {movement.movementType}
                      </span>
                    </td>

                    <td className="p-3">{movement.quantity}</td>

                    <td className="p-3">{movement.reason}</td>

                    <td className="p-3">{movement.createdBy?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Modal>
    </div>
  );
}
