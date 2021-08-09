import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Blogs } from "@/lib/blogs";
import clsx from "clsx";

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
  buttonSuccess: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.second,
    textTransform: "none",
    "&:hover": {
      opacity: theme.opacity.buttonHover,
      color: theme.palette.text.main,
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
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));

const schema = yup.object().shape({
  title: yup.string().required("Ingrese un título"),
  description: yup.string().required("Ingrese una descripción"),
  image: yup.string().required("Ingrese una imagen"),
});

const FormBlog = (prop) => {
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataBlog) => {
    setLoading(true);

    const newBlog = {
      title: dataBlog.title,
      description: dataBlog.description,
      image: image,
    };

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("description", newBlog.description);
    formData.append("image", newBlog.image);

    try {
      const blogData = await Blogs.create(formData);
      prop.handleMutate();
      prop.handleOpenSucces();
      prop.handleClose();

      document.getElementById("blog-form").reset();
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleImage = (imageFile) => {
    setImage(imageFile);
    setSuccess(true);
    console.log("image", imageFile);
  };

  return (
    <>
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
                  <div>
                    <Button
                      variant="contained"
                      fullWidth
                      component="span"
                      className={buttonClassname}
                    >
                      {success ? (
                        <CheckCircleOutlineIcon style={{ display: "flex" }} />
                      ) : (
                        <span>Subir imagen</span>
                      )}
                    </Button>
                  </div>
                </label>
              </div>
            )}
          />
          <span className={classes.error}>{errors.image?.message}</span>
          <Grid container className={classes.actionContainer}>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.button}
                disabled={loading}
              >
                Guardar Publicación
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                className={classes.buttonCancel}
                onClick={prop.handleClose}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default FormBlog;
