import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Customer } from "../types/customer";

type Props = {
  onSubmit: (data: Partial<Customer>) => void;
  initialData?: Partial<Customer>;
};

export default function CustomerForm({
  onSubmit,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Partial<Customer>>({
    defaultValues: {
      customerName: "",
      businessName: "",
      email: "",
      mobile: "",
      address: "",
      gstNumber: "",
      customerType: "RETAIL",
      status: "LEAD",
      notes: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        {...register("customerName")}
        placeholder="Customer Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("businessName")}
        placeholder="Business Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("mobile")}
        placeholder="Mobile Number"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        {...register("address")}
        placeholder="Address"
        rows={3}
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("gstNumber")}
        placeholder="GST Number"
        className="w-full border rounded-lg p-3"
      />

      <select
        {...register("customerType")}
        className="w-full border rounded-lg p-3"
      >
        <option value="RETAIL">Retail</option>
        <option value="WHOLESALE">Wholesale</option>
        <option value="DISTRIBUTOR">Distributor</option>
      </select>

      <select
        {...register("status")}
        className="w-full border rounded-lg p-3"
      >
        <option value="LEAD">Lead</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>

      <textarea
        {...register("notes")}
        placeholder="Notes"
        rows={3}
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition"
      >
        {initialData ? "Update Customer" : "Save Customer"}
      </button>
    </form>
  );
}