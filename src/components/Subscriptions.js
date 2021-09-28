import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "5em 40px",
    textAlign: "center",
  },
  texthead: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.primary,
    fontWeight: "600",
  },
  card: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      padding: "0 40px",
    },
  },
  imageContainerDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  imageContainerMobile: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  space: {
    padding: "3em 0",
  },
  title: {
    padding: "0 0 70px 0",
    display: "flex",
    justifyContent: "center",
  },
  underline: {
    width: "fit-content",
    padding: "10px 0",
    borderBottom: "solid",
    borderWidth: "medium",
    borderBottomColor: theme.palette.secondary.main,
  },
}));

const Subscription = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>
          <div className={classes.underline}>
            <Typography variant="h4" className={classes.texthead}>
              ¿Quiéres ser Parte?
            </Typography>
          </div>
        </div>
        <div>
          <Grid container>
            <Grid item xs={12} md={6} className={classes.imageContainerMobile}>
              <Image
                src="/afiliate.svg"
                alt="Afiliado"
                width={750}
                height={250}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.card}>
              <div className={classes.space}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.texthead}
                >
                  Afiliado
                </Typography>
              </div>
              <Typography variant="body1">
                Conviertete en afiliado, obten muchos beneficios{" "}
              </Typography>
              <div className={classes.space}></div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.imageContainerDesktop}>
              <Image
                src="/afiliate.svg"
                alt="Afiliado"
                width={750}
                height={250}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.space}>
            <Grid item xs={12} md={6} className={classes.imageContainer}>
              <Image src="/partner.svg" alt="Socio" width={750} height={250} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.card}>
              <div className={classes.space}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.texthead}
                >
                  Socio
                </Typography>
              </div>
              <Typography variant="body1">
                Convierte en socio, trabajemos juntos a favor de niños y
                adolocentes deportistas{" "}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Subscription;
