import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, CardMedia } from "@material-ui/core";
import Navigation from "@/components/Navigation";
import NavItems from "@/components/NavItems";
import NavItemsMobile from "@/components/NavItemsMobile";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "40px 60px",
  },
  itemContainer: {
    margin: "10px 0",
  },
  description: {
    paddingLeft: "20px",
  },
  image: {
    borderRadius: theme.border.image,
  },
}));

const BlogDetails = ({ blog }) => {
  const classes = useStyles();

  const navItems = <NavItems />;
  const navItemsMobile = <NavItemsMobile />;

  if (!blog) return "No se pudo cargar la información";

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
      <Navigation navItems={navItems} navItemsMobile={navItemsMobile} />
      {blog ? (
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.itemContainer}>
            <Typography variant="h4">{blog.title}</Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.itemContainer}>
            <CardMedia
              component="img"
              className={classes.image}
              image={handlePath(blog.image)}
              title={blog.title}
              onError={handleImage}
              title={blog.title}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.itemContainer}>
            <Typography variant="body1" className={classes.description}>
              {blog.description}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <div>No se pudo cargar la información información</div>
      )}
    </>
  );
};

export async function getStaticProps(context) {
  const { blogId } = context.params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/publications/${blogId}`
  );
  const data = await response.json();

  console.log("blog", data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: data,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/publications`
  );
  const data = await response.json();

  const blogs = data.data;

  const paths = blogs.map((blog) => {
    return { params: { blogId: "" + blog.id } };
  });

  return { paths, fallback: true };
}

export default BlogDetails;
