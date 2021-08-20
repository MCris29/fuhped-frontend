import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardBlog from "@/components/CardBlog";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "40px",
  },
  cardContainer: {
    padding: "12px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    padding: "0 80px 70px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  underline: {
    width: "fit-content",
    padding: "10px 0",
    borderBottom: "solid",
    borderWidth: "medium",
    borderBottomColor: theme.palette.primary.second,
  },
}));

const Blog = () => {
  const { data, error } = useSWR(`/publications`, fetcher);
  const classes = useStyles();

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
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            className={classes.cardContainer}
          >
            <CardBlog publication={publication} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Blog;
