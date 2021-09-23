import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Routes from "@/constants/routes";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: theme.border.default,
    boxShadow: theme.shadow.default,
    margin: "0 40px 20px",
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

const CardPartners = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link href={`${Routes.SERVICES}/${props.partner.id}`}>
          <div>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={classes.tittle}
              >
                {props.partner.business}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.description}
              >
                {props.partner.description}
              </Typography>
              <Typography color="textSecondary">
                {props.partner.name}
              </Typography>
            </CardContent>
          </div>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default CardPartners;
