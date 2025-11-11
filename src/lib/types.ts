export interface userType {
  name: string;
  email: string;
  createdAt: Date;
  role: "admin" | "employee" | "user";
  uid: string;
}

export interface ChatMessage {
  createdAt: Date;
  message: string;
  role: "admin" | "user" | "super admin";
  sender: string;
  uid: string;
}
