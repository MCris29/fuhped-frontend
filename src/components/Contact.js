import React, { useState } from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    textAlign: "center",
    padding: "5em 40px",
  },
  title: {
    padding: "0 0 70px 0",
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
    color: theme.palette.text.second,
    textTransform: "none",
    padding: "5px 30px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOnSubmit(e) {
    if (name !== "" && email !== "" && message !== "") {
      setLoading(true);
      e.preventDefault();

      const formData = {
        name,
        email,
        message,
      };

      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      document.getElementById("contact-form").reset();
      setLoading(false);
    }
  }

  return (
    <>
      <div className={classes.root} id="contact-us">
        <div className={classes.container}>
          <div className={classes.title}>
            <div className={classes.underline}>
              <Typography variant="h4">Contáctanos</Typography>
            </div>
          </div>
          <Grid container justify="center">
            <form
              id="contact-form"
              onSubmit={handleOnSubmit}
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                type="email"
                label="Comentario"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                className={classes.button}
              >
                Enviar
              </Button>
            </form>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Contact;
