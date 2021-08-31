import * as yup from "yup";

export const giftingWalletSchema = yup.object().shape({
  giftWallet: yup.number().positive().integer().required(),
});
