import React, { useContext, memo, VFC } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { giftingWalletSchema } from "../../validators/GiftingWallet";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { db } from "../../firebase";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { InputFields } from "../../types/GiftingWallet";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  wallet: number;
};

export const GiftingWalletDialog: VFC<Props> = memo((props) => {
  const { isOpen, onClose, id, wallet } = props;

  const { loginUser, setLoginUser } = useContext(LoginUserContext);

  const handleClose = () => {
    onClose();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<InputFields>({
    resolver: yupResolver(giftingWalletSchema),
  });

  const { setSnackState } = useContext(SnackbarContext);

  const giftingWallet: SubmitHandler<InputFields> = async (
    data: InputFields
  ) => {
    const { giftWallet } = data;

    try {
      //送る金額に対してウォレットが不足していた場合はエラー
      if (loginUser!.wallet < giftWallet) {
        throw new Error("ウォレットが不足しています。");
      }

      //ウォレットの送付対象ユーザー
      const targetUserWallet = wallet;

      //送付対象ユーザーのウォレット情報を更新
      await db
        .collection("users")
        .doc(id)
        .set({ wallet: targetUserWallet + giftWallet }, { merge: true });

      //ログインユーザーのウォレット情報を更新
      const loginUserWallet = loginUser!.wallet - giftWallet;

      await db
        .collection("users")
        .doc(loginUser!.id)
        .set({ wallet: loginUserWallet }, { merge: true });

      setLoginUser({ ...loginUser!, wallet: loginUserWallet });

      setSnackState({
        isOpen: true,
        message: "ウォレットを送りました",
        type: "success",
      });
    } catch (error) {
      setSnackState({
        isOpen: true,
        message: `${error.message}`,
        type: "error",
      });
    } finally {
      reset();
    }
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="simple-dialog-title">
        あなたの残高：{loginUser?.wallet}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>送る金額</DialogContentText>
        <form onSubmit={handleSubmit(giftingWallet)}>
          <Controller
            name="giftWallet"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.giftWallet}
                helperText={errors.giftWallet ? errors.giftWallet.message : ""}
                fullWidth
              />
            )}
          />
          <DialogActions>
            <Button color="primary" variant="outlined" type="submit">
              送信
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
});
