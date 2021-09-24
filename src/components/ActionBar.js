import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px 24px",
    borderRadius: theme.border.default,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.main,
  },
  actionSecond: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 0",
    },
  },
  actionFirst: {
    display: "flex",
    alignItems: "center",
  },
}));

const ActionBar = ({ actionFirst, actionSecond }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={3} className={classes.actionFirst}>
            {actionFirst}
          </Grid>
          <Grid item xs={12} sm={9} className={classes.actionSecond}>
            {actionSecond}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ActionBar;
