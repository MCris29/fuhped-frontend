import { React, useState } from "react";
import Modal from "@/components/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Blogs } from "@/lib/blogs";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      [theme.breakpoints.up("xs")]: {
        width: "30ch",
      },
      [theme.breakpoints.up("md")]: {
        width: "50ch",
      },
    },
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    margin: "16px 0 8px 0",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
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
  formContainer: {
    display: "table-caption",
  },
  error: {
    color: theme.palette.error.main,
  },
  input: {
    display: "none",
  },
}));

const schema = yup.object().shape({
  title: yup.string().required("Ingrese un título"),
  description: yup.string().required("Ingrese una descripción"),
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NewBlog = (prop) => {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataBlog) => {
    console.log("blog", dataBlog);

    const newBlog = {
      title: dataBlog.title,
      description: dataBlog.description,
      image: image,
    };
    console.log("Nuevo blog", newBlog);

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("description", newBlog.description);
    formData.append("image", newBlog.image);

    console.log("formData", formData);

    try {
      const blogData = await Blogs.create(formData);
      prop.handleMutate();
      document.getElementById("blog-form").reset();
      console.log("blogData", blogData);
      handleClick();
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleImage = (imageFile) => {
    setImage(imageFile);
    console.log("image", imageFile);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const alert = (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Publicado exitosamente!
        </Alert>
      </Snackbar>
    </div>
  );

  const form = (
    <div className={classes.formContainer}>
      <form
        id="blog-form"
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="title-form"
              required
              label="Título"
              variant="outlined"
              margin="normal"
              fullWidth
              error={Boolean(errors.title)}
            />
          )}
        />
        <span className={classes.error}>{errors.title?.message}</span>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="description-form"
              required
              label="Descripción"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline={true}
              error={Boolean(errors.description)}
            />
          )}
        />
        <span className={classes.error}>{errors.description?.message}</span>
        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <input
                type="file"
                name="image"
                {...field}
                className={classes.input}
                id="contained-button-file"
                onChange={(e) => handleImage(e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.buttonCancel}
                  component="span"
                >
                  Subir Imagen
                </Button>
              </label>
            </div>
          )}
        />
        <span className={classes.error}>{errors.image?.message}</span>
        <div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={classes.button}
          >
            Guardar Publicación
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {alert}
      <Modal
        message={false}
        nameButton={"Nueva Publicación"}
        styleButton={true}
        title={"Añadir Publicación"}
        description={form}
        buttonCancel={false}
      />
    </>
  );
};

export default NewBlog;
