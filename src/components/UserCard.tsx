import { motion } from "framer-motion";
import { useUser } from "@/providers/user";
import { Calendar, Shield, User } from "lucide-react";
function UserCard() {
  const { user } = useUser();

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
  if (!user) return <></>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6 ">
        <div className="flex items-center flex-col md:flex-row ">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="sm:ml-6 text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">
              {user.name}
            </h2>
            <p className="text-gray-600 flex text-sm md:text-base items-center">
              <span className="mr-2">✉️</span>
              {user.email}
            </p>
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-bold border-2 shadow-sm ${getRoleBadgeColor(
            user.role
          )}`}
        >
          {user.role.toUpperCase()}
        </span>
      </div>

      {/* 3 Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          {
            label: "Role",
            value: user.role,
            icon: <Shield className="w-5 h-5 text-blue-700" />,
            color: "from-blue-50 to-indigo-50 border-blue-100",
          },
          {
            label: "User ID",
            value: user.uid,
            icon: <User className="w-5 h-5 text-purple-700" />,
            color: "from-purple-50 to-pink-50 border-purple-100",
          },
          {
            label: "Member Since",
            value: user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "—",
            icon: <Calendar className="w-5 h-5 text-green-700" />,
            color: "from-green-50 to-emerald-50 border-green-100",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className={`bg-gradient-to-br ${item.color} rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 truncate">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default UserCard;
