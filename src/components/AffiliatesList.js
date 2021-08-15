import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActionBar from "@/components/ActionBar";
import NewAffiliate from "@/components/NewAffiliate";
import DeleteAffiliate from "@/components/DeleteAffiliate";
import ButtonReport from "@/components/ButtonReport";
import Loading from "@/components/Loading";
import TableData from "@/components/TableData";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "40px",
    borderRadius: theme.border.default,
    backgroundColor: "#fff",
  },
}));

const AffiliatesList = () => {
  const classes = useStyles();
  const { data, error, mutate } = useSWR(`/afiliates`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  //Columns for data table
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Teléfono",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Dirección",
      flex: 2,
    },
    {
      field: "Acciones",
      flex: 1,
      renderCell: (data) => {
        return <DeleteAffiliate affiliate={data.row} mutate={mutate} />;
      },
    },
  ];

  //Columns for PDF report
  const columnsReport = ["Código", "Nombre", "Correo", "Teléfono", "Dirección"];

  //Rows for PDF report
  const handleRows = (dataRow) => {
    const tableRows = [];
    dataRow.map((item) => {
      const RowsData = [
        item.id,
        item.name,
        item.email,
        item.phone,
        item.address,
      ];

      tableRows.push(RowsData);
    });

    return tableRows;
  };

  //Data for PDF report
  const title = "Reporte de Afiliados";
  const fileName = "reporte_afiliados";

  const meta = <div>{data.meta.total} Afiliados</div>;

  const newAffiliate = (
    <div>
      <NewAffiliate mutate={mutate} />
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
      <div className={classes.root}>
        <TableData columns={columns} rows={data.data} />
      </div>
    </>
  );
};

export default AffiliatesList;
