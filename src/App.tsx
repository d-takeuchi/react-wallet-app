// import { List } from "@material-ui/core";
import React, { VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
// import { useState } from "react";
// import { Header } from "./components/organisms/Header";
// import { auth, db } from "./firebase";

// type User = {
//   userId: string;
//   userName: string;
//   wallet?: number;
// };

const App: VFC = (props: any) => {
  // const { history } = props;
  // const [users, setUsers] = useState<Array<User>>([]);

  // useEffect(() => {
  //   const unSub = db.collection("users").onSnapshot((snapshot) => {
  //     setUsers(
  //       snapshot.docs.map((doc) => ({
  //         userId: doc.data().userId,
  //         userName: doc.data().userName,
  //         wallet: doc.data().wallet,
  //       }))
  //     );
  //   });
  //   return () => unSub();
  // }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
