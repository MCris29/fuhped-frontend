import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Snackbar,
  Modal,
  Backdrop,
  Fade,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import FormUpdatePassword from "@/components/FormUpdatePassword";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: theme.border.default,
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UpdatePassword = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSucces = () => {
    setSuccess(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  const alert = (
    <div>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Contraseña cambiada
        </Alert>
      </Snackbar>
    </div>
  );

  return (
    <>
      {alert}
      <Button className={classes.button} onClick={handleOpen} fullWidth>
        Cambiar Contraseña
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography id="transition-modal-title" variant="h6">
              Cambio de contraseña
            </Typography>
            <div id="transition-modal-description">
              <FormUpdatePassword
                handleClose={handleClose}
                handleOpenSucces={handleOpenSucces}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default UpdatePassword;
