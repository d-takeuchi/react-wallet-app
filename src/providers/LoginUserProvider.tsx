import React, {
  createContext,
  ReactNode,
  useState,
  VFC,
  useEffect,
} from "react";
import firebase from "firebase/app";

import { auth, db } from "../firebase";

type LoginUserContextType = {
  loginUser: LoginUser | null;
};

type LoginUser = {
  userName: string;
  wallet: number;
};

export const LoginUserContext = createContext({} as LoginUserContextType);

export const LoginUserProvider: VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const getUserData = async (user: firebase.User | null) => {
      if (!user) return null;

      const userDoc = await db.collection("users").doc(user.uid).get();
      const userData = userDoc.data() as LoginUser;
      return userData;
    };

    const unSub = auth.onAuthStateChanged(async (user) => {
      const loginUser = await getUserData(user);
      setLoginUser(loginUser);
    });
    return unSub;
  }, []);

  return (
    <LoginUserContext.Provider value={{ loginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
