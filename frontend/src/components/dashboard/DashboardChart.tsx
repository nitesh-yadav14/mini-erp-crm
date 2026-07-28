import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", sales: 12 },
  { name: "Feb", sales: 19 },
  { name: "Mar", sales: 10 },
  { name: "Apr", sales: 25 },
  { name: "May", sales: 15 },
  { name: "Jun", sales: 22 },
];

export default function DashboardChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-96">
      <h2 className="font-bold text-xl mb-4">
        Monthly Challans
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="sales"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}