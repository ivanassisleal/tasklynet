/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  IconButton,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

import { Edit, Delete, Check, Close } from "@material-ui/icons";

import history from "../../services/history";
import api from "../../services/api";
import { DataTable } from "../../components/DataTable";

import useStyles from "./styles";

import TableColumnCheckBox from "../../components/DataTable/components/DataListTypes/TypeTable/components/ColumnCheckBox";

const initalState = {
  dialogRemoveOpen: false,
  selectedRecord: {},
};

const ProjectList = () => {
  const classes = useStyles();

  // component state
  const [state, setState] = useState(initalState);

  // table component states
  const [tableData, setTableData] = useState([]);
  const [tableGlobalFilter, setTableGlobalFilter] = useState("");
  const [tableSelectedRows, setTableSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.post(`projects`, {
        globalFilter: tableGlobalFilter,
      });

      setTableData(result.data);
    };
    fetchData();
  }, [tableGlobalFilter]);

  const handleClickNew = () => {
    history.push("projects/new");
  };

  const handleClickEdit = (row) => {
    history.push(`projects/${row.id}/edit`);
  };

  const handleClickRemove = (row) => {
    setState({ ...state, selectedRecord: row, dialogRemoveOpen: true });
  };

  const handleClickRemoveConfirm = async () => {
    await api.delete(`projects/${state.selectedRecord.id}`);

    const newData = tableData.filter(function (item) {
      return item !== state.selectedRecord;
    });

    setTableData(newData);
    setState({ ...state, dialogRemoveOpen: false });
  };

  const handleClickRemoveCancel = () => {
    setState({ ...state, dialogRemoveOpen: false });
  };

  const handleChangeFilter = (event) => {
    setTableGlobalFilter(event.target.value);
  };

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
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Active",
        accessor: "active",
        Cell: ({ row }) => <>{row.original.active ? <Check /> : <Close />}</>,
      },
      {
        Header: "Ações",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }) => (
          <Box align="left">
            <IconButton onClick={() => handleClickEdit(row.original)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleClickRemove(row.original)}>
              <Delete />
            </IconButton>
          </Box>
        ),
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
            <Typography color="textPrimary">Projects</Typography>
          </Breadcrumbs>
          <Typography variant="h5" gutterBottom>
            List of Projects
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
                  New Project
                </Button>
              </Box>
              {tableSelectedRows.length > 0 && (
                <Box ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickNew}
                  >
                    Remover
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box m={3} display="flex" justifyContent="flex-end">
              <TextField
                variant="outlined"
                label="Filter"
                value={tableGlobalFilter}
                onChange={handleChangeFilter}
              />
            </Box>
          </Grid>
        </Grid>

        <DataTable
          columns={columns}
          data={tableData}
          setSelectedRows={setTableSelectedRows}
        />
      </Paper>

      <Dialog
        open={state.dialogRemoveOpen}
        onClose={handleClickRemoveCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm this action?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove the record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickRemoveCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClickRemoveConfirm}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectList;
