import React from "react";
import Link from "next/link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "5em 40px",
    backgroundColor: theme.palette.primary.third,
  },
  space: {
    padding: "3em 0",
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    textTransform: "none",
    padding: "5px 30px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  textCarousel: {
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  textHead: {
    fontFamily: '"Raleway", sans-serif',
    fontWeight: "800",
    color: theme.palette.text.second,
  },
  textBody: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.second,
  },
}));

const Carrousel = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div>
        <Grid container className={classes.container}>
          <Grid item xs={12} md={6} className={classes.textCarousel}>
            <div className={classes.space}>
              <Typography variant="h2" className={classes.textHead}>
                Fundación Halcones por el Deporte
              </Typography>
            </div>
            <Typography variant="body1" className={classes.textBody}>
              La Fundación sin fines de lucro Halcones por el Deporte tiene por
              objetivo preservar el deporte.{" "}
            </Typography>
            <div className={classes.space}>
              <Link href="/#contact-us">
                <Button variant="contained" className={classes.button}>
                  Contactar
                </Button>
              </Link>
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
