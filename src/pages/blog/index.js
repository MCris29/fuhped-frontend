import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1em 40px",
  },
  cardContainer: {
    padding: "12px",
  },
  root: {
    display: "flex",
    height: "12rem",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    [theme.breakpoints.up("xs")]: {
      minWidth: "251px",
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: "150px",
    },
  },
  description: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  title: {
    padding: "0 0 70px 0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  underline: {
    width: "fit-content",
    padding: "10px 0",
    borderBottom: "solid",
    borderWidth: "medium",
    borderBottomColor: theme.palette.primary.second,
  },
}));

const Publications = () => {
  const { data, error } = useSWR(`/publications`, fetcher);
  const classes = useStyles();
  const theme = useTheme();

  if (error) return <div>No se pudo cargar la información del usuario</div>;
  if (!data) return <div>Cargando...</div>;

  return (
    <>
      <Grid container className={classes.container}>
        <div className={classes.title}>
          <div className={classes.underline}>
            <Typography variant="h4">Conoce nuestras historias</Typography>
          </div>
        </div>
        {data.data.map((publication, index) => (
          <Grid item xs={12} key={index} className={classes.cardContainer}>
            <Card className={classes.root}>
              <CardActionArea>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {publication.title}
                    </Typography>
                  </CardContent>
                  <div className={classes.description}>
                    <p>{publication.description}</p>
                  </div>
                </div>
              </CardActionArea>
              <CardMedia
                className={classes.cover}
                image={publication.image}
                title={publication.title}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Publications;
