import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@/providers/user";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { Input } from "./ui/input";
import { useMessages } from "@/providers/chats";

export default function ChatFooter() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const { messages, sendMessage, loading } = useMessages();
  const { user } = useUser();
  const handleSend = async () => {
    if (!input.trim() || !user) return;

    await sendMessage(input, user.name, user.role);
    setInput("");
    inputRef.current?.focus();
  };
  if (user?.role == "user")
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-none bg-white border-t shadow-lg text-muted-foreground flex items-center justify-center py-4"
      >
        Only admins and employee can send the message
      </motion.div>
    );
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex-none bg-white border-t shadow-lg"
    >
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 shrink-0"
          >
            <Smile className="h-5 w-5 text-gray-500" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 shrink-0"
          >
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>

          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="pr-10 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full"
            />
          </div>

          {input.trim() ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 shrink-0"
            >
              <Mic className="h-5 w-5 text-gray-500" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
