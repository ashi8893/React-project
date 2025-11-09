
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-950">
     
      <header className="md:hidden flex justify-between items-center bg-gray-900/80 backdrop-blur-md text-white px-4 py-3 shadow-md">
        <h2 className="text-xl font-[Cinzel] tracking-wide">Admin Panel</h2>
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>


      <aside
        className={`
          fixed md:fixed top-0 left-0 h-[100vh] w-64 md:flex-shrink-0 
          bg-gray-900/80 backdrop-blur-md text-white p-6 flex flex-col transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 ease-in-out z-50 rounded-r-2xl
        `}
      >
        <h2 className="text-2xl font-[Cinzel] tracking-wide mb-6 hidden md:block text-yellow-400">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-3 text-lg">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors duration-200 hover:bg-yellow-400/20 ${
                isActive ? "bg-yellow-400/30 font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors duration-200 hover:bg-yellow-400/20 ${
                isActive ? "bg-yellow-400/30 font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors duration-200 hover:bg-yellow-400/20 ${
                isActive ? "bg-yellow-400/30 font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors duration-200 hover:bg-yellow-400/20 ${
                isActive ? "bg-yellow-400/30 font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Orders
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors duration-200 hover:bg-yellow-400/20 mt-16 ${
                isActive ? "bg-yellow-400/30 font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Back To Site
          </NavLink>
        </nav>
      </aside>

     
      <main className="flex-1 p-6 md:p-8 mt-14 md:ml-50 mt-0 min-h-screen overflow-auto bg-gray-950">
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