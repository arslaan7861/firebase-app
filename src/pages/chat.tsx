import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  Smile,
  Paperclip,
  Mic,
} from "lucide-react";
import { useMessages } from "@/providers/chats";
import { useUser } from "@/providers/user";

export default function ChatPage() {
  const contRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, loading } = useMessages();
  const { user } = useUser();

  useEffect(() => {
    if (contRef.current) {
      contRef.current.scrollTo({
        top: contRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    await sendMessage(input, user.name, user.role);
    setInput("");
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user?.name}
                </h3>
                {/* <p className="text-xs text-gray-500">
                  {isTyping ? (
                    <span className="text-blue-600 font-medium">typing...</span>
                  ) : (
                    <span>{isOnline ? "Active now" : "Away"}</span>
                  )}
                </p> */}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Phone className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Video className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Messages Area */}
      <div
        ref={contRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <AnimatePresence initial={false}>
          {loading ? (
            <p className="text-center text-gray-400">Loading messages...</p>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.uid}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className={`flex items-end gap-2 ${
                  msg.sender === user?.name ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== user?.name && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    JD
                  </div>
                )}

                <div
                  className={`flex flex-col ${
                    msg.sender === user?.name ? "items-end" : "items-start"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`px-4 py-2.5 rounded-2xl max-w-[75%] sm:max-w-md shadow-sm ${
                      msg.sender === user?.name
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </motion.div>
                </div>

                {msg.sender === user?.name && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    ME
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-t shadow-lg"
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
    </div>
  );
}
