import * as yup from "yup";

//ログインバリデーションの設定
export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

//サインアップバリデーションの設定
export const SignupSchema = yup.object().shape({
  userName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});
