import { useState } from "react";
import type { Customer } from "../types/customer";
import type { Product } from "../types/product";

type Props = {
  customers: Customer[];
  products: Product[];
  onSubmit: (data: any) => void;
};

export default function ChallanForm({
  customers,
  products,
  onSubmit,
}: Props) {
  const [customerId, setCustomerId] =
    useState("");

  const [status, setStatus] = useState<
    "DRAFT" | "CONFIRMED"
  >("DRAFT");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
    },
  ]);

  function addItem() {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
      },
    ]);
  }

  function updateItem(
    index: number,
    field: string,
    value: any
  ) {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      customerId,
      status,
      items,
    });
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4"
    >
      <select
        value={customerId}
        onChange={(e) =>
          setCustomerId(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      >
        <option value="">
          Select Customer
        </option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.customerName}
          </option>
        ))}
      </select>

      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-3"
        >
          <select
            value={item.productId}
            onChange={(e) =>
              updateItem(
                index,
                "productId",
                e.target.value
              )
            }
            className="border rounded-lg p-3"
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.productName}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) =>
              updateItem(
                index,
                "quantity",
                Number(e.target.value)
              )
            }
            className="border rounded-lg p-3"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="bg-gray-200 px-4 py-2 rounded-lg"
      >
        + Add Product
      </button>

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as
              | "DRAFT"
              | "CONFIRMED"
          )
        }
        className="w-full border rounded-lg p-3"
      >
        <option value="DRAFT">
          Draft
        </option>

        <option value="CONFIRMED">
          Confirmed
        </option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg p-3"
      >
        Create Challan
      </button>
    </form>
  );
}