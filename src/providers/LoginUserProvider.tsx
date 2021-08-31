import React, {
  createContext,
  ReactNode,
  useState,
  VFC,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import firebase from "firebase/app";

import { auth, db } from "../firebase";
import { LoginUser } from "../types/LoginUser";

//ログインユーザーのcontext情報の型定義
type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const LoginUserContext = createContext({} as LoginUserContextType);

export const LoginUserProvider: VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    //firestoreにもつユーザー情報の取得
    const getUserData = async (user: firebase.User) => {
      const userDoc = await db.collection("users").doc(user.uid).get();
      const userData = userDoc.data() as LoginUser;

      return { ...userData, id: user.uid };
    };

    const unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const loginUser = await getUserData(user);
        setLoginUser(loginUser);
      }
    });
    return () => unSub();
  }, []);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
