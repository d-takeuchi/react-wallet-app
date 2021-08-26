import React, { VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";

const App: VFC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
