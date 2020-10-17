import React from "react";

import TypeTableHeader from "./components/TypeTableHeader";
import TypeTableBody from "./components/TypeTableBody";
import { makeStyles, Table, TableContainer } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    padding: "10px",
    width: "auto",
  },
  table: {
    width: "100%",
  },
});

const TypeTable = ({ headerGroups, ...rest }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table}>
        <TypeTableHeader headerGroups={headerGroups} />
        <TypeTableBody {...rest} />
      </Table>
    </TableContainer>
  );
};

export default TypeTable;
