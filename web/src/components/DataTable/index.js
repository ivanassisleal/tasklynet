/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import { TablePagination } from "@material-ui/core";
import TypeTable from "./components/DataListTypes/TypeTable";

function DataTable({ columns, data, setSelectedRows }) {
  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (setSelectedRows) {
      const selectedIds = Object.keys(selectedRowIds);
      var selectedRowsData = selectedIds
        .map((x) => data[x])
        .filter(function (x) {
          return x != null;
        });
      setSelectedRows(selectedRowsData);
    }
  }, [selectedRowIds]);

  return (
    <>
      <TypeTable
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        rows={rows}
        prepareRow={prepareRow}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={(event, page) => gotoPage(page)}
        onChangeRowsPerPage={(e) => setPageSize(e.target.value)}
      />
    </>
  );
}

export { DataTable };
