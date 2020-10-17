import React from "react";

import { useTable, useSortBy } from "react-table";

// import { useMediaQuery } from "react-responsive";

import TypeTable from "./components/DataListTypes/TypeTable";
// import TypeCard from "./components/DataListTypes/TypeCard";

function DataTable({ columns, data, setSort }) {
  //   const isXs = useMediaQuery({
  //     query: "(min-width: 0px) and (max-width: 575px)",
  //   });

  const isXs = false;

  const { getTableBodyProps, headerGroups, rows, prepareRow, page } = useTable(
    {
      columns,
      data,
      manualSortBy: false,
    },
    useSortBy
  );

  return (
    <>
      {!isXs ? (
        <TypeTable
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={page}
          rows={rows}
          prepareRow={prepareRow}
        />
      ) : (
        <>
          {/* <TypeCard
            headerGroups={headerGroups}
            includePagination={visiblePagination}
            page={page}
            rows={rows}
            prepareRow={prepareRow}
            loading={loading}
          /> */}
        </>
      )}
    </>
  );
}

export { DataTable };
