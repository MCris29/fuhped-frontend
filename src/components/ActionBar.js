import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "40px",
    padding: "10px",
    borderRadius: theme.border.default,
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.second,
  },
  actionSecond: {
    display: "flex",
    justifyContent: "flex-end",
  },
  actionFirst: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "16px",
  },
}));

const ActionBar = ({ actionFirst, actionSecond }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6} className={classes.actionFirst}>
            {actionFirst}
          </Grid>
          <Grid item xs={6} className={classes.actionSecond}>
            {actionSecond}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ActionBar;
