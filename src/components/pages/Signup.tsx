import React, { VFC } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import { FormStyle } from "../../styles/Form";
import { SignupSchema } from "../../validators/LoginAndSignup";

//入力フィールドの型定義
type InputFields = {
  userName: string;
  email: string;
  password: string;
};

export const Signup: VFC = (props: any) => {
  const { history } = props;
  const classes = FormStyle();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({
    resolver: yupResolver(SignupSchema),
  });

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

      //Authenticationに登録されたユーザーのユーザーUIDを取得
      const createdUser = result.user;
      if (createdUser) {
        const createdUserId = createdUser.uid;
        //Firestoreに↑で取得したuidを持ったユーザー情報を登録
        await db.collection("users").add({ ...newUser, userId: createdUserId });
        history.push("/login");
      }
    } catch (error) {
      alert(error.message);
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
            <Link to="/login">ログインはこちらから</Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
};
