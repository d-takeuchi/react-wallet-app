import { makeStyles } from "@material-ui/core";

export const userListStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    marginLeft: theme.spacing(10),
  },
  buttons: {
    marginLeft: theme.spacing(3),
  },
}));
