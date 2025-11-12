import type { userType } from "@/lib/types";

// Define action types
export const SETUSER = "SETUSER";
export const SETUSERLOADING = "SETUSERLOADING";

// Define action interfaces
export interface setUserActionType {
  type: typeof SETUSER;
  payload: userType | null;
}

export interface setUserLoadingActionType {
  type: typeof SETUSERLOADING;
  payload: boolean;
}

// Combine them
export type UserAction = setUserLoadingActionType | setUserActionType;

// Define state type
export interface UserState {
  user: userType | null;
  userLoading: boolean;
}
