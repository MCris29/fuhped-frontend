import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Services } from "@/lib/services";

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
  name: yup.string().required("Ingrese el nombre del servicio"),
  description: yup.string().required("Ingrese una descripción"),
  price: yup.string().required("Ingrese el precio del servicio"),
  price_fuhped: yup.string().required("Ingrese el precio Fuhped del servicio"),
});

const FormService = (prop) => {
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataService) => {
    setLoading(true);

    try {
      const serviceData = await Services.create(dataService);
      console.log("serviceData", serviceData);
      prop.handleMutate();
      prop.handleOpenSucces();
      prop.handleClose();

      document.getElementById("blog-form").reset();
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={classes.formContainer}>
        <form
          id="service-form"
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            name="price"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                id="price-form"
                required
                label="Precio Normal"
                variant="outlined"
                margin="normal"
                type="number"
                fullWidth
                error={Boolean(errors.price)}
              />
            )}
          />
          <span className={classes.error}>{errors.price?.message}</span>

          <Controller
            name="price_fuhped"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                id="price_fuhped-form"
                required
                label="Precio Fuhped"
                variant="outlined"
                margin="normal"
                type="number"
                fullWidth
                error={Boolean(errors.price_fuhped)}
              />
            )}
          />
          <span className={classes.error}>{errors.price_fuhped?.message}</span>

          <Grid container className={classes.actionContainer}>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.button}
                disabled={loading}
              >
                Guardar Servicio
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

export default FormService;
