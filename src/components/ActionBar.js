import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 40px",
    padding: "10px",
    borderRadius: theme.border.default,
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.second,
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
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
