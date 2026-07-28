import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  FileText,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { removeToken } from "../utils/token";

export default function Sidebar() {
  const logout = () => {
    removeToken();
    window.location.href = "/";
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Boxes,
    },
    {
      name: "Challans",
      path: "/challans",
      icon: FileText,
    },
  ];

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="px-6 py-8 border-b border-slate-700">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-xl font-bold shadow-lg">

            ERP

          </div>

          <div>

            <h1 className="text-xl font-bold">
              Mini ERP CRM
            </h1>

            <p className="text-sm text-slate-400">
              Business Management
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                    : "hover:bg-slate-700 hover:translate-x-1"
                }`
              }
            >
              <Icon
                size={20}
                className="group-hover:scale-110 transition-transform"
              />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-700 p-4">

        <div className="bg-slate-800 rounded-xl p-4 mb-4">

          <p className="text-sm text-slate-400">
            Logged in as
          </p>

          <h3 className="font-semibold mt-1">
            Administrator
          </h3>

          <div className="flex items-center gap-2 mt-2">

            <div className="w-2 h-2 rounded-full bg-green-500"></div>

            <span className="text-xs text-green-400">
              Online
            </span>

          </div>

        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-xl py-3 font-semibold shadow-lg"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}