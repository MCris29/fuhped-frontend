import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: '"Raleway", sans-serif',
    fontWeight: "800",
    fontSize: 25,
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Link href={Routes.HOME}>
        <div className={classes.text}>Fuhped</div>
      </Link>
    </div>
  );
};

export default Logo;
