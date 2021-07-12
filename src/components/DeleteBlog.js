import { React, useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Modal from "@/components/Modal";
import { Blogs } from "@/lib/blogs";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DeleteBlog = (prop) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await Blogs.deleteBlog(prop.id);
      prop.handleMutate();
      handleClick();
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const alert = (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Eliminado exitosamente!
        </Alert>
      </Snackbar>
    </div>
  );

  return (
    <>
      {alert}
      <Modal
        message={true}
        nameButton={"Eliminar"}
        styleButton={false}
        title={"¿Esta seguro de eliminar esta publicación?"}
        description={""}
        nameButtonAction={"Eliminar"}
        styleActionButton={false}
        handleAction={handleDelete}
      />
    </>
  );
};

export default DeleteBlog;
