import React, { VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { Signup } from "../components/pages/Signup";
import { UserList } from "../components/pages/UserList";

export const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/userList">
        <UserList />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};
