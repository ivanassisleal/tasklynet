import { Checkbox } from "@material-ui/core";
import React from "react";

const TableColumnCheckBox = ({ selectProps }) => {
  const props = selectProps;
  delete props.indeterminate;
  return (
    <>
      <Checkbox {...props} color="primary" />
    </>
  );
};

export default TableColumnCheckBox;
