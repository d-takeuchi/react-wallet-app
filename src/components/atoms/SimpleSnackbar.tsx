import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

import { SnackbarContext } from "../../providers/SnackbarProvider";

export const SimpleSnackbar = () => {
  const { snackState, setSnackState } = useContext(SnackbarContext); //これで呼び出す

  const handleClose = () => {
    setSnackState({
      isOpen: false,
      type: "success",
      message: "",
    });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={snackState.isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackState.type}>
        {snackState.message}
      </Alert>
    </Snackbar>
  );
};
