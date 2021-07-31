import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import CardPartners from "@/components/CardPartners";

const useStyles = makeStyles({
  container: {
    marginTop: "40px",
  },
});

const servicios = () => {
  const { data, error, mutate } = useSWR(`/partners`, fetcher);
  const classes = useStyles();

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  return (
    <>
      <Grid container className={classes.container}>
        {data.data.map((partner, index) => (
          <Grid item xs={4} key={index}>
            <CardPartners partner={partner} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default servicios;
