import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  TextField,
  Button,
  Snackbar,
  Grid,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/lib/auth";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      [theme.breakpoints.up("xs")]: {
        width: "30ch",
      },
      [theme.breakpoints.up("md")]: {
        width: "80ch",
      },
    },
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
  input: {
    display: "none",
  },
  formContainer: {
    display: "table-caption",
    margin: "10px 0 ",
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const schema = yup.object().shape({
  name: yup.string().required("Ingrese su nombre"),
  last_name: yup.string().required("Ingrese su apellido"),
  password: yup.string().required("Ingrese su contraseña"),
  password_confirmation: yup.string().required("Confirme su contraseña"),
});

const FormAffiliate = (prop) => {
  const classes = useStyles();
  const { register } = useAuth();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    password: "",
    password_confirmation: "",
    showPassword: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const newUser = {
      name: data.name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      state: "Habilitado",
      role: "ROLE_AFFILIATE",
      password: data.password,
      password_confirmation: data.password_confirmation,

      address: data.address,
    };
    console.log("socio", newUser);

    const formUserData = new FormData();
    formUserData.append("name", newUser.name);
    formUserData.append("last_name", newUser.last_name);
    formUserData.append("phone", newUser.phone);
    formUserData.append("email", newUser.email);
    formUserData.append("state", newUser.state);
    formUserData.append("role", newUser.role);
    formUserData.append("password", newUser.password);
    formUserData.append("password_confirmation", newUser.password_confirmation);

    formUserData.append("address", newUser.address);

    try {
      const userData = await register(formUserData);
      console.log("AffiliateData", userData);

      prop.handlemutate();
      handleOpenSucces();
      document.getElementById("affiliate-form").reset();
      prop.handleClose();
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          Registro Guardado exitosamente
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
      <div className={classes.formContainer}>
        <form
          id="affiliate-form"
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid item>
              <Controller
                name="name"
                control={control}
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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

              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="address-form"
                    required
                    label="Dirección"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline={true}
                    error={Boolean(errors.address)}
                  />
                )}
              />
              <span className={classes.error}>{errors.address?.message}</span>

              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email-form"
                    required
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
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl
                    className={clsx(classes.textField)}
                    variant="outlined"
                    margin="normal"
                    {...field}
                    error={Boolean(errors.password)}
                  >
                    <InputLabel htmlFor="password">Contraseña *</InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={93}
                    />
                  </FormControl>
                )}
              />
              <span className={classes.error}>{errors.password?.message}</span>

              <Controller
                name="password_confirmation"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl
                    className={clsx(classes.textField)}
                    variant="outlined"
                    margin="normal"
                    {...field}
                    error={Boolean(errors.password_confirmation)}
                  >
                    <InputLabel htmlFor="password_confirmation">
                      Confirmar Contraseña *
                    </InputLabel>
                    <OutlinedInput
                      id="password_confirmation"
                      name="password_confirmation"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password_confirmation}
                      onChange={handleChange("password_confirmation")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password_confirmation visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={93}
                    />
                  </FormControl>
                )}
              />
              <span className={classes.error}>
                {errors.password_confirmation?.message}
              </span>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6} className={classes.actionContainer}>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Guardar Registro
              </Button>
              <Button
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

export default FormAffiliate;
