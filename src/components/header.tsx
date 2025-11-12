import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import LogoutButton from "./buttons/LogoutButton";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Header() {
  const router = useNavigate();
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 sticky top-0 z-10 backdrop-blur-sm shadow-lg border-b border-gray-200"
    >
      <div className=" px-4 sm:px-6 lg:px-8 py-4">
        <div
          className="flex items-center"
          onClick={() => router("/", { replace: true })}
        >
          <Button variant="ghost" size="icon" className="">
            <ArrowLeft className="h-8 w-8" />
          </Button>
          <div className="flex items-center">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 ">
              Enrope Solutions
            </h1>
          </div>
          <LogoutButton className="ml-auto" />
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
