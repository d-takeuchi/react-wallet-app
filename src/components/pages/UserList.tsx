import React, { VFC, useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  ListItemSecondaryAction,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { auth, db } from "../../firebase";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { LoginUser } from "../../types/LoginUser";
import { userListStyles } from "../../styles/UserList";

export const UserList: VFC = () => {
  //ユーザー一覧情報のstate
  const [users, setUsers] = useState<Array<LoginUser>>([]);
  const classes = userListStyles();
  const history = useHistory();
  const { loginUser } = useContext(LoginUserContext);
  const { setSnackState } = useContext(SnackbarContext);

  useEffect(() => {
    //userがfalsyな場合（つまりログアウトしている状態）、ログイン画面に遷移
    auth.onAuthStateChanged((user) => {
      !user && history.push("/");
    });

    const unSub = db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          name: doc.data().name,
          wallet: doc.data().wallet,
        }))
      );
    });
    return () => unSub();
  }, []);

  const onClickLogout = async () => {
    try {
      await auth.signOut();
      history.push("/");
    } catch (error) {
      setSnackState({
        isOpen: true,
        message: "ログアウトに失敗しました",
        type: "error",
      });
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {loginUser?.name}さんようこそ!!
          </Typography>
          <Typography variant="h6">残高：{loginUser?.wallet}</Typography>
          <Button
            color="inherit"
            className={classes.logout}
            onClick={onClickLogout}
          >
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <h1>ユーザー一覧</h1>
        <List>
          {users.map((user, index) => (
            <ListItem key={index}>
              <ListItemText>{user.name}</ListItemText>
              <ListItemSecondaryAction>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttons}
                >
                  Walletを見る
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttons}
                >
                  送る
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};
