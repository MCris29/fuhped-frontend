import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, MenuItem } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Appointments } from "@/lib/appointments";

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
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Ingrese un título de la cita")
    .max(255, "El título debe tener maximo 255 caracteres."),
  description: yup
    .string()
    .required("Ingrese una descripción")
    .max(255, "La descripción debe tener maximo 255 caracteres."),
});

const EditFormAppointment = (prop) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(prop.appointment.state);

  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);

    const NewAppointment = {
      title: data.title,
      description: data.description,
      state: state,
      date: data.date,
    };
    console.log(NewAppointment);

    try {
      const serviceData = await Appointments.update(
        prop.appointment.id,
        NewAppointment
      );
      console.log("serviceData", serviceData);
      prop.mutate();
      prop.handleOpenSucces();
      prop.handleClose();
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <>
      <div className={classes.formContainer}>
        <form
          id="appointment-form"
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="title"
            control={control}
            defaultValue={prop.appointment.title}
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
            defaultValue={prop.appointment.description}
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
          <span className={classes.error}>{errors.description?.message}</span>

          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                id="state-form"
                required
                select
                value={state}
                onChange={handleChange}
                helperText="Por favor selecciona una opción"
                label="Estado"
                variant="outlined"
                margin="normal"
                fullWidth
                error={Boolean(errors.description)}
                defaultValue={prop.appointment.state}
              >
                <MenuItem key="1" value="En espera">
                  En espera
                </MenuItem>
                <MenuItem key="2" value="Realizada">
                  Realizada
                </MenuItem>
              </TextField>
            )}
          />
          <span className={classes.error}>{errors.state?.message}</span>

          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                id="date-form"
                label="Fecha"
                variant="outlined"
                margin="normal"
                fullWidth
                type="datetime-local"
                defaultValue={prop.appointment.date}
                error={Boolean(errors.date)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <span className={classes.error}>{errors.date?.message}</span>

          <Grid container className={classes.actionContainer}>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.button}
                disabled={loading}
              >
                Guardar Cita
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

export default EditFormAppointment;
