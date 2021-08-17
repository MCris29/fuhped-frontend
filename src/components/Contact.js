import React, { useState } from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    textAlign: "center",
    padding: "0 40px 9em ",
  },
  inputContainer: {
    textAlign: "center",
    margin: "9px 0",
    padding: "0 40px",
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
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "29em",
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

  return (
    <>
      <div className={classes.root} id="contact-us">
        <div className={classes.container}>
          <div className={classes.title}>
            <div className={classes.underline}>
              <Typography variant="h4">Contáctanos</Typography>
            </div>
          </div>
          <form
            id="contact-form"
            onSubmit={handleOnSubmit}
            className={classes.form}
            noValidate
            autoComplete="off"
          >
            <Grid container justify="center" style={{ width: "100%" }}>
              <Grid item xs={12} className={classes.inputContainer}>
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} className={classes.inputContainer}>
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label="Correo"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} className={classes.inputContainer}>
                <TextField
                  className={classes.input}
                  id="outlined-multiline-static"
                  label="Comentario"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={(e) => setMessage(e.target.value)}
                />
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
        </div>
      </div>
    </>
  );
};

export default Contact;
