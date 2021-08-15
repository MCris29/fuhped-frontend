import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import useSWR from "swr";
import ListCardsServices from "@/components/ListCardsServices";

const useStyles = makeStyles({
  container: {
    padding: "40px 60px",
  },
  itemContainer: {
    margin: "10px 0",
  },
});

export default function ServiceId() {
  const classes = useStyles();
  const router = useRouter();
  const { servicioId } = router.query;
  const { data, error } = useSWR(`/partners/${servicioId}`, fetcher);

  if (error) return <div>No se pudo cargar la información del artículo</div>;
  if (!data) return <Loading />;

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <div className={classes.itemContainer}>
            <Typography variant="h4">{data.business}</Typography>
          </div>
          <div className={classes.itemContainer}>
            <Typography variant="subtitle1">{data.name}</Typography>
          </div>
          <div className={classes.itemContainer}>
            <Typography variant="body1">{data.description}</Typography>
          </div>
          <div className={classes.itemContainer}>
            <Typography variant="body1">
              <strong>Dirección:</strong> {data.address}
            </Typography>
          </div>
          <div className={classes.itemContainer}>
            <Typography variant="body1">
              <strong>Teléfono:</strong> {data.phone}
            </Typography>
          </div>
          <div className={classes.itemContainer}>
            <Typography variant="body1">
              <strong>Correo:</strong> {data.email}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <ListCardsServices userid={data.user_id} />
      </Grid>
    </>
  );
}
