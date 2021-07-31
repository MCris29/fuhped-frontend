import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Loading from "@/components/Loading";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/lib/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("md")]: {
      width: "30em",
    },
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    margin: "16px 8px 8px 0",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  buttonCancel: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.border.default,
    color: theme.palette.text.main,
    margin: "16px 0 8px 8px",
    textTransform: "none",
    "&:hover": {
      opacity: 0.5,
    },
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const schema = yup.object().shape({
  name: yup.string().required("Ingrese su nombre"),
  last_name: yup.string().required("Ingrese su apellido"),
});

const FormProfile = () => {
  const classes = useStyles();
  const { user, editUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userData = await editUser(data);
      console.log("userData", userData);

      handleOpenSucces();
    } catch (e) {
      console.log("error", e);
      alert("Algo salió mal, intentalo otra vez");
    }
    setLoading(false);
  };

  const handleOpenSucces = () => {
    setOpen(true);
  };

  const handleCloseSucces = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const alert = (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleCloseSucces}>
        <Alert onClose={handleCloseSucces} severity="success">
          Socio Guardado exitosamente
        </Alert>
      </Snackbar>
    </div>
  );

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
      {alert}
      {user ? (
        <form
          id="user-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="body2">Datos de usuario</Typography>
              <Controller
                name="name"
                control={control}
                defaultValue={user.name}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="name-form"
                    required
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
                name="last_name"
                control={control}
                defaultValue={user.last_name}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="last-name-form"
                    required
                    label="Apellido"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.last_name)}
                  />
                )}
              />
              <span className={classes.error}>{errors.last_name?.message}</span>

              <Controller
                name="phone"
                control={control}
                defaultValue={user.phone}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="phone-form"
                    required
                    label="Teléfono"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.phone)}
                  />
                )}
              />
              <span className={classes.error}>{errors.phone?.message}</span>

              <TextField
                id="email-form"
                disabled
                label="Correo"
                variant="outlined"
                margin="normal"
                defaultValue={user.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} className={classes.actionContainer}>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FormProfile;