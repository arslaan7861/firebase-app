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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMessages } from "@/providers/chats";
import { useUser } from "@/providers/user";
import Chatheader from "@/components/Chatheader";
import ChatFooter from "@/components/ChatFooter";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const contRef = useRef<HTMLDivElement | null>(null);

  const { messages, loading } = useMessages();
  const { user } = useUser();

  useEffect(() => {
    if (contRef.current) {
      contRef.current.scrollTo({
        top: contRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Chatheader />

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
            messages.map((msg, index) => {
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const nextMsg =
                index < messages.length - 1 ? messages[index + 1] : null;

              const isFirstInDateGroup =
                !prevMsg ||
                new Date(prevMsg.createdAt).toLocaleDateString() !==
                  new Date(msg.createdAt).toLocaleDateString();
              const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;

              return (
                <div className="flex flex-col" key={msg.uid}>
                  {isFirstInDateGroup && (
                    <Badge
                      variant={"secondary"}
                      className="text-center mx-auto text-muted-foreground text-sm"
                    >
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </Badge>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className={`flex items-center gap-2 ${
                      msg.sender === user?.name
                        ? "flex-row-reverse"
                        : "justify-start"
                    }`}
                  >
                    {isLastInGroup ? (
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {msg.sender[0].toUpperCase()}
                      </span>
                    ) : (
                      <div className="w-8 h-8 shrink-0" /> // Spacer to maintain alignment
                    )}
                    <Badge
                      className={cn("p-3 py-2")}
                      variant={
                        msg.sender === user?.name ? "outline" : "outline"
                      }
                    >
                      {msg.message}
                    </Badge>
                    <p className="text-muted-foreground text-xs">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
                  {isLastInGroup && (
                    <span
                      className={cn(
                        "text-muted-foreground text-xs p-1 capitalize",
                        msg.sender === user?.name && "self-end"
                      )}
                    >
                      {msg.sender !== user?.name ? msg.sender : "you"}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <ChatFooter />
    </div>
  );
}
