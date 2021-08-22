import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import useSWR from "swr";
import Navigation from "@/components/Navigation";
import NavItems from "@/components/NavItems";
import NavItemsMobile from "@/components/NavItemsMobile";

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

  const navItems = <NavItems />;
  const navItemsMobile = <NavItemsMobile />;

  if (error) return <div>No se pudo cargar la información del artículo</div>;
  if (!data) return <Loading />;

  return (
    <>
      <Navigation navItems={navItems} navItemsMobile={navItemsMobile} />
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
