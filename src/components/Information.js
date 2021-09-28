import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  texthead: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.primary,
    fontWeight: "600",
  },
  textBody: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.primary,
  },
  container: {
    textAlign: "center",
    padding: "9em 40px",
  },
  itemContainer: {
    width: "100%",
  },
  card: {
    background: "#F5F2F6",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: "2em 0",
    padding: "40px",
    border: "5px solid",
    borderColor: theme.palette.background.default,
    borderRadius: theme.border.default,
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
    borderBottomColor: theme.palette.primary.second,
  },
  image: {
    padding: "20px",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const info = [
  {
    icon: "/rocket.svg",
    title: "Misión",
    description:
      "Preservar el deporte con apoyo médico, preparación de nuevos talentos desde tempranas edades hasta juveniles, así como la ayuda en la rehabilitación física y psicológica para personas de escasos recursos económicos y en beneficio de la sociedad en general.",
  },
  {
    icon: "/winner.svg",
    title: "Objetivo General",
    description:
      "Colaborar con la sociedad para mejorar la calidad de vida de los deportistas y la población en general.",
  },
  {
    icon: "/target.svg",
    title: "Objetivo Específico",
    description:
      "Brindar apoyo y ayuda a los deportistas en parte médica ( rehabilitación física) y preparación de nuevos talentos, dentro de las diferentes disciplinas deportivas.",
  },
];

const Information = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.container} id="about-us">
        <div className={classes.title}>
          <div className={classes.underline}>
            <Typography variant="h4" className={classes.texthead}>
              ¿Quiénes Somos?
            </Typography>
          </div>
        </div>
        <Typography>
          Halcones por el deporte es una fundación, que nace a partir de la
          necesidad del Club deportivo HALCONES por ayudar a los deportistas
          basquetbolistas a sobrellevar lesiones de diverso tipo, que impidan su
          desempeño deportivo, por motivos socioeconómicos que retrasan su
          reincorporación al equipo como a sus actividades cotidianas, por lo
          cual, en conversaciones con el entrenador del equipo de basquetball y
          sus jugadores/as se forjó la idea de conformar una fundación que ayude
          a solucionar este tipo de problemáticas deportivas tanto a los
          jugadores, sus familias, como a la sociedad en general.{" "}
        </Typography>
      </div>

      <div className={classes.itemContainer}>
        <Grid container justify="center">
          {info.map((value, index) => (
            <Grid key={index} item xs={12} md={4} className={classes.card}>
              <Grid container>
                <Grid item xs={12}>
                  <div className={classes.image}>
                    <Image
                      src={value.icon}
                      alt="image"
                      width={750}
                      height={350}
                    />
                  </div>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ marginTop: "20px" }}
                    className={classes.texthead}
                  >
                    {value.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{value.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Information;
