import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import ActionBar from "@/components/ActionBar";
import TableData from "@/components/TableData";
import ButtonReport from "@/components/ButtonReport";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Loading from "@/components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "40px",
    borderRadius: theme.border.default,
  },
  container: {
    maxHeight: 740,
    borderRadius: theme.border.default,
  },
}));

const columns = [
  { id: "title", label: "Título" },
  { id: "description", label: "Descripción" },
  { id: "date", label: "Fecha" },
  { id: "partner", label: "Socio" },
  { id: "state", label: "Estado" },
];

const AppointmentListAffiliate = () => {
  const classes = useStyles();
  const { data, error } = useSWR(`/appointments_afiliate`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  //Columns for data table
  const columns = [
    {
      field: "title",
      headerName: "Título",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 2,
    },
    {
      field: "date",
      headerName: "Fecha",
      flex: 1,
    },
    {
      field: "partner",
      headerName: "Socio",
      flex: 1,
    },
    {
      field: "state",
      headerName: "Estado",
      flex: 1,
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

  const meta = <div>Citas</div>;

  const buttonReport = (
    <ButtonReport
      tableColumn={columnsReport}
      tableRows={handleRows(data.data)}
      title={title}
      fileName={fileName}
    />
  );

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={buttonReport} />
      <Paper className={classes.root}>
        <TableData columns={columns} rows={data.data} />
      </Paper>
    </>
  );
};

export default AppointmentListAffiliate;
