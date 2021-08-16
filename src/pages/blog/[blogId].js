import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import useSWR from "swr";

const useStyles = makeStyles({
  container: {
    padding: "40px 60px",
  },
  itemContainer: {
    margin: "10px 0",
  },
});

export default function blogId() {
  const classes = useStyles();
  const router = useRouter();
  const { blogId } = router.query;
  const { data, error } = useSWR(`/publications/${blogId}`, fetcher);

  if (error) return <div>No se pudo cargar la información del artículo</div>;
  if (!data) return <Loading />;

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.itemContainer}>
          <Typography variant="h4">{data.title}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.itemContainer}></Grid>
        <Grid item xs={12} md={6} className={classes.itemContainer}>
          <Typography variant="body1">{data.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
