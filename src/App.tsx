import { List } from "@material-ui/core";
import React, { VFC, useEffect } from "react";
import { useState } from "react";
import { Header } from "./components/organisms/Header";
import { auth, db } from "./firebase";

type User = {
  userId: string;
  userName: string;
  wallet?: number;
};

const App: VFC = (props: any) => {
  const { history } = props;
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && history.push("/login");
    });
    return () => unSub();
  });

  useEffect(() => {
    const unSub = db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          userId: doc.data().userId,
          userName: doc.data().userName,
          wallet: doc.data().wallet,
        }))
      );
    });
    return () => unSub();
  }, []);

  return (
    <div>
      <Header />
      <h1>ユーザー一覧</h1>
      <List>
        {users.map((user) => (
          <p>{user.userName}</p>
        ))}
      </List>
    </div>
  );
};

export default App;
