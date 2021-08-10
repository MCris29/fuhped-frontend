import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, MenuItem } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Appointments } from "@/lib/appointments";
import { Notifications } from "@/lib/notifications";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

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
  title: yup.string().required("Ingrese un título de la cita"),
  description: yup.string().required("Ingrese una descripción"),
  date: yup.string().required("Escoge la fecha y hora"),
});

const FormAppointment = (prop) => {
  const [loading, setLoading] = useState(false);
  const [afiliate, setAfiliate] = useState("");

  const { data, error } = useSWR(`/afiliates`, fetcher);

  if (error) {
    console.log("error", error);
  }
  if (!data) {
    console.log("cargando...");
  }

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
      date: data.date,
      afiliate_id: afiliate,
      state: "En espera",
    };

    try {
      const dataAppointment = await Appointments.create(NewAppointment);
      // console.log("dataAppointment", dataAppointment);

      const NewNotification = {
        title: dataAppointment.data.partner + " te asignó una cita con fecha " + data.date,
        receiver_id: afiliate,
      };

      sendNotification(NewNotification);
      prop.handleMutate();
      prop.handleOpenSucces();
      prop.handleClose();

      document.getElementById("appointment-form").reset();
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
  };

  const sendNotification = async (data) => {
    try {
      await Notifications.create(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleChange = (event) => {
    setAfiliate(event.target.value);
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
            defaultValue=""
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
          <span className={classes.error}>{errors.description?.message}</span>

          <Controller
            name="afiliate"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                id="afiliate-form"
                required
                select
                value={afiliate}
                onChange={handleChange}
                helperText="Por favor selecciona un afiliado"
                label="Afiliado"
                variant="outlined"
                margin="normal"
                fullWidth
                error={Boolean(errors.description)}
              >
                {data ? (
                  data.data.map((afiliate, index) => (
                    <MenuItem key={index} value={afiliate.user.id}>
                      {afiliate.user.name + " " + afiliate.user.last_name}
                    </MenuItem>
                  ))
                ) : (
                  <span>Cargando...</span>
                )}
              </TextField>
            )}
          />
          <span className={classes.error}>{errors.description?.message}</span>

          <Controller
            name="date"
            control={control}
            defaultValue=""
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
                Registrar
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

export default FormAppointment;
