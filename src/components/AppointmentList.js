import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActionBar from "@/components/ActionBar";
import ButtonReport from "@/components/ButtonReport";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import TableData from "@/components/TableData";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "40px",
    borderRadius: theme.border.default,
    backgroundColor: "#fff",
  },
}));

const columns = [
  { field: "id", headerName: "ID" },
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
    field: "state",
    headerName: "Estado",
    flex: 1,
  },
  {
    field: "partner",
    headerName: "Socio",
    flex: 1,
  },
  {
    field: "afiliate",
    headerName: "Afiliado",
    flex: 1,
  },
];

const AppointmentList = () => {
  const classes = useStyles();
  const { data, error, mutate } = useSWR(`/appointments`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

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
