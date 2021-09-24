import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import GenerateReport from "@/components/GenerateReport";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    textTransform: "none",
    padding: "5px 30px",
    margin: "0 3px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0",
    },
  },
}));

const ButtonReport = (props) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.button}
        onClick={() =>
          GenerateReport(
            props.tableColumn,
            props.tableRows,
            props.title,
            props.fileName
          )
        }
      >
        Descargar PDF
      </Button>
    </>
  );
};

export default ButtonReport;
