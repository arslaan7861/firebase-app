import type { userType } from "@/lib/types";
import { useUser } from "@/providers/user";
import { getAllUsers } from "@/services/getUser";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

function UserList() {
  const state = useUser();
  const user = state.user!;
  const [allUsers, setAllUsers] = useState<userType[]>([]);

  useEffect(() => {
    getAllUsers().then(setAllUsers);
  }, [user]);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "employee":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "user":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (
    <>
      {" "}
      {user.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-indigo-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">
              All Users (Admin View)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {["Name", "Email", "Role", "ID", "Created"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-4 text-sm font-semibold text-gray-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <motion.tr
                    key={u.uid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {u.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {u.email}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getRoleBadgeColor(
                          u.role
                        )}`}
                      >
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{u.uid}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
      {/* Employee */}
      {user.role === "employee" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Employee Dashboard
          </h3>
          <p className="text-gray-600">
            Welcome to your employee dashboard. You have access to
            employee-specific features.
          </p>
        </motion.div>
      )}
      {/* User */}
      {user.role === "user" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            User Dashboard
          </h3>
          <p className="text-gray-600">
            Welcome! This is your personal dashboard with user-level access.
          </p>
        </motion.div>
      )}
    </>
  );
}

export default UserList;
