import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "5em 40px",
  },
  space: {
    padding: "3em 0",
  },
  button: {
    padding: "7px 25px",
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.second,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const Carrousel = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div>
        <Grid container className={classes.container}>
          <Grid item xs={12} md={6}>
            <div className={classes.space}>
              <Typography variant="h2">
                Fundación Halcones por el Deporte
              </Typography>
            </div>
            <Typography variant="body1">
              La Fundación sin fines de lucro, Halcones por el Deporte, tiene
              por objetivo, preservar el deporte.{" "}
            </Typography>
            <div className={classes.space}>
              <Button variant="contained" className={classes.button}>
                Contactar
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image
              src="/carousel_1.svg"
              alt="Donaciones"
              width={750}
              height={410}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Carrousel;
