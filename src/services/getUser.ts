import { db } from "@/config/firebase";
import type { userType } from "@/lib/types";
import { collection, getDocs } from "firebase/firestore";

export const getAllUsers = async (): Promise<userType[]> => {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    const users: userType[] = snapshot.docs.map((doc) => ({
      ...(doc.data() as userType),
      uid: doc.id,
    }));

    return users;
  } catch (err: any) {
    console.error("Error fetching users:", err);
    return [];
  }
};
