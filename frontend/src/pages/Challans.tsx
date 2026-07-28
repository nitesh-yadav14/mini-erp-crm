import { useEffect, useState } from "react";
import { Plus, Eye, Download, Ban } from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import ChallanForm from "../components/ChallanForm";

import { generateChallanPDF } from "../utils/generateChallanPDF";

import type { Challan } from "../types/challan";
import type { Customer } from "../types/customer";
import type { Product } from "../types/product";

import {
  getChallans,
  getChallanById,
  createChallan,
  cancelChallan,
} from "../services/challan.service";

import { getCustomers } from "../services/customer.service";
import { getAllProducts } from "../services/product.service";

export default function Challans() {
  const [challans, setChallans] = useState<Challan[]>([]);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  const [selectedChallan, setSelectedChallan] = useState<Challan | null>(null);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [challanData, customerData, productData] = await Promise.all([
        getChallans(),
        getCustomers("", 1, 1000),
        getAllProducts(),
      ]);

      setChallans(challanData);
      setCustomers(customerData.customers);
      setProducts(productData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load challans");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: any) {
    try {
      await createChallan(data);

      toast.success("Challan created successfully");

      setOpen(false);

      await loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Failed to create challan");
    }
  }

  async function handleView(id: string) {
    try {
      const challan = await getChallanById(id);

      setSelectedChallan(challan);
    } catch {
      toast.error("Unable to load challan");
    }
  }

  async function handleCancel(id: string) {
    const ok = window.confirm("Cancel this challan?");

    if (!ok) return;

    try {
      await cancelChallan(id);

      toast.success("Challan cancelled");

      loadData();
    } catch {
      toast.error("Unable to cancel challan");
    }
  }

  const filteredChallans = challans.filter((challan) => {
    const value = search.toLowerCase();

    return (
      challan.challanNumber.toLowerCase().includes(value) ||
      challan.customer?.customerName.toLowerCase().includes(value)
    );
  });
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Challans</h1>

          <p className="text-gray-500">Manage Sales Challans</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Create Challan
        </button>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search Challans..."
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}

      <DataTable
        headers={[
          "Challan",
          "Customer",
          "Items",
          "Quantity",
          "Status",
          "Actions",
        ]}
      >
        {loading ? (
          <tr>
            <td colSpan={6} className="text-center py-8">
              Loading Challans...
            </td>
          </tr>
        ) : filteredChallans.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-8 text-gray-500">
              No Challans Found
            </td>
          </tr>
        ) : (
          filteredChallans.map((challan) => (
            <tr key={challan.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-semibold">{challan.challanNumber}</td>

              <td className="p-4">{challan.customer?.customerName}</td>

              <td className="p-4">{challan.items.length}</td>

              <td className="p-4">{challan.totalQuantity}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    challan.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : challan.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {challan.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleView(challan.id)}
                    className="text-green-600 hover:text-green-800"
                    title="View Challan"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => generateChallanPDF(challan)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Download PDF"
                  >
                    <Download size={18} />
                  </button>

                  {challan.status !== "CANCELLED" && (
                    <button
                      onClick={() => handleCancel(challan.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Cancel Challan"
                    >
                      <Ban size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>
      {/* Create Challan Modal */}

      <Modal open={open} title="Create Challan" onClose={() => setOpen(false)}>
        <ChallanForm
          customers={customers}
          products={products}
          onSubmit={handleCreate}
        />
      </Modal>

      {/* View Challan */}

      <Modal
        open={selectedChallan !== null}
        title="Challan Details"
        onClose={() => setSelectedChallan(null)}
      >
        {selectedChallan && (
          <div className="space-y-6">
            {/* Header */}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Challan Number</p>

                <p className="font-semibold">{selectedChallan.challanNumber}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Customer</p>

                <p className="font-semibold">
                  {selectedChallan.customer?.customerName}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedChallan.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : selectedChallan.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedChallan.status}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Total Quantity</p>

                <p className="font-semibold">{selectedChallan.totalQuantity}</p>
              </div>
            </div>

            {/* Items */}

            <div>
              <h3 className="font-bold mb-3">Challan Items</h3>

              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Product</th>

                    <th className="p-3 text-left">SKU</th>

                    <th className="p-3 text-left">Qty</th>

                    <th className="p-3 text-left">Price</th>

                    <th className="p-3 text-left">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedChallan.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{item.productName}</td>

                      <td className="p-3">{item.sku}</td>

                      <td className="p-3">{item.quantity}</td>

                      <td className="p-3">₹{item.unitPrice}</td>

                      <td className="p-3 font-medium">
                        ₹{(item.unitPrice ?? 0) * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-gray-500">Total Items</p>

                <h2 className="text-xl font-bold">
                  {selectedChallan.items.length}
                </h2>
              </div>

              <button
                onClick={() => generateChallanPDF(selectedChallan)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
