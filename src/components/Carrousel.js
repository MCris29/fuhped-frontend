import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "5em 40px",
    backgroundColor: theme.palette.primary.third,
    minHeight: "100vh",
  },
  space: {
    padding: "3em 0",
  },
  button: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.main,
    borderRadius: theme.border.default,
    textTransform: "none",
    padding: "5px 30px",
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      transform: "scale(1.04)",
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
    [theme.breakpoints.up("md")]: {
      fontSize: 75,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 40,
    },
  },
  textBody: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.second,
  },
  imageContainerMobile: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  imageContainerDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
}));

const Carrousel = () => {
  const classes = useStyles();

  return (
    <>
      <div>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={7} className={classes.imageContainerMobile}>
            <Image
              src="/carousel_1.svg"
              alt="Donaciones"
              width={750}
              height={410}
            />
          </Grid>
          <Grid item xs={12} sm={5} className={classes.textCarousel}>
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
          <Grid item xs={12} sm={7} className={classes.imageContainerDesktop}>
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
