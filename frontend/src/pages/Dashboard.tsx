import { useEffect, useState } from "react";
import {
  Users,
  Package,
  Boxes,
  AlertTriangle,
} from "lucide-react";

import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardChart from "../components/dashboard/DashboardChart";
import LowStockCard from "../components/dashboard/LowStockCard";
import RecentChallans from "../components/dashboard/RecentChallans";
import RecentMovements from "../components/dashboard/RecentMovements";

import { getDashboard } from "../services/dashboard.service";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboard();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to your ERP System
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <DashboardCard
          title="Customers"
          value={stats?.stats?.totalCustomers ?? 0}
          icon={<Users size={28} />}
        />

        <DashboardCard
          title="Products"
          value={stats?.stats?.totalProducts ?? 0}
          icon={<Package size={28} />}
        />

        <DashboardCard
          title="Challans"
          value={stats?.stats?.totalChallans ?? 0}
          icon={<Boxes size={28} />}
        />

        <DashboardCard
          title="Low Stock"
          value={stats?.stats?.lowStockCount ?? 0}
          icon={<AlertTriangle size={28} />}
        />

      </div>

      {/* Chart */}

      <DashboardChart />

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-6">

        <LowStockCard
          products={stats?.lowStockProducts ?? []}
        />

        <RecentChallans
          challans={stats?.recentChallans ?? []}
        />

      </div>

      <RecentMovements
        movements={stats?.recentMovements ?? []}
      />

    </div>
  );
}