import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: theme.border.default,
    margin: "0 60px 20px",
    boxShadow: theme.shadow.default,
  },
  button: {
    textTransform: "none",
    borderRadius: theme.border.default,
  },
  text: {
    padding: "4px",
  },
}));

const ListCardsServices = (props) => {
  const classes = useStyles();
  const { data, error } = useSWR(`/users/${props.userid}/services`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  return (
    <Grid container>
      {data.data.map((service, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.text}>
                {service.name}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.text}
              >
                {service.description}
              </Typography>
              <Typography color="textSecondary">
                Precio Normal: ${service.price}
              </Typography>
              <Typography color="textSecondary">
                Precio Fuhped: ${service.price_fuhped}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListCardsServices;
