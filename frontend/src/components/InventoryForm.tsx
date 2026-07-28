import { useForm } from "react-hook-form";

type Props = {
  movementType: "IN" | "OUT";
  product: any;
  onSubmit: (data: any) => void;
};

export default function InventoryForm({
  movementType,
  product,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      quantity: 1,
      reason: "",
    },
  });

  function submit(data: any) {
    onSubmit(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-4"
    >
      <div>
        <label className="font-medium">
          Product
        </label>

        <input
          value={product.productName}
          disabled
          className="w-full border rounded-lg p-3 bg-gray-100"
        />
      </div>

      <div>
        <label className="font-medium">
          Current Stock
        </label>

        <input
          value={product.currentStock}
          disabled
          className="w-full border rounded-lg p-3 bg-gray-100"
        />
      </div>

      <div>
        <label className="font-medium">
          Quantity
        </label>

        <input
          type="number"
          {...register("quantity", {
            required: true,
            min: 1,
          })}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="font-medium">
          Reason
        </label>

        <textarea
          {...register("reason")}
          className="w-full border rounded-lg p-3"
          rows={3}
        />
      </div>

      <button
        className={`w-full text-white rounded-lg p-3 ${
          movementType === "IN"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {movementType === "IN"
          ? "Stock In"
          : "Stock Out"}
      </button>
    </form>
  );
}