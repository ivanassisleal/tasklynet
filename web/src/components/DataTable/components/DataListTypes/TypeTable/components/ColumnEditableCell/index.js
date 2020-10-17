import React, { useState, useEffect } from "react";

import NumberFormat from "react-number-format";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  tableRowUpdate,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = ({ value }) => {
    setValue(value);
  };

  const onBlur = () => {
    tableRowUpdate(index, id, parseFloat(value));
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <NumberFormat
      className="form-control"
      value={value || 0}
      onValueChange={onChange}
      onBlur={onBlur}
      style={{ width: 120 }}
      decimalScale={2}
      fixedDecimalScale
      prefix="R$ "
    />
  );
};

const tableRowUpdate = (setData, rowIndex, columnId, value) => {
  setData((old) =>
    old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    })
  );
};

export default EditableCell;
