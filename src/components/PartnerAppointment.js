import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import ActionBar from "@/components/ActionBar";
import TableData from "@/components/TableData";
import NewAppointment from "@/components/NewAppointment";
import DeleteAppointment from "@/components/DeleteAppointment";
import EditAppointment from "@/components/EditAppointment";
import ButtonReport from "@/components/ButtonReport";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Tooltip from "@material-ui/core/Tooltip";
import SkeletonTable from "./SkeletonTable";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px 24px",
    borderRadius: theme.border.default,
  },
  container: {
    maxHeight: 740,
    borderRadius: theme.border.default,
  },
  containerButton: {
    display: "flex",
  },
  cell: {
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    textOverflow: "ellipsis",
  },
}));

const PartnerAppointment = () => {
  const classes = useStyles();
  const { data, error, mutate } = useSWR(`/appointments_partner`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <SkeletonTable />;

  //Columns for data table
  const columns = [
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
      field: "Acciones",
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (data) => {
        return (
          <div className={classes.containerButton}>
            <DeleteAppointment appointment={data.row} mutate={mutate} />
            <EditAppointment appointment={data.row} mutate={mutate} />
          </div>
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
    "Afiliado",
    "Estado",
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
        item.afiliate,
        item.state,
      ];

      tableRows.push(RowsData);
    });

    return tableRows;
  };

  //Data for PDF report
  const title = "Reporte de Citas";
  const fileName = "reporte_citas";

  const meta = <div>Registro de citas</div>;

  const newAffiliate = (
    <div>
      <NewAppointment mutate={mutate} />
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
      <ActionBar actionFirst={meta} actionSecond={newAffiliate} />
      <Paper className={classes.root}>
        <TableData columns={columns} rows={data.data} />
      </Paper>
    </>
  );
};

export default PartnerAppointment;
