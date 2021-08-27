import * as yup from "yup";

//バリデーションの設定
export const signupSchema = yup.object().shape({
  userName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});
