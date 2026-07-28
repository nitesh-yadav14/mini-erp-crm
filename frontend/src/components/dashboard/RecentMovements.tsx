type Props = {
  movements: any[];
};

export default function RecentMovements({
  movements,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Recent Stock Movements
      </h2>

      <div className="space-y-3">

        {movements.length === 0 ? (
          <p>No Stock Movements</p>
        ) : (
          movements.map((movement) => (
            <div
              key={movement.id}
              className="flex justify-between"
            >
              <span>
                {movement.product.productName}
              </span>

              <span
                className={
                  movement.movementType === "IN"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {movement.movementType}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}