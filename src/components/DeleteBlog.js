import { React, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Button, Grid } from "@material-ui/core";
import { Blogs } from "@/lib/blogs";

const DeleteBlog = (prop) => {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await Blogs.deleteBlog(prop.id);
      prop.handleMutate();
      console.log("Eliminado con exito");
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
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
