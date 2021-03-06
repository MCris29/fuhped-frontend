import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  Modal,
  Button,
  Backdrop,
  Fade,
  Typography,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiAlert from "@material-ui/lab/Alert";
import { Partners } from "@/lib/partners";
import { Users } from "@/lib/users";

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
    maxWidth: "70%",
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

const DeletePartner = (prop) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await Users.deleteUser(prop.partner.user_id);
      await Partners.deletePartner(prop.partner.id);
      prop.mutate();
      handleSuccessOpen();
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
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
      <Tooltip title="Eliminar" arrow>
        <Button className={classes.buttonCancel} onClick={handleOpen}>
          <DeleteIcon color="error" />
        </Button>
      </Tooltip>
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
            <Typography id="transition-modal-title" variant="body2">
              ??Esta seguro que quiere eliminar a{" "}
              <strong>{prop.partner.name}</strong> se eliminaran todos los datos
              asociados a este usuario?
            </Typography>
            <div
              id="transition-modal-description"
              className={classes.actionContainer}
            >
              <Button
                onClick={handleDelete}
                className={classes.buttonCancel}
                disabled={loading}
              >
                Si, eliminar
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

export default DeletePartner;
