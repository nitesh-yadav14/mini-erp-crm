import {
  Bell,
  Search,
  Settings,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm h-20 px-8 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-8">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Mini ERP CRM
          </h1>

          <p className="text-sm text-gray-500">
            Inventory & CRM Management
          </p>

        </div>

        {/* Search */}

        <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-3 w-96">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            placeholder="Search anything..."
            className="bg-transparent outline-none ml-3 w-full"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Notification */}

        <button className="relative bg-slate-100 hover:bg-slate-200 transition p-3 rounded-xl">

          <Bell size={20} />

          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

            3

          </span>

        </button>

        {/* Settings */}

        <button className="bg-slate-100 hover:bg-slate-200 transition p-3 rounded-xl">

          <Settings size={20} />

        </button>

        {/* User */}

        <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-3 py-2">

          <div>

            <h2 className="font-semibold">
              Administrator
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-500"></div>

              <p className="text-xs text-gray-500">
                Online
              </p>

            </div>

          </div>

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow">

            A

          </div>

        </div>

      </div>

    </header>
  );
}