import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "9em 40px",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "9em 0",
    padding: "0 40px",
  },
  itemContainer: {
    background: "#F5F2F6",
  },
}));

const info = [
  {
    title: "Misión",
    description:
      "Preservar el deporte con apoyo médico, preparación de nuevos talentos desde tempranas edades hasta juveniles, así como la ayuda en la rehabilitación física y psicológica para personas de escasos recursos económicos y en beneficio de la sociedad en general.",
  },
  {
    title: "Objetivo General",
    description:
      "Colaborar con la sociedad para mejorar la calidad de vida de los deportistas y la población en general.",
  },
  {
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
      <div className={classes.container}>
        <div style={{ padding: "0 0 70px 0" }}>
          <Typography variant="h4">¿Quiénes Somos?</Typography>
        </div>
        <Typography>
          HALCONES POR EL DEPORTE es una fundación, que nace a partir de la
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
                  <Typography variant="h6" component="h2">
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
