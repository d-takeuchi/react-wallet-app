import React, { VFC, memo } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  wallet: number;
};

export const UserWalletDialog: VFC<Props> = memo((props) => {
  const { isOpen, onClose, userName, wallet } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="simple-dialog-title">{userName}さんの残高</DialogTitle>
      <DialogContent>
        <DialogContentText>{wallet}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
});
