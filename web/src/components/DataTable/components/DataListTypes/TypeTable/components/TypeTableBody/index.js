/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import { TableBody, TableCell, TableRow } from "@material-ui/core";
import React from "react";

const TableBodyRow = ({ row }) => {
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <TableCell
            {...cell.getCellProps()}
            className={`${cell.column.display}`}
          >
            {cell.render("Cell")}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const TableBodyLoading = ({ loading, rows }) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <tr>
      {loading && (
        <td colSpan="10000" className="text-center">
          <div style={style}>
            <i
              className="fa fa-refresh fa-spin fa-2x  mt-3 mb-3"
              style={{ marginRight: "10px" }}
            />{" "}
            Carregando...
          </div>
        </td>
      )}

      {!loading && rows.length === 0 && (
        <td colSpan="10000" className="text-center">
          <div className="mt-3 mb-3">Nenhum registro encontrado</div>
        </td>
      )}
    </tr>
  );
};

const TypeTableBody = ({ getTableBodyProps, page, prepareRow }) => {
  return (
    <TableBody {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return <TableBodyRow row={row} key={row.index} />;
      })}
    </TableBody>
  );
};

export default TypeTableBody;
