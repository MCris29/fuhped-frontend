import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: theme.shadow.default,
  },
}));

const TableData = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          pageSize={10}
          autoHeight={true}
          disableExtendRowFullWidth={true}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default TableData;
