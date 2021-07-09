import React from "react";
import Modal from "@/components/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Blogs } from "@/lib/blogs";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "25ch",
    },
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  buttonCancel: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.border.default,
    color: theme.palette.text.main,
    textTransform: "none",
    "&:hover": {
      opacity: 0.5,
    },
  },
  formContainer: {
    display: "table-caption",
  },
  actionContainer: {
    paddingTop: "20px",
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const schema = yup.object().shape({
  title: yup.string().required("Ingrese un título"),
  description: yup.string().required("Ingrese una descripción"),
});

const NewBlog = () => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataBlog) => {
    console.log("blog", dataBlog);

    try {
      const blogData = await Blogs.create(dataBlog);
      mutate();
      document.getElementById("title-form").reset();
      console.log("blogData", blogData);
    } catch (e) {
      console.log("error", e);
    }
  };

  const form = (
    <div className={classes.formContainer}>
      <form
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
              error={Boolean(errors.description)}
            />
          )}
        />
        <span className={classes.error}>{errors.description?.message}</span>
        <Grid container className={classes.actionContainer}>
          <Grid item xs={5}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className={classes.button}
            >
              Añadir
            </Button>
          </Grid>
          <Grid item xs={2}>
            <div></div>
          </Grid>
          <Grid item xs={5}>
            <Button fullWidth className={classes.buttonCancel}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <>
      <Modal
        nameButton={"Nuevo"}
        title={"Añadir Publicación"}
        description={form}
      />
    </>
  );
};

export default NewBlog;
