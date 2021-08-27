import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import App from "../App";

import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { Signup } from "../components/pages/Signup";
import { UserList } from "../components/pages/UserList";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: VFC = () => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/userList" component={UserList} />
        <Route path="*" component={Page404} />
      </LoginUserProvider>
    </Switch>
  );
};
