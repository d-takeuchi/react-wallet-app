import React, { memo, useState, VFC } from "react";
import {
  Button,
  ListItemSecondaryAction,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { UserWalletDialog } from "./UserWalletDialog";

import { userListStyles } from "../../styles/UserList";

type Props = {
  id: string;
  name: string;
  wallet: number;
};

export const UserItem: VFC<Props> = memo(({ id, name, wallet }) => {
  const [open, setOpen] = useState(false);
  const classes = userListStyles();

  return (
    <ListItem>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
          className={classes.buttons}
        >
          Walletを見る
        </Button>
        <Button color="primary" variant="contained" className={classes.buttons}>
          送る
        </Button>
        <UserWalletDialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          userName={name}
          wallet={wallet}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
});
