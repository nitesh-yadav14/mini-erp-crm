import { useForm } from "react-hook-form";
import type { Product } from "../types/product";

type Props = {
  products: Product[];
  onSubmit: (data: any) => void;
};

export default function StockForm({
  products,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      productId: "",
      quantity: 1,
      movementType: "IN",
      reason: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <select
        {...register("productId")}
        className="w-full border rounded-lg p-3"
      >
        <option value="">
          Select Product
        </option>

        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.productName} ({product.sku})
          </option>
        ))}
      </select>

      <input
        type="number"
        {...register("quantity", {
          valueAsNumber: true,
        })}
        placeholder="Quantity"
        className="w-full border rounded-lg p-3"
      />

      <select
        {...register("movementType")}
        className="w-full border rounded-lg p-3"
      >
        <option value="IN">Stock In</option>
        <option value="OUT">Stock Out</option>
      </select>

      <textarea
        {...register("reason")}
        placeholder="Reason"
        className="w-full border rounded-lg p-3"
        rows={3}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg p-3"
      >
        Update Stock
      </button>
    </form>
  );
}