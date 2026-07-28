import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../components/Modal";
import CustomerForm from "../components/CustomerForm";
import DataTable from "../components/DataTable";
import EmptyState from "../components/EmptyState";

import type { Customer } from "../types/customer";

import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service";

export default function Customers() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCustomers();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  async function loadCustomers() {
    try {
      setLoading(true);

      const data =
        await getCustomers(search);

      setCustomers(data.customers);
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to load customers"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    data: Partial<Customer>
  ) {
    try {
      if (editingCustomer) {
        await updateCustomer(
          editingCustomer.id,
          data
        );

        toast.success(
          "Customer updated successfully"
        );
      } else {
        await createCustomer(data);

        toast.success(
          "Customer created successfully"
        );
      }

      setEditingCustomer(null);
      setOpen(false);

      await loadCustomers();
    } catch (err) {
      console.error(err);

      toast.error(
        "Operation failed"
      );
    }
  }

  async function handleEdit(
    id: string
  ) {
    try {
      const customer =
        await getCustomerById(id);

      setEditingCustomer(customer);
      setOpen(true);
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to load customer"
      );
    }
  }

  async function handleDelete(
    id: string
  ) {
    const ok = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!ok) return;

    try {
      await deleteCustomer(id);

      toast.success(
        "Customer deleted"
      );

      await loadCustomers();
    } catch (err) {
      console.error(err);

      toast.error(
        "Delete failed"
      );
    }
  }

  async function handleView(
    id: string
  ) {
    try {
      const customer =
        await getCustomerById(id);

      setSelectedCustomer(customer);
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to load customer"
      );
    }
  }
  return (
  <div className="space-y-8">

    {/* Header */}

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Customers
        </h1>

        <p className="text-gray-500 mt-2">
          Manage customer records and business relationships.
        </p>

      </div>

      <button
        onClick={() => {
          setEditingCustomer(null);
          setOpen(true);
        }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600
        hover:from-blue-700 hover:to-indigo-700
        text-white px-6 py-3 rounded-xl
        flex items-center gap-2
        shadow-md hover:shadow-xl
        transition-all duration-300"
      >
        <Plus size={20} />

        Add Customer

      </button>

    </div>

    {/* Search */}

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300">

      <input
        type="text"
        placeholder="🔍 Search customers by name, email or business..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border border-gray-300 rounded-xl px-4 py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        transition-all duration-300"
      />

    </div>

    {/* Customer Table */}

    <DataTable
      headers={[
        "Customer",
        "Business",
        "Email",
        "Mobile",
        "Type",
        "Status",
        "Actions",
      ]}
    >

      {loading ? (

        <tr>

          <td
            colSpan={7}
            className="text-center py-10"
          >
            Loading customers...
          </td>

        </tr>

      ) : customers.length === 0 ? (

        <tr>

          <td colSpan={7}>

            <EmptyState
              title="No Customers"
              subtitle="Click 'Add Customer' to create your first customer."
            />

          </td>

        </tr>

      ) : (

        customers.map((customer) => (

  <tr
    key={customer.id}
    className="border-b hover:bg-blue-50 transition-all duration-300"
  >

    {/* Customer Name */}

    <td className="p-4">

      <div>

        <h3 className="font-semibold text-slate-800">
          {customer.customerName}
        </h3>

        <p className="text-xs text-gray-500">
          ID: {customer.id.slice(0, 8)}
        </p>

      </div>

    </td>

            {/* Business */}

            <td className="p-4">

              <span className="font-medium text-slate-700">
                {customer.businessName}
              </span>

            </td>

            {/* Email */}

            <td className="p-4 text-gray-600">
              {customer.email}
            </td>

            {/* Mobile */}

            <td className="p-4">
              {customer.mobile}
            </td>

            {/* Customer Type */}

            <td className="p-4">

              <span
                className={`px-4 py-1 rounded-full text-xs font-bold shadow-sm ${
                  customer.customerType === "RETAIL"
                    ? "bg-blue-100 text-blue-700"
                    : customer.customerType ===
                      "WHOLESALE"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {customer.customerType}
              </span>

            </td>

            {/* Status */}

            <td className="p-4">

              <span
                className={`px-4 py-1 rounded-full text-xs font-bold shadow-sm ${
                  customer.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : customer.status === "LEAD"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {customer.status}
              </span>

            </td>

            {/* Actions */}

            <td className="p-4">

              <div className="flex items-center gap-2">

                {/* View */}

                <button
                  onClick={() =>
                    handleView(customer.id)
                  }
                  title="View Customer"
                  className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-300"
                >
                  <Eye size={18} />
                </button>

                {/* Edit */}

                <button
                  onClick={() =>
                    handleEdit(customer.id)
                  }
                  title="Edit Customer"
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300"
                >
                  <Pencil size={18} />
                </button>

                {/* Delete */}

                <button
                  onClick={() =>
                    handleDelete(customer.id)
                  }
                  title="Delete Customer"
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </td>

          </tr>

        ))

      )}

    </DataTable>
          {/* Add / Edit Customer Modal */}

      <Modal
        open={open}
        title={
          editingCustomer
            ? "Edit Customer"
            : "Add Customer"
        }
        onClose={() => {
          setEditingCustomer(null);
          setOpen(false);
        }}
      >
        <CustomerForm
          initialData={
            editingCustomer ?? undefined
          }
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* View Customer Modal */}

      <Modal
        open={selectedCustomer !== null}
        title="Customer Details"
        onClose={() =>
          setSelectedCustomer(null)
        }
      >
        {selectedCustomer && (
          <div className="space-y-6">

            {/* Customer Information */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <h2 className="text-xl font-bold text-slate-800 mb-5">
                Customer Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <p className="text-sm text-gray-500">
                    Customer Name
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {selectedCustomer.customerName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Business Name
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {selectedCustomer.businessName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="mt-1">
                    {selectedCustomer.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Mobile
                  </p>

                  <p className="mt-1">
                    {selectedCustomer.mobile}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Customer Type
                  </p>

                  <span className="inline-block mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                    {selectedCustomer.customerType}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
                      selectedCustomer.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : selectedCustomer.status === "LEAD"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedCustomer.status}
                  </span>
                </div>

              </div>

            </div>

            {/* Address */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <h3 className="font-semibold text-slate-800 mb-3">
                Address
              </h3>

              <p className="text-gray-700">
                {selectedCustomer.address || "No address provided"}
              </p>

            </div>

            {/* GST */}

            {selectedCustomer.gstNumber && (

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h3 className="font-semibold text-slate-800 mb-3">
                  GST Number
                </h3>

                <p className="font-medium">
                  {selectedCustomer.gstNumber}
                </p>

              </div>

            )}

            {/* Notes */}

            {selectedCustomer.notes && (

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h3 className="font-semibold text-slate-800 mb-3">
                  Notes
                </h3>

                <p className="text-gray-700">
                  {selectedCustomer.notes}
                </p>

              </div>

            )}

          </div>
        )}
      </Modal>

          </div>
  );
}