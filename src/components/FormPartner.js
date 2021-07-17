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
import { Partners } from "@/lib/partners";
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
  business: yup.string().required("Ingrese el nombre de su negocio"),
  description: yup.string().required("Ingrese una descripción"),
});

const FormPartner = (prop) => {
  const classes = useStyles();
  const { register } = useAuth();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("socio", data);

    const newPartner = {
      business: data.business,
      description: data.description,
      address: data.address,
      state: "Habilitado",
    };

    const newUser = {
      name: data.name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };

    const formPartnerData = new FormData();
    formPartnerData.append("business", newPartner.business);
    formPartnerData.append("description", newPartner.description);
    formPartnerData.append("address", newPartner.address);
    formPartnerData.append("state", newPartner.state);

    console.log("formData negocio", formPartnerData);

    const formUserData = new FormData();
    formUserData.append("name", newUser.name);
    formUserData.append("last_name", newUser.last_name);
    formUserData.append("phone", newUser.phone);
    formUserData.append("email", newUser.email);
    formUserData.append("password", newUser.password);

    console.log("formData usuario", formUserData);

    try {
      const PartnerData = await Partners.create(formPartnerData);
      // const userData = await register(formUserData);
      console.log("PartnerData", PartnerData);
      // console.log("PartnerData", userData);

      prop.handlemutate();
      handleOpenSucces();
      document.getElementById("partner-form").reset();
    } catch (e) {
      console.log("error", e);
    }
    prop.handleClose();
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
      <div className={classes.formContainer}>
        <form
          id="partner-form"
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid item xs={12} md={5}>
              <Typography variant="body2">Datos de usuario</Typography>
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
                    error={Boolean(errors.nombre)}
                  />
                )}
              />
              <span className={classes.error}>{errors.business?.message}</span>

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
                rules={{ required: true, email: true }}
                render={({ field }) => (
                  <FormControl
                    className={clsx(classes.textField)}
                    variant="outlined"
                    margin="normal"
                    {...field}
                    error={Boolean(errors.email)}
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
            </Grid>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="body2">Datos de negocio</Typography>
              <Controller
                name="business"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="business-form"
                    required
                    label="Negocio"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.title)}
                  />
                )}
              />
              <span className={classes.error}>{errors.business?.message}</span>

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
              <span className={classes.error}>
                {errors.description?.message}
              </span>

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
                Guardar Socio
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

export default FormPartner;
