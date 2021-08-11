import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Backdrop, Fade, Typography } from "@material-ui/core";
import FormAffiliate from "@/components/FormAffiliate";

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

const NewAffiliate = (prop) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlemutate = () => {
    prop.mutate();
  };
  

  return (
    <>
      <Button className={classes.button} onClick={handleOpen}>
        Nuevo Afiliado
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
              Registrar nuevo Afiliado
            </Typography>
            <div id="transition-modal-description">
              <FormAffiliate
                handleClose={handleClose}
                handlemutate={handlemutate}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default NewAffiliate;
