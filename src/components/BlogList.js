import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@/components/Modal";
import NewBlog from "@/components/NewBlog";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1em 40px",
  },
  cardContainer: {
    padding: "12px",
  },
  card: {
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
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: "10px",
    color: theme.palette.text.second,
    padding: "6px 18px",
  },
}));

const BlogList = () => {
  const { data, error } = useSWR(`/publications`, fetcher);
  const classes = useStyles();
  const theme = useTheme();

  if (error) return <div>No se pudo cargar la información del usuario</div>;
  if (!data) return <div>Cargando...</div>;

  return (
    <>
      <Grid container>
        <div className={classes.buttonContainer}>
          <NewBlog />
        </div>
        {data.data.map((publication, index) => (
          <Grid item xs={12} key={index} className={classes.cardContainer}>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardActionArea>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {publication.title}
                    </Typography>
                  </CardContent>
                  <div className={classes.description}>
                    <p>{publication.description}</p>
                  </div>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Editar
                  </Button>
                  <Button size="small" color="primary">
                    Eliminar
                  </Button>
                </CardActions>
              </div>
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

export default BlogList;
