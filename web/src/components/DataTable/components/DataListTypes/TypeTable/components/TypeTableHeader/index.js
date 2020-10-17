import React from "react";

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

const generateSortingIndicator = (column) => {
  return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
};

const TypeTableHeader = ({ headerGroups }) => {
  return (
    <TableHead>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <TableCell
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render("Header")}
              <TableSortLabel
                active={!column.disableSortBy && column.isSorted}
                direction={
                  column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : ""
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default TypeTableHeader;
