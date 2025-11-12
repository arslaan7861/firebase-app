import { motion } from "framer-motion";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { useUser } from "@/providers/user";
import { Link } from "react-router-dom";

function Chatheader() {
  const { user } = useUser();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex-none bg-white border-b shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 capitalize">
                {user?.name}
              </h3>
              <span className="text-muted-foreground text-xs capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant={"outline"} asChild>
            <Link to={"/details"}>Group details</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 hidden md:flex"
          >
            <Phone className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 hidden md:flex"
          >
            <Video className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 hidden md:flex"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

export default Chatheader;
