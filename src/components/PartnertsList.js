import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActionBar from "@/components/ActionBar";
import NewPartner from "@/components/NewPartner";
import DeletePartner from "@/components/DeletePartner";
import ButtonReport from "@/components/ButtonReport";
import Loading from "@/components/Loading";
import TableData from "@/components/TableData";
import Tooltip from "@material-ui/core/Tooltip";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "40px",
    borderRadius: theme.border.default,
    backgroundColor: "#fff",
  },
  cell: {
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    textOverflow: "ellipsis",
  },
}));

const PartnersList = () => {
  const classes = useStyles();
  const { data, error, mutate } = useSWR(`/partners`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  // columns for data table
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.name} arrow>
            <div className={classes.cell}>{data.row.name}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.email} arrow>
            <div className={classes.cell}>{data.row.email}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "phone",
      headerName: "Teléfono",
      flex: 1,
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.phone} arrow>
            <div className={classes.cell}>{data.row.phone}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "business",
      headerName: "Negocio",
      flex: 1,
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.business} arrow>
            <div className={classes.cell}>{data.row.business}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.description} arrow>
            <div className={classes.cell}>{data.row.description}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "address",
      headerName: "Dirección",
      flex: 2,
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.address} arrow>
            <div className={classes.cell}>{data.row.address}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "Acciones",
      flex: 1,
      renderCell: (data) => {
        return <DeletePartner partner={data.row} mutate={mutate} />;
      },
    },
  ];

  //Columns for PDF report
  const columnsReport = [
    "Código",
    "Nombre",
    "Correo",
    "Teléfono",
    "Negocio",
    "Descripción",
    "Dirección",
  ];

  //Rows for PDF report
  const handleRows = (dataRow) => {
    const tableRows = [];
    dataRow.map((item) => {
      const RowsData = [
        item.id,
        item.name,
        item.email,
        item.phone,
        item.business,
        item.description,
        item.address,
      ];

      tableRows.push(RowsData);
    });

    return tableRows;
  };

  //Data for PDF report
  const title = "Reporte de Socios";
  const fileName = "reporte_socios";

  const meta = <div>{data.meta.total} Socios</div>;

  const newPartner = (
    <div>
      <NewPartner mutate={mutate} />
      <ButtonReport
        tableColumn={columnsReport}
        tableRows={handleRows(data.data)}
        title={title}
        fileName={fileName}
      />
    </div>
  );

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={newPartner} />
      <div className={classes.root}>
        <TableData columns={columns} rows={data.data} />
      </div>
    </>
  );
};

export default PartnersList;
