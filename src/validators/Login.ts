import * as yup from "yup";

//ログインバリデーションの設定
export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
});
