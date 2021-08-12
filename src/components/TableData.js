import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const TableData = (props) => {
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          pageSize={20}
          autoHeight={true}
          disableExtendRowFullWidth={true}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default TableData;
