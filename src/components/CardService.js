import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import DeleteService from "@/components/DeleteService";
import EditService from "@/components/EditService";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: theme.border.default,
    margin: "0 40px 20px",
    maxWidth: "30em",
    minHeight: "20em",
  },
}));

const CardService = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.service.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.service.description}
        </Typography>
        <Typography color="textSecondary">
          Precio Normal: {props.service.price}
        </Typography>
        <Typography color="textSecondary">
          Precio Fuhped: {props.service.price_fuhped}
        </Typography>
      </CardContent>
      <CardActions>
        <EditService mutate={props.mutate} service={props.service} />
        <DeleteService mutate={props.mutate} service={props.service} />
      </CardActions>
    </Card>
  );
};

export default CardService;
