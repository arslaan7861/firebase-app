export interface userType {
  name: string;
  email: string;
  createdAt: Date;
  role: "admin" | "employee" | "user";
  uid: string;
}
