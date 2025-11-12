import type { ChatMessage } from "@/lib/types";

// Define action types
export const SETMESSAGES = "SETMESSAGES";
export const SETMESSAGELOADING = "SETMESSAGELOADING";

// Define action interfaces
export interface setMessageActionType {
  type: typeof SETMESSAGES;
  payload: ChatMessage[];
}

export interface setMessageLoadingActionType {
  type: typeof SETMESSAGELOADING;
  payload: boolean;
}

// Combine them
export type MessageAction = setMessageLoadingActionType | setMessageActionType;

// Define state type
export interface MessageStateType {
  messages: ChatMessage[];
  messageLoading: boolean;
}
