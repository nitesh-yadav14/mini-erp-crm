type Props = {
  challans: any[];
};

export default function RecentChallans({
  challans,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Recent Challans
      </h2>

      <div className="space-y-3">

        {challans.length === 0 ? (
          <p>No Challans</p>
        ) : (
          challans.map((challan) => (
            <div
              key={challan.id}
              className="flex justify-between"
            >
              <span>
                {challan.challanNumber}
              </span>

              <span>
                {challan.customer.customerName}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}