import { React, useState } from "react";
import api from "@/lib/api";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Button,
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import translateMessage from "@/constants/messages";
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
    boxShadow: theme.shadow.default,
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
    boxShadow: theme.shadow.default,
    color: theme.palette.text.main,
    margin: "16px 0 8px 0",
    textTransform: "none",
    "&:hover": {
      opacity: 0.5,
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
  current_password: yup
    .string()
    .required("Por favor ingrese su contraseña actual")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  password: yup
    .string()
    .required("Por favor ingrese su nueva contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  password_confirmation: yup
    .string()
    .required("Por favor confirme su contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

const FormUpdatePassword = (prop) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
    showPassword: false,
  });
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");

  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("Password", data);
    setLoading(true);

    try {
      setErrorCurrentPassword("");
      setErrorPassword("");
      const passwordData = await api.put("/reset_password", data);
      console.log("paswordData", passwordData);

      prop.handleOpenSucces();
      prop.handleClose();
    } catch (error) {
      console.log("error", error.response.data.errors);
      if (error.response.data.errors !== undefined) {
        if (error.response.data.errors.current_password !== undefined) {
          console.log("error c_p", error.response.data.errors);
          setErrorCurrentPassword(
            translateMessage(error.response.data.errors.current_password[0])
          );
        }
        if (error.response.data.errors.password !== undefined) {
          console.log("error p", error.response.data.errors);
          setErrorPassword(
            translateMessage(error.response.data.errors.password[0])
          );
        }
      }
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      <div className={classes.formContainer}>
        <form
          id="password-form"
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="current_password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl
                className={clsx(classes.textField)}
                variant="outlined"
                margin="normal"
                {...field}
                error={
                  Boolean(errors.current_password) ||
                  Boolean(errorCurrentPassword)
                }
              >
                <InputLabel htmlFor="current_password">Contraseña Actual*</InputLabel>
                <OutlinedInput
                  id="current_password"
                  name="current_password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.current_password}
                  onChange={handleChange("current_password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle current_password visibility"
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
                  labelWidth={145}
                />
              </FormControl>
            )}
          />
          <span className={classes.error}>
            {errors.current_password?.message}
          </span>
          {errorCurrentPassword ? (
            <span className={classes.error}> {errorCurrentPassword}</span>
          ) : (
            <span></span>
          )}

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
                fullWidth
                {...field}
                error={Boolean(errors.password)}
              >
                <InputLabel htmlFor="password"> Nueva Contraseña *</InputLabel>
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
                  labelWidth={145}
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
                fullWidth
                {...field}
                error={
                  Boolean(errors.password_confirmation) ||
                  Boolean(errorPassword)
                }
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
                  labelWidth={170}
                />
              </FormControl>
            )}
          />
          <span className={classes.error}>
            {errors.password_confirmation?.message}{" "}
          </span>
          {errorPassword ? (
            <span className={classes.error}>{errorPassword}</span>
          ) : (
            <span></span>
          )}

          <Grid container className={classes.actionContainer}>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.button}
                disabled={loading}
              >
                Cambiar contraseña
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

export default FormUpdatePassword;
