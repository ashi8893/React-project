import { motion } from "framer-motion";
import { useAdmin } from "./context/AdminContext";
import { Shield, UserCog, UserX } from "lucide-react";

export default function AdminUsers() {
  const { users , orders ,setUsers} = useAdmin();
console.log(orders);


const handleRoleChange = (id, newRole) => {
  setUsers(prev =>
    prev.map(user =>
      user.id === id ? { ...user, role: newRole } : user
    )
  );
};


  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 flex justify-center ml-14">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-8 w-full max-w-6xl shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden"
      >
        <h2 className="text-3xl sm:text-4xl text-center font-[Cinzel] tracking-[0.25em] text-slate-100 mb-8 sm:mb-10">
          Manage Users
        </h2>

        {users.length === 0 ? (
          <p className="text-center text-slate-400">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-gray-800 text-slate-300 uppercase tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4 text-left">Name</th>
                  <th className="p-3 sm:p-4 text-left">Email</th>
                  <th className="p-3 sm:p-4 text-center">Status</th>
                  <th className="p-3 sm:p-4 text-center">Role</th>
                  <th className="p-3 sm:p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition-all duration-200"
                  >
                    <td className="p-3 sm:p-4 text-slate-100 whitespace-nowrap">
                      {u.username}
                    </td>
                    <td className="p-3 sm:p-4 text-slate-400 whitespace-nowrap">
                      {u.email}
                    </td>

                     
                    <td className="p-3 sm:p-4 text-center">
                      <select
                        className="bg-gray-800 text-slate-200 px-2 sm:px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
                        defaultValue="active"
                      >
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </td>

                    
                    <td className="p-3 sm:p-4 text-center">
                      <select
                       value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-gray-800 text-slate-200 px-2 sm:px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
                       
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    
                    <td className="p-3 sm:p-4 flex items-center justify-center gap-3 sm:gap-4">
                      <button className="text-blue-400 hover:text-blue-300 transition">
                        <UserCog size={18} />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300 transition">
                        <Shield size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-400 transition">
                        <UserX size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}