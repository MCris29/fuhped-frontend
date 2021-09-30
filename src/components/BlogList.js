import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Typography,
  Grid,
  Modal,
  Backdrop,
  Fade,
  Button,
} from "@material-ui/core";
import ActionBar from "@/components/ActionBar";
import NewBlog from "@/components/NewBlog";
import DeleteBlog from "@/components/DeleteBlog";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    height: "12rem",
    padding: "10px",
    margin: "10px",
    boxShadow: theme.shadow.default,
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    borderRadius: theme.border.image,
    [theme.breakpoints.up("xs")]: {
      minWidth: "150px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "250px",
    },
  },
  title: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    [theme.breakpoints.up("xs")]: {
      width: "230px",
    },
    [theme.breakpoints.up("md")]: {
      width: "20em",
    },
  },
  description: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    [theme.breakpoints.up("xs")]: {
      width: "230px",
    },
    [theme.breakpoints.up("md")]: {
      width: "530px",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: theme.border.default,
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  itemContainer: {
    margin: "10px 0",
  },
  image: {
    borderRadius: theme.border.image,
  },
  descriptionModal: {
    paddingLeft: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonCancel: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.border.default,
    color: theme.palette.text.main,
    margin: "16px 0 8px 0",
    textTransform: "none",
    "&:hover": {
      opacity: 0.5,
    },
  },
}));

const BlogList = () => {
  const classes = useStyles();
  const { data, error, mutate } = useSWR(`/publications`, fetcher);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  const meta = <div>{data.meta.total} Publicaciones</div>;

  const newBlog = <NewBlog mutate={mutate} />;

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

  const handleOpen = (publication) => {
    setOpen(true);
    setTitle(publication.title);
    setDescription(publication.description);
    setImage(publication.image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={newBlog} />
      <Grid container>
        {data.data.map((publication, index) => (
          <Grid item xs={12} key={index}>
            <Card className={classes.card}>
              <Grid container>
                <Grid item xs={12}>
                  <CardActionArea onClick={() => handleOpen(publication)}>
                    <CardContent className={classes.content}>
                      <Typography
                        className={classes.title}
                        component="h5"
                        variant="h5"
                      >
                        {publication.title}
                      </Typography>
                      <Typography
                        className={classes.description}
                        variant="body2"
                      >
                        {publication.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12}>
                  <CardActions>
                    <DeleteBlog publication={publication} mutate={mutate} />
                  </CardActions>
                </Grid>
              </Grid>
              <CardMedia
                component="img"
                className={classes.cover}
                image={handlePath(publication.image)}
                title={publication.title}
                onError={handleImage}
              />
            </Card>
          </Grid>
        ))}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Typography id="transition-modal-title" variant="h6">
                Vista Previa
              </Typography>
              <div id="transition-modal-description">
                <Grid container>
                  <Grid item xs={12} className={classes.itemContainer}>
                    <Typography variant="h4">{title}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.itemContainer}>
                    <CardMedia
                      component="img"
                      className={classes.image}
                      image={handlePath(image)}
                      title={title}
                      onError={handleImage}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.itemContainer}>
                    <Typography
                      variant="body1"
                      className={classes.descriptionModal}
                    >
                      {description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.buttonContainer}>
                    <Button
                      className={classes.buttonCancel}
                      onClick={handleClose}
                    >
                      Cerrar
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Fade>
        </Modal>
      </Grid>
    </>
  );
};

export default BlogList;
