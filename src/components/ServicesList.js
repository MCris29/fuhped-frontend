import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Loading from "@/components/Loading";
import CardService from "@/components/CardService";
import ActionBar from "@/components/ActionBar";
import NewService from "@/components/NewService";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
});

const ServicesList = () => {
  const { data, error, mutate } = useSWR(`/services`, fetcher);
  const classes = useStyles();

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  const meta = <div>{data.meta.total} Servicios</div>;

  const newService = <NewService mutate={mutate} />;

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={newService} />
      <Grid container className={classes.container}>
        {data.data.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <CardService mutate={mutate} service={service} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ServicesList;
