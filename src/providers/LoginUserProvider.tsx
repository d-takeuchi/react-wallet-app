import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  VFC,
} from "react";

type User = {
  userId: string;
  userName: string;
  wallet?: number;
};

type LoginUserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>;
};

export const LoginUserContext = createContext({} as LoginUserContextType);

export const LoginUserProvider: VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);
  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
