import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  VFC,
} from "react";

type SnackState = {
  isOpen: boolean;
  type: "success" | "error" | "warning" | "info";
  message: string;
};

type SnackbarContextType = {
  snackState: SnackState;
  setSnackState: Dispatch<SetStateAction<SnackState>>;
};

export const SnackbarContext = createContext({} as SnackbarContextType);

export const SnackbarProvider: VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackState, setSnackState] = useState<SnackState>({
    isOpen: false,
    type: "info",
    message: "",
  });

  return (
    <SnackbarContext.Provider value={{ snackState, setSnackState }}>
      {children}
    </SnackbarContext.Provider>
  );
};
