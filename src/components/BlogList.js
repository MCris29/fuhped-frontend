import { React } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Typography,
  Grid,
} from "@material-ui/core";
import ActionBar from "@/components/ActionBar";
import NewBlog from "@/components/NewBlog";
import DeleteBlog from "@/components/DeleteBlog";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1em 40px",
  },
  cardContainer: {
    margin: "10px 40px",
  },
  card: {
    display: "flex",
    height: "12rem",
    padding: "10px",
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
}));

const BlogList = () => {
  const { data, error, mutate } = useSWR(`/publications`, fetcher);
  const classes = useStyles();
  const theme = useTheme();

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  const handleMutate = () => {
    mutate();
  };

  const meta = <div>{data.meta.total} Publicaciones</div>;

  const newBlog = <NewBlog mutate={mutate} />;

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={newBlog} />
      <Grid container>
        {data.data.map((publication, index) => (
          <Grid item xs={12} key={index} className={classes.cardContainer}>
            <Card className={classes.card}>
              <Grid container>
                <Grid item xs={12}>
                  <CardActionArea>
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
                    <DeleteBlog
                      publication={publication}
                      handleMutate={handleMutate}
                    />
                  </CardActions>
                </Grid>
              </Grid>
              <CardMedia
                className={classes.cover}
                image={publication.image}
                title={publication.title}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BlogList;
