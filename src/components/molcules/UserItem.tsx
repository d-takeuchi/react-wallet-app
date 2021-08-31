import React, { memo, useState, VFC } from "react";
import {
  Button,
  ListItemSecondaryAction,
  ListItemText,
  ListItem,
} from "@material-ui/core";

import { UserWalletDialog } from "./UserWalletDialog";
import { userListStyles } from "../../styles/UserList";
import { GiftingWalletDialog } from "./GiftingWalletDialog";

type Props = {
  id: string;
  name: string;
  wallet: number;
};

export const UserItem: VFC<Props> = memo(({ id, name, wallet }) => {
  //ウォレット送信用ダイアログのstate
  const [isOpenGiftingWalletDialog, setIsOpenGiftingWalletDialog] =
    useState(false);

  //ウォレット確認ダイアログのstate
  const [isOpenWalletDialog, setIsOpenWalletDialog] = useState(false);
  const classes = userListStyles();

  return (
    <ListItem>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setIsOpenWalletDialog(true);
          }}
          className={classes.buttons}
        >
          Walletを見る
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.buttons}
          onClick={() => {
            setIsOpenGiftingWalletDialog(true);
          }}
        >
          送る
        </Button>
        <UserWalletDialog
          isOpen={isOpenWalletDialog}
          onClose={() => {
            setIsOpenWalletDialog(false);
          }}
          userName={name}
          wallet={wallet}
        />
        <GiftingWalletDialog
          isOpen={isOpenGiftingWalletDialog}
          onClose={() => {
            setIsOpenGiftingWalletDialog(false);
          }}
          id={id}
          wallet={wallet}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
});
