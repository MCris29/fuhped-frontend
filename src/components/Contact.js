import React, { useState } from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Contacts } from "@/lib/contact";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    textAlign: "center",
    padding: "5em 40px",
  },
  texthead: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.primary,
    fontWeight: "600",
  },
  title: {
    padding: "0 0 30px 0",
    display: "flex",
    justifyContent: "center",
  },
  underline: {
    width: "fit-content",
    padding: "10px 0",
    borderBottom: "solid",
    borderWidth: "medium",
    borderBottomColor: theme.palette.primary.second,
  },
  form: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "40%",
    },
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    boxShadow: theme.shadow.default,
    color: theme.palette.text.second,
    textTransform: "none",
    padding: "3px 30px",
    marginTop: "30px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Ingrese su nombre")
    .max(100, "Su nombre debe tener maximo 100 caracteres.")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
      "El nombre solo debe contener letras"
    ),
  email: yup
    .string()
    .email("Ingrese un email válido.")
    .required("Ingrese su email")
    .max(100, "El email debe tener maximo 100 caracteres."),
  comment: yup
    .string()
    .required("Ingrese su comentario")
    .max(255, "El comentario debe tener maximo 255 caracteres."),
});

const Contact = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataContact) => {
    console.log("dataBlog", dataContact);
    setLoading(true);

    const newData = {
      name: dataContact.name,
      email: dataContact.email,
      comment: dataContact.comment,
    };

    const formData = new FormData();
    formData.append("name", newData.name);
    formData.append("email", newData.email);
    formData.append("comment", newData.comment);

    try {
      const contactData = await Contacts.send(formData);
      reset({
        name: "",
        email: "",
        comment: "",
      });

    } catch (e) {
      console.log("error", e);
    }

    setLoading(false);
  };

  return (
    <>
      <div className={classes.root} id="contact-us">
        <div className={classes.container}>
          <div className={classes.title}>
            <div className={classes.underline}>
              <Typography variant="h4" className={classes.texthead}>
                Contáctanos
              </Typography>
            </div>
          </div>
          <Grid container justify="center">
            <form
              id="contact-form"
              onSubmit={handleSubmit(onSubmit)}
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <Grid container>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.name)}
                      />
                    )}
                  />
                  <span className={classes.error}>{errors.name?.message}</span>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="email"
                        type="email"
                        label="Correo"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.email)}
                      />
                    )}
                  />
                  <span className={classes.error}>{errors.email?.message}</span>
                  <Controller
                    name="comment"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="comment"
                        label="Comentario"
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={Boolean(errors.comment)}
                      />
                    )}
                  />
                  <span className={classes.error}>
                    {errors.comment?.message}
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    className={classes.button}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Contact;
