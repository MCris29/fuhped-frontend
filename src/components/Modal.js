import React, { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, Button, Typography } from "@material-ui/core";

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
  actionContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
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
}));

const SimpleModal = (prop) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    prop.handleAction();
  };

  return (
    <>
      {prop.styleButton ? (
        <Button className={classes.button} onClick={handleOpen}>
          {prop.nameButton}
        </Button>
      ) : (
        <Button className={classes.buttonCancel} onClick={handleOpen}>
          {prop.nameButton}
        </Button>
      )}
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
            {prop.message ? (
              <Typography id="transition-modal-title" variant="h6">
                {prop.title}
              </Typography>
            ) : (
              <Typography id="transition-modal-title" variant="h5">
                {prop.title}
              </Typography>
            )}

            <div id="transition-modal-description">{prop.description}</div>

            {prop.nameButtonAction ? (
              <div className={classes.actionContainer}>
                {prop.styleActionButton ? (
                  <Button onClick={handleAction} className={classes.button}>
                    {prop.nameButtonAction}
                  </Button>
                ) : (
                  <Button
                    onClick={handleAction}
                    className={classes.buttonCancel}
                  >
                    {prop.nameButtonAction}
                  </Button>
                )}

                <Button onClick={handleClose} className={classes.buttonCancel}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default SimpleModal;
