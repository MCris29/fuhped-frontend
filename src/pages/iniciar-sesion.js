import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";

import translateMessage from "@/constants/messages";
import { useAuth } from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Fuhped
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    boxShadow: theme.shadow.default,
    color: theme.palette.text.second,
    textTransform: "none",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "-webkit-fill-available",
    paddingBotton: "20px",
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Ingrese su email")
    .email("Ingrese un email válido"),
  password: yup
    .string()
    .required("Ingrese una contraseña válida")
    .min(6, "La clave debe tener al menos 6 caracteres"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const { login } = useAuth();
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("data", data);
    setLoading(true);

    try {
      const userData = await login(data);

      if (userData.data.error) {
        console.log("error", userData.data.error);
        setError(translateMessage(userData.data.error));
      } else console.log("userData", userData);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Bienvenido
        </Typography>
        {error ? <span className={classes.error}>{error}</span> : <span></span>}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          style={{ paddingBottom: "30px" }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="email"
                autoFocus
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>

      <Copyright />
    </Container>
  );
};

export default withoutAuth(Login);
