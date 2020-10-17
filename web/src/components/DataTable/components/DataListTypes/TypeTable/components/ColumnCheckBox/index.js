import React from 'react';

const TableColumnCheckBox = ({ selectProps }) => {
    const props = selectProps;
    delete props.indeterminate;
    return (
        <div className="form-check text-center">
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    {...props}
                />
                <span className="form-check-sign" />
            </label>
        </div>
    );
};

export default TableColumnCheckBox;
