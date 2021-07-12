import { React, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NewBlog from "@/components/NewBlog";
import DeleteBlog from "@/components/DeleteBlog";
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
    padding: "10px",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    borderRadius: theme.border.image,
    [theme.breakpoints.up("xs")]: {
      minWidth: "150px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "250px",
    },
  },
  title: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    [theme.breakpoints.up("xs")]: {
      width: "230px",
    },
    [theme.breakpoints.up("md")]: {
      width: "20em",
    },
  },
  description: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    [theme.breakpoints.up("xs")]: {
      width: "230px",
    },
    [theme.breakpoints.up("md")]: {
      width: "530px",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.second,
    },
  },
  buttonCancel: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.border.default,
    color: theme.palette.text.main,
    textTransform: "none",
    "&:hover": {
      opacity: 0.5,
    },
  },
}));

const BlogList = () => {
  const { data, error, mutate } = useSWR(`/publications`, fetcher);
  const classes = useStyles();
  const theme = useTheme();

  if (error) return <div>No se pudo cargar la información del usuario</div>;
  if (!data) return <div>Cargando...</div>;

  const handleMutate = () => {
    mutate();
  };

  return (
    <>
      <Grid container>
        <div className={classes.buttonContainer}>
          <NewBlog handleMutate={handleMutate} />
        </div>
        {data.data.map((publication, index) => (
          <Grid item xs={12} key={index} className={classes.cardContainer}>
            <Card className={classes.card}>
              <Grid container>
                <Grid item xs={12}>
                  <CardActionArea>
                    <CardContent className={classes.content}>
                      <Typography
                        className={classes.title}
                        component="h5"
                        variant="h5"
                      >
                        {publication.title}
                      </Typography>
                      <Typography
                        className={classes.description}
                        variant="body2"
                      >
                        {publication.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12}>
                  <CardActions>
                    <DeleteBlog
                      id={publication.id}
                      handleMutate={handleMutate}
                    />
                  </CardActions>
                </Grid>
              </Grid>
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
