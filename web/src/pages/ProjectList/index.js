/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import {
  makeStyles,
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
  TablePagination,
} from "@material-ui/core";

import { Edit, Delete, Check, Close } from "@material-ui/icons";

import history from "../../services/history";
import api from "../../services/api";
import { DataTable } from "../../components/DataTable";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

const initalState = {
  dialogRemoveOpen: false,
  selectedRecord: {},
};

const initialTableState = {
  rows: [],
  rowsPerPage: 10,
  rowsCount: 0,
  page: 0,
  globalFilter: "",
};

const ProjectList = () => {
  const [state, setState] = useState(initalState);
  const [stateTable, setStateTable] = useState(initialTableState);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.post(`projects`, {
        page: stateTable.page,
        take: stateTable.rowsPerPage,
        globalFilter: stateTable.globalFilter,
      });

      const { records, total } = result.data;

      setStateTable({ ...stateTable, rows: records, rowsCount: total });
    };
    fetchData();
  }, [stateTable.globalFilter, stateTable.rowsPerPage, stateTable.page]);

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

    const newData = stateTable.row.filter(function (item) {
      return item !== state.selectedRecord;
    });

    setStateTable({
      ...stateTable,
      records: newData,
      rowsCount: newData.length,
    });

    setState({ ...state, dialogRemoveOpen: false });
  };

  const handleClickRemoveCancel = () => {
    setState({ ...state, dialogRemoveOpen: false });
  };

  const handleChangeFilter = (event) => {
    setStateTable({
      ...stateTable,
      globalFilter: event.target.value,
    });
  };

  const handleClickChangePage = (event, page) => {
    setStateTable({
      ...stateTable,
      page,
    });
  };

  const handleClickChangeRowsPerPage = (event) => {
    setStateTable({
      ...stateTable,
      rowsPerPage: parseInt(event.target.value),
      page: 0,
    });
  };

  const columns = useMemo(
    () => [
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
      <Paper style={{ width: "100%" }}>
        <Grid container>
          <Grid item md={6}>
            <Box m={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickNew}
              >
                New Task
              </Button>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box m={3} display="flex" justifyContent="flex-end">
              <TextField
                variant="outlined"
                label="Filter"
                value={stateTable.globalFilter}
                onChange={handleChangeFilter}
              />
            </Box>
          </Grid>
        </Grid>

        <DataTable columns={columns} data={stateTable.rows} />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={stateTable.rowsCount}
          rowsPerPage={stateTable.rowsPerPage}
          page={stateTable.page}
          onChangePage={handleClickChangePage}
          onChangeRowsPerPage={handleClickChangeRowsPerPage}
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
