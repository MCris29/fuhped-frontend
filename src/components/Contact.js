import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    textAlign: "center",
    padding: "9em 40px",
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
    background: theme.palette.primary.second,
    color: theme.palette.text.second,
  },
}));

const Contact = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.title}>
            <div className={classes.underline}>
              <Typography variant="h4">Contáctanos</Typography>
            </div>
          </div>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container justify="center" style={{ width: "100%" }}>
              <Grid item xs={12} className={classes.inputContainer}>
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={classes.inputContainer}>
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label="Correo"
                  variant="outlined"
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
                />
              </Grid>
              <Grid item xs={12}>
                <Button className={classes.button}>Enviar</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
