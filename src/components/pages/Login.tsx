import React, { VFC, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";

import { auth } from "../../firebase";
import { InputFields } from "../../types/Login";
import { formStyles } from "../../styles/LoginAndSignup";
import { loginSchema } from "../../validators/Login";
import { SnackbarContext } from "../../providers/SnackbarProvider";

export const Login: VFC = () => {
  const history = useHistory();
  const classes = formStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({
    resolver: yupResolver(loginSchema),
  });

  const { setSnackState } = useContext(SnackbarContext);

  //ログイン処理
  const formSubmitHandler: SubmitHandler<InputFields> = async (
    user: InputFields
  ) => {
    try {
      await auth.signInWithEmailAndPassword(user.email, user.password);
      setSnackState({
        isOpen: true,
        type: "success",
        message: "ログインしました。",
      });
      history.push("/userList");
    } catch (error) {
      setSnackState({
        isOpen: true,
        type: "error",
        message: "ログインできませんでした",
      });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          ログイン画面
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
            ログイン
          </Button>
          <Typography>
            <Link to="/signup">新規登録はこちらから</Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
};
