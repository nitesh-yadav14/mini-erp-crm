import type { ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
};

export default function DashboardCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">

          {icon}

        </div>

      </div>

    </div>
  );
}