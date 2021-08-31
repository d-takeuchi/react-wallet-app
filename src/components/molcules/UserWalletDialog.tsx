import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export const UserWalletDialog = (props: any) => {
  const { open, onClose, userName, wallet } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{userName}さんの残高</DialogTitle>
      <DialogContent>
        <DialogContentText>{wallet}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
