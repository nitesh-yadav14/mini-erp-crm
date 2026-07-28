import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Product } from "../types/product";

type Props = {
  onSubmit: (data: Partial<Product>) => void;
  initialData?: Partial<Product>;
};

export default function ProductForm({
  onSubmit,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Partial<Product>>({
    defaultValues: {
      productName: "",
      sku: "",
      category: "",
      unitPrice: 0,
      currentStock: 0,
      minimumStock: 0,
      warehouse: "",
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
        {...register("productName")}
        placeholder="Product Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("sku")}
        placeholder="SKU"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("category")}
        placeholder="Category"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        step="0.01"
        {...register("unitPrice", {
          valueAsNumber: true,
        })}
        placeholder="Unit Price"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        {...register("currentStock", {
          valueAsNumber: true,
        })}
        placeholder="Current Stock"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        {...register("minimumStock", {
          valueAsNumber: true,
        })}
        placeholder="Minimum Stock"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("warehouse")}
        placeholder="Warehouse"
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3"
      >
        {initialData
          ? "Update Product"
          : "Save Product"}
      </button>
    </form>
  );
}