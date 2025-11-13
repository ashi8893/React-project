import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-950">
 
      <header className="md:hidden flex justify-between items-center bg-fuchsia-900/80 backdrop-blur-md text-white px-4 py-3 shadow-md">
        <h2 className="text-xl font-[Cinzel] tracking-wide">Admin Panel</h2>

        <button
          onClick={() => navigate("/")}
          className="bg-fuchsia-400 text-black px-3 py-1 rounded-lg text-sm mr-3"
        >
          User Page
        </button>

        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ✅ Sidebar */}
      <aside
        className={`
          fixed md:fixed top-0 left-0 h-[100vh] w-50 md:flex-shrink-0 
          bg-fuchsia-900/70 backdrop-blur-xl border-r border-fuchsia-700/40
          text-white p-6 flex flex-col justify-between transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 ease-in-out z-50 rounded-r-2xl shadow-lg
        `}
      >
        {/* Top Section - Navigation */}
        <div>
          <h2 className="text-2xl font-[Cinzel] tracking-wide mb-6 hidden md:block text-fuchsia-300">
            Admin Panel
          </h2>

          {/* ✅ Navigation Including Dashboard at top */}
          <nav className="flex flex-col gap-3 text-lg">
            <NavLink
              to="/admin"
              end // This ensures exact matching for the dashboard
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-all duration-200 hover:bg-fuchsia-400/20 ${
                  isActive
                    ? "bg-fuchsia-500/30 font-semibold border-l-4 border-fuchsia-400"
                    : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-all duration-200 hover:bg-fuchsia-400/20 ${
                  isActive
                    ? "bg-fuchsia-500/30 font-semibold border-l-4 border-fuchsia-400"
                    : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-all duration-200 hover:bg-fuchsia-400/20 ${
                  isActive
                    ? "bg-fuchsia-500/30 font-semibold border-l-4 border-fuchsia-400"
                    : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Users
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-all duration-200 hover:bg-fuchsia-400/20 ${
                  isActive
                    ? "bg-fuchsia-500/30 font-semibold border-l-4 border-fuchsia-400"
                    : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Orders
            </NavLink>
          </nav>
        </div>

        {/* ✅ Bottom Section - Go to User Page Button */}
        <div className="mt-10 border-t border-fuchsia-700/40 pt-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 rounded-lg bg-fuchsia-400 text-black font-semibold hover:bg-fuchsia-300 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 md:p-8 mt-14 md:mt-0 min-h-screen overflow-auto bg-gray-950 text-white">
        <Outlet />
      </main>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
