type Props = {
  headers: string[];
  children: React.ReactNode;
};

export default function DataTable({
  headers,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            {headers.map((header) => (

              <th
                key={header}
                className="text-left px-6 py-4 text-gray-700 font-semibold"
              >
                {header}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>
  );
}