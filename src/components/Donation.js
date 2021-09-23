import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import PaypalButton from "@/components/PaypalButton";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "9em 40px",
  },
  itemContainer: {
    background: theme.palette.primary.main,
    color: theme.palette.text.second,
    width: "100%",
  },
  texthead: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.second,
    fontWeight: "600",
  },
  space: {
    padding: "3em 0",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "10px 0",
    padding: "7px 25px",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.default,
    width: "19em",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  image: {
    display: "flex",
    alignItems: "center",
  },
}));

const Donation = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.itemContainer} id="donation">
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} md={6} className={classes.image}>
            <Image
              src="/donation.svg"
              alt="Donaciones"
              width={750}
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.space}>
              <Typography variant="h4" className={classes.texthead}>
                Donaciones
              </Typography>
            </div>
            <PaypalButton />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Donation;
