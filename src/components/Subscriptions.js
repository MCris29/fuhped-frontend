import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "9em 40px",
    textAlign: "center",
  },
  card: {
    textAlign: "center",
    padding: "0 40px",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  space: {
    padding: "3em 0",
  },
  button: {
    padding: "7px 25px",
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.second,
    color: theme.palette.text.second,
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
  const theme = useTheme();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>
          <div className={classes.underline}>
            <Typography variant="h4">¿Quiéres ser Parte?</Typography>
          </div>
        </div>
        <div>
          <Grid container>
            <Grid item xs={12} md={6} className={classes.card}>
              <div className={classes.space}>
                <Typography variant="h4">Afiliado</Typography>
              </div>
              <Typography variant="body1">
                Conviertete en afiliado, obten muchos beneficios{" "}
              </Typography>
              <div className={classes.space}>
                <Button variant="contained" className={classes.button}>
                  Ver más...
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.imageContainer}>
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
                <Typography variant="h4">Socio</Typography>
              </div>
              <Typography variant="body1">
                Convierte en socio, trabajemos juntos a favor de niños y
                adolocentes deportistas{" "}
              </Typography>
              <div className={classes.space}>
                <Button variant="contained" className={classes.button}>
                  Ver más...
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Subscription;
