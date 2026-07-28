type Props = {
  products: any[];
};

export default function LowStockCard({
  products,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Low Stock Products
      </h2>

      <div className="space-y-3">

        {products.length === 0 ? (
          <p>No low stock products 🎉</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between"
            >
              <span>
                {product.productName}
              </span>

              <span className="text-red-600 font-semibold">
                {product.currentStock}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}