"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebase_app from "../../../firebase";

export const auth = getAuth(firebase_app);

type Props = {
  children?: ReactNode;
};

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null)
        localStorage.removeItem("email");
        localStorage.removeItem("displayName");
        localStorage.removeItem("imageURL");
      }
    });

    return () => unsubscribe();
  }, [user, setUser]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
