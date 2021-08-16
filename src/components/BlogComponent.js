import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import CardBlog from "@/components/CardBlog";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    textAlign: "center",
    padding: "9em 40px",
  },
  cardContainer: {
    minHeight: "345px",
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
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    textTransform: "none",
    padding: "5px 30px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  carouselContainer: {
    height: "100%",
  },
}));

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const BlogComponent = () => {
  const classes = useStyles();
  const { data, error } = useSWR(`/publications`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <div>Cargando...</div>;

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
            <Grid item xs={12} className={classes.carouselContainer}>
              <Carousel responsive={responsive}>
                {data.data.map((publication, index) => (
                  <div key={index} className={classes.cardContainer}>
                    <CardBlog publication={publication} />
                  </div>
                ))}
              </Carousel>
            </Grid>
            <Grid item xs={12}>
              <Link href={Routes.BLOG}>
                <Button variant="contained" className={classes.button}>
                  Ver más..
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default BlogComponent;
