import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import ActionBar from "@/components/ActionBar";
import NewPartner from "@/components/NewPartner";
import DeletePartner from "@/components/DeletePartner";
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "40px",
    borderRadius: theme.border.default,
  },
  container: {
    maxHeight: 440,
    borderRadius: theme.border.default,
  },
}));

const columns = [
  { id: "name", label: "Nombre" },
  { id: "last_name", label: "Apellido" },
  { id: "email", label: "Correo" },
  { id: "phone", label: "Teléfono" },
  { id: "business", label: "Negocio" },
  {
    id: "description",
    label: "Descripción",
    align: "left",
  },
  {
    id: "address",
    label: "Dirección",
    align: "left",
  },
];

const PartnersList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error, mutate } = useSWR(`/partners`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const meta = <div>{data.meta.total} Socios</div>;

  const newPartner = <NewPartner mutate={mutate} />;

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={newPartner} />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key="actions" align="left">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row, index) => {
                const userData = data.data[index].user;
                const partner = Object.assign(userData, row);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    key={"row" + index}
                  >
                    {columns.map((column, index) => {
                      const value = partner[column.id];

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          key={"column" + index}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <DeletePartner partner={row} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={20}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        /> */}
      </Paper>
    </>
  );
};

export default PartnersList;
