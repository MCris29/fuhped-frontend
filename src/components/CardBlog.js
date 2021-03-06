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

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: "0 40px",
    borderRadius: "10px",
    boxShadow: theme.shadow.default,
  },
  media: {
    height: "auto",
  },
  altImage: {
    height: "auto",
    boxSizing: "border-box",
    content: "url(/image_alt.jpg)",
    overflow: "hidden",
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

const CardBlog = (props) => {
  const classes = useStyles();

  const handleImage = (ev) => {
    //Cambia a una imagen alterna si no la encuentra
    ev.target.src = "/image_alt.jpg";
  };

  const handlePath = (path) => {
    var value = path;
    const newPath = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${value.replace(
      "public/",
      ""
    )}`;
    return newPath;
  };

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <Link href={`/blog/${props.publication.id}`}>
            <div>
              <CardMedia
                component="img"
                height="40"
                className={classes.media}
                image={handlePath(props.publication.image)}
                alt="Not Found"
                onError={handleImage}
                title={props.publication.title}
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.tittle}
                >
                  {props.publication.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.description}
                >
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
