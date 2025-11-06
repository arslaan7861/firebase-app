import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import LogoutButton from "./buttons/LogoutButton";

function Header() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 sticky top-0 z-10 backdrop-blur-sm shadow-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <LogoutButton />{" "}
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
