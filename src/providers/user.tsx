import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, googleProvider } from "@/config/firebase";
import type { LoginFormData, SignupFormData } from "@/schemas/user";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import type { userType } from "@/lib/types";
import { useNavigate } from "react-router-dom";

//* Type Definitions
type UserType = userType | null;

interface UserContextType {
  user: UserType;
  loading: boolean;
  signUp: (data: SignupFormData) => Promise<void>;
  signIn: (data: LoginFormData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

//* Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

//* Provider Component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const router = useNavigate();
  //* Track Auth State (Firebase Listener)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setUser(null);
          router("/login");
          return;
        }
        // Step 2: Fetch user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) return;
        const userData: userType = userSnap.data() as userType;
        console.log(userData);

        setUser(userData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  //* Auth Functions
  const signUp = async (data: SignupFormData) => {
    const id = toast.loading("Registering...");
    try {
      // Step 1: Create user in Firebase Authentication
      const resp = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = resp.user;

      // Step 2: Add user document to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        role: "user", // default role
        createdAt: new Date().toISOString(),
      });

      console.log("User created and added to Firestore:", user.uid);
      toast.success("Account created successfully!", { id });
    } catch (err: any) {
      console.error("SignUp Error:", err);

      let errorMessage = "Something went wrong. Please try again.";

      // Firebase Auth Errors
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Try logging in.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        default:
          if (err.message) errorMessage = err.message;
      }

      // Firestore Errors (optional check)
      if (err.name === "FirebaseError" && err.code?.startsWith("firestore/")) {
        errorMessage = "Failed to save user data. Please try again later.";
      }
      toast.error(errorMessage, { id });
    }
  };

  const signIn = async (data: LoginFormData) => {
    const id = toast.loading("Registering...");
    try {
      // Step 1: Sign in using Firebase Authentication
      await signInWithEmailAndPassword(auth, data.email, data.password);

      toast.success("Account created successfully!", { id });
    } catch (err: any) {
      console.error("SignIn Error:", err);

      let errorMessage = "Something went wrong. Please try again.";

      // Handle common Firebase Auth errors
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address. Please check and try again.";
          break;
        case "auth/user-disabled":
          errorMessage = "Your account has been disabled. Contact support.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        default:
          if (err.message) errorMessage = err.message;
      }
      toast.error(errorMessage, { id });
    }
  };

  const signInWithGoogle = async () => {
    const id = toast.loading("Registering...");
    try {
      // 1️⃣ Sign in with Google
      const resp = await signInWithPopup(auth, googleProvider);
      const user = resp.user;

      // 2️⃣ Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // 3️⃣ Add new user document if not exists
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "Unnamed User",
          email: user.email,
          photoURL: user.photoURL || null,
          role: "user", // default role
          provider: "google",
          createdAt: new Date().toISOString(),
        });
        toast.success("New user created successfully!", { id });
      } else {
        toast.success("Logged in successfully!", { id });
      }
    } catch (err: any) {
      console.error("SignIn Error:", err);

      let errorMessage = "Something went wrong. Please try again.";

      // Handle common Firebase Auth errors
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address. Please check and try again.";
          break;
        case "auth/user-disabled":
          errorMessage = "Your account has been disabled. Contact support.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        default:
          if (err.message) errorMessage = err.message;
      }
      toast.error(errorMessage, { id });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  //* Provide context to children
  return (
    <UserContext.Provider
      value={{ user, loading, signUp, signIn, signInWithGoogle, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

//* Custom Hook for easy access
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
