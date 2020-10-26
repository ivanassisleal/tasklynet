/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Check, Close, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import TableColumnCheckBox from "../../components/DataTable/components/DataListTypes/TypeTable/components/ColumnCheckBox";
import useStyles from "../ProjectList/styles";
import api from "../../services/api";

const initialTableState = {
  rows: [],
  globalFilter: "",
};

const Category = () => {
  const classes = useStyles();

  const [stateTable, setStateTable] = useState(initialTableState);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleClickNew = () => {};
  const handleClickEdit = (row) => {};
  const handleClickRemove = (row) => {};
  const handleChangeFilter = (e) => {};

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`categories`);
      setStateTable({ ...stateTable, rows: result.data });
    };
    fetchData();
  }, [stateTable.globalFilter]);

  const columns = useMemo(
    () => [
      {
        id: "selection",
        disableSortBy: true,
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <TableColumnCheckBox selectProps={getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
          <TableColumnCheckBox selectProps={row.getToggleRowSelectedProps()} />
        ),
      },

      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Active",
        accessor: "active",
        Cell: ({ row }) => <>{row.original.active ? <Check /> : <Close />}</>,
      },
    ],
    []
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Typography color="textPrimary">Categories</Typography>
          </Breadcrumbs>
          <Typography variant="h5" gutterBottom>
            List of Categories
          </Typography>
        </Grid>
      </Grid>
      <Paper className={classes.container}>
        <Grid container>
          <Grid item md={6}>
            <Box display="flex" m={3}>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickNew}
                >
                  New Category
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <DataTable
          columns={columns}
          data={stateTable.rows}
          setSelectedRows={setSelectedRows}
        />
      </Paper>
    </>
  );
};

export default Category;
