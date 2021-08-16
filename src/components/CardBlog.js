import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Routes from "@/constants/routes";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: "0 30px",
    borderRadius: "10px",
  },
  media: {
    height: 140,
  },
}));

const CardBlog = (props) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <Link href={`${Routes.BLOG}/${props.publication.id}`}>
            <div>
              <CardMedia
                component="img"
                height="140"
                className={classes.media}
                image={props.publication.image}
                title={props.publication.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.publication.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.publication.description}
                </Typography>
              </CardContent>
            </div>
          </Link>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardBlog;
