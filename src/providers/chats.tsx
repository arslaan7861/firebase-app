import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "sonner";
import type { ChatMessage } from "@/lib/types";

//* Type Definitions
interface MessageContextType {
  messages: ChatMessage[];
  loading: boolean;
  sendMessage: (text: string, sender: string, role: string) => Promise<void>;
}

//* Create Context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

//* Provider Component
export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  //* Listen to Firestore messages (real-time)
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map(
          (doc) => ({ uid: doc.id, ...doc.data() } as ChatMessage)
        );
        setMessages(msgs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  //* Function to send message
  const sendMessage = async (
    text: string,
    sender: string,
    role: string
  ): Promise<void> => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, "messages"), {
        message: text,
        sender,
        role,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  //* Provide context to children
  return (
    <MessageContext.Provider value={{ messages, loading, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

//* Custom Hook for easy access
export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};
