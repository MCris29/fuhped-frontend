import { React, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
  { id: "state", label: "Estado" },
  { id: "partner", label: "Socio" },
  { id: "afiliate", label: "Afiliado" },
];

const AffiliatesList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error, mutate } = useSWR(`/appointments`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <Loading />;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const meta = <div>{data.meta.total} Citas</div>;

  const newAffiliate = <div>Botón</div>;

  return (
    <>
      <ActionBar actionFirst={meta} actionSecond={newAffiliate} />
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    key={"row" + index}
                  >
                    {columns.map((column, index) => {
                      const value = row[column.id];

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

export default AffiliatesList;
