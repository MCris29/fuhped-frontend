import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActionBar from "@/components/ActionBar";
import ButtonReport from "@/components/ButtonReport";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import TableData from "@/components/TableData";
import Tooltip from "@material-ui/core/Tooltip";
import SkeletonTable from "./SkeletonTable";

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

const AppointmentList = () => {
  const classes = useStyles();
  const { data, error } = useSWR(`/appointments`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <SkeletonTable />;

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Título",
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.title} arrow>
            <div className={classes.cell}>{data.row.title}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 2,
      // eslint-disable-next-line react/display-name
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.description} arrow>
            <div className={classes.cell}>{data.row.description}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "date",
      headerName: "Fecha",
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.date} arrow>
            <div className={classes.cell}>{data.row.date}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "state",
      headerName: "Estado",
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.state} arrow>
            <div className={classes.cell}>{data.row.state}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "partner",
      headerName: "Socio",
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.partner} arrow>
            <div className={classes.cell}>{data.row.partner}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "afiliate",
      headerName: "Afiliado",
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (data) => {
        return (
          <Tooltip title={data.row.afiliate} arrow>
            <div className={classes.cell}>{data.row.afiliate}</div>
          </Tooltip>
        );
      },
    },
  ];

  //Columns for PDF report
  const columnsReport = [
    "Código",
    "Título",
    "Descripción",
    "Fecha",
    "Estado",
    "Socio",
    "Afiliado",
  ];

  //Rows for PDF report
  const handleRows = (dataRow) => {
    const tableRows = [];
    dataRow.map((item) => {
      const RowsData = [
        item.id,
        item.title,
        item.description,
        item.date,
        item.state,
        item.partner,
        item.afiliate,
      ];

      tableRows.push(RowsData);
    });

    return tableRows;
  };

  //Data for PDF report
  const title = "Reporte de Citas";
  const fileName = "reporte_citas";

  const meta = <div>{data.meta.total} Citas</div>;

  const newAffiliate = (
    <div>
      <ButtonReport
        tableColumn={columnsReport}
        tableRows={handleRows(data.data.data)}
        title={title}
        fileName={fileName}
      />
    </div>
  );

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={newAffiliate} />
      <div className={classes.root}>
        <TableData columns={columns} rows={data.data.data} />
      </div>
    </>
  );
};

export default AppointmentList;
