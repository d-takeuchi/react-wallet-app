import React, { VFC, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";

import { auth, db } from "../../firebase";
import { formStyles } from "../../styles/LoginAndSignup";
import { signupSchema } from "../../validators/Signup";
import { InputFields } from "../../types/Signup";
import { SnackbarContext } from "../../providers/SnackbarProvider";

export const Signup: VFC = () => {
  const classes = formStyles();
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({
    resolver: yupResolver(signupSchema),
  });

  const { setSnackState } = useContext(SnackbarContext);

  //fireStoreへのユーザー新規登録処理
  const formSubmitHandler: SubmitHandler<InputFields> = async (
    newUser: InputFields
  ) => {
    try {
      //まずは、Authenticationにユーザー登録
      const result = await auth.createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      );

      //Authenticationに登録されたユーザーのUID（ユーザーID）を取得
      const createdUser = result.user;
      if (createdUser) {
        const createdUserId = createdUser.uid;

        //FirestoreにuidをドキュメントIDとして持ったユーザーを登録
        await db
          .collection("users")
          .doc(createdUserId)
          .set({ name: newUser.userName, wallet: 0 });

        setSnackState({
          isOpen: true,
          type: "success",
          message: "ユーザー作成に成功しました。",
        });
        history.push("/");
      }
    } catch (error) {
      setSnackState({
        isOpen: true,
        type: "error",
        message: "ユーザー作成に失敗しました。",
      });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          新規登録画面
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ユーザー名"
                    variant="outlined"
                    error={!!errors.userName}
                    helperText={errors.userName ? errors.userName.message : ""}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="メールアドレス"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="パスワード"
                    variant="outlined"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            新規登録
          </Button>
          <Typography>
            <Link to="/">ログインはこちらから</Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
};
