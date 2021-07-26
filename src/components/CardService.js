import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import theme from "src/pages/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: theme.border.default,
    margin: "0 20px 20px",
    maxWidth: "30em",
    minHeight: "20em",
  },
  title: {
    fontSize: 14,
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
        <Button size="small">Agendar cita</Button>
      </CardActions>
    </Card>
  );
};

export default CardService;
