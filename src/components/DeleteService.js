import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  Modal,
  Button,
  Backdrop,
  Fade,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Services } from "@/lib/services";

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
  buttonCancel: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.border.default,
    color: theme.palette.text.main,
    textTransform: "none",
    "&:hover": {
      opacity: 0.5,
    },
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DeleteService = (prop) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const classes = useStyles();

  const handleDelete = async () => {
    try {
      await Services.deleteService(prop.service.id);
      handleSuccessOpen();
      handleClose();
      prop.mutate();
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessOpen = () => {
    setSuccess(true);
  };

  const handleSuccessClose = (event, reason) => {
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
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Eliminado exitosamente!
        </Alert>
      </Snackbar>
    </div>
  );

  return (
    <>
      {alert}
      <Button className={classes.buttonCancel} onClick={handleOpen}>
        Eliminar
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
              ¿Esta seguro que quiere eliminar el servicio {prop.service.name}?
            </Typography>
            <div
              id="transition-modal-description"
              className={classes.actionContainer}
            >
              <Button onClick={handleDelete} className={classes.buttonCancel}>
                Eliminar
              </Button>
              <Button onClick={handleClose} className={classes.buttonCancel}>
                Cancelar
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default DeleteService;
