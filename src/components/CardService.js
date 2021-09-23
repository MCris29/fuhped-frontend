import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import DeleteService from "@/components/DeleteService";
import EditService from "@/components/EditService";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.border.default,
    minWidth: 275,
    maxWidth: "30em",
    minHeight: "10em",
    maxHeight: "fit-content",
    margin: "20px",
    boxShadow: theme.shadow.default,
  },
  tittle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  description: {
    display: "-webkit-box",
    maxWidth: "auto",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
}));

const CardService = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.tittle}>
          {props.service.name}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
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
