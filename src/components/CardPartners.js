import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Routes from "@/constants/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: theme.border.default,
    margin: "0 40px 20px",
  },
  button: {
    textTransform: "none",
    borderRadius: theme.border.default,
  },
}));

const CardPartners = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.partner.business}
        </Typography>
        <Typography variant="body2" component="p">
          {props.partner.description}
        </Typography>
        <Typography color="textSecondary">{props.partner.name}</Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.button}>
          <Link href={`${Routes.SERVICES}/${props.partner.id}`}>
            Ver más...
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardPartners;
