import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "sonner";
import type { ChatMessage } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";

interface MessageContextType {
  messages: ChatMessage[];
  loading: boolean;
  sendMessage: (text: string, sender: string, role: string) => Promise<void>;
}
const MessageContext = createContext<MessageContextType | undefined>(undefined);
export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { messages, messageLoading } = useSelector(
    (state: RootState) => state.message
  );
  const dispatch = useDispatch<AppDispatch>();
  //* Listen to Firestore messages (real-time)
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map(
          (doc) => ({ uid: doc.id, ...doc.data() } as ChatMessage)
        );
        dispatch({ type: "SETMESSAGES", payload: msgs });
        dispatch({ type: "SETMESSAGELOADING", payload: false });
      },
      (error) => {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages.");
        dispatch({ type: "SETMESSAGELOADING", payload: false });
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
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  //* Provide context to children
  return (
    <MessageContext.Provider
      value={{ messages, loading: messageLoading, sendMessage }}
    >
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
