import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "@/components/Loading";
import CardService from "@/components/CardService";
import ActionBar from "@/components/ActionBar";
import NewService from "@/components/NewService";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      padding: "0 40px",
    },
  },
}));

const ServicesList = () => {
  const classes = useStyles();
  const { data, error, mutate } = useSWR(`/user/services`, fetcher);

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
