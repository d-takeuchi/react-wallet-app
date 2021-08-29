import React, { VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { SimpleSnackbar } from "./components/atoms/SimpleSnackbar";
import { LoginUserProvider } from "./providers/LoginUserProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { Router } from "./router/Router";

const App: VFC = () => {
  return (
    <BrowserRouter>
      <LoginUserProvider>
        <SnackbarProvider>
          <SimpleSnackbar />
          <Router />
        </SnackbarProvider>
      </LoginUserProvider>
    </BrowserRouter>
  );
};

export default App;
