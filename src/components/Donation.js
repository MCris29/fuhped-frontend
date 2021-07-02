import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import { Block } from "@material-ui/icons";

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
}));

const Donation = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.itemContainer}>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} md={6}>
            <Image
              src="/donation.svg"
              alt="Donaciones"
              width={750}
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.space}>
              <Typography variant="h4">Realiza tu Donación</Typography>
            </div>
            <Typography variant="body1"> </Typography>
            <Grid container className={classes.space}>
              <Grid item xs={12}>
                <Button variant="contained" className={classes.button}>
                  Paypal
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" className={classes.button}>
                  Transferencia
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Donation;
