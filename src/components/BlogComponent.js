import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const post = [
  {
    title: "Noticia 1",
    description: "Descripción",
  },
  {
    title: "Noticia 2",
    description: "Descripción",
  },
  {
    title: "Noticia 3",
    description: "Descripción",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    textAlign: "center",
    padding: "9em 40px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "3em 0",
    padding: "0 40px",
  },
  card: {
    width: "100%",
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
}));

const BlogComponent = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.title}>
            <div className={classes.underline}>
              <Typography variant="h4">Nuestro Blog</Typography>
            </div>
          </div>
          <Grid container justify="center">
            {post.map((value, index) => (
              <Grid
                item
                key={index}
                xs={12}
                md={4}
                className={classes.cardContainer}
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia component="img" height="140" />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Ver más...
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default BlogComponent;
