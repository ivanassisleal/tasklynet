/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useContext } from "react";
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
  TablePagination,
} from "@material-ui/core";

import { Edit, Delete, Close, Check } from "@material-ui/icons";

import api from "../../../../services/api";
import { TaskContext } from "../../context/TaskContext";
import { DataTable } from "../../../../components/DataTable";

import useStyles from "./styles";
import DialogRemove from "../../../../components/DialogRemove";

const initialState = {
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

const TaskList = () => {
  const classes = useStyles();

  const [state, setState] = useState(initialState);

  const [tableData, setTableData] = useState([]);
  const [tableCount, setTableCount] = useState(0);
  const [tablePage, setTablePage] = useState(0);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [tableGlobalFilter, setTableGlobalFilter] = useState("");

  const taskContext = useContext(TaskContext);

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
        Header: "project",
        accessor: "project",
      },
      {
        Header: "Done",
        accessor: "done",
        Cell: ({ row }) => <>{row.original.done ? <Check /> : <Close />}</>,
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.post(`tasks`, {
        page: tablePage,
        globalFilter: tableGlobalFilter,
        take: tablePageSize,
      });

      const { records, total, page } = result.data;
      setTablePage(page);
      setTableCount(total);
      setTableData(records);
    };
    fetchData();
  }, [taskContext.changeList, tableGlobalFilter, tablePage, tablePageSize]);

  const handleClickNew = () => {
    taskContext.setSelectedTask(null);
    taskContext.setIsOpenModal(true);
  };

  const handleClickEdit = (row) => {
    taskContext.setSelectedTask(row);
    taskContext.setIsOpenModal(true);
  };

  const handleClickRemove = (row) => {
    setState({ ...state, dialogRemoveOpen: true, selectedRecord: row });
  };

  const handleClickRemoveConfirm = async () => {
    await api.delete(`tasks/${state.selectedRecord.id}`);
    setTableData(
      tableData.rows.filter(function (item) {
        return item !== state.selectedRecord;
      })
    );
    setState({ ...state, dialogRemoveOpen: false });
    taskContext.setListHasChange();
  };

  const handleClickRemoveCancel = () => {
    setState({ ...state, dialogRemoveOpen: false, selectedRecord: {} });
  };

  const handleChangeFilter = (event) => {
    setTableGlobalFilter(event.target.value);
    taskContext.setListHasChange();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Typography color="textPrimary">Tasks</Typography>
          </Breadcrumbs>
          <Typography variant="h5" gutterBottom>
            List of Tasks
          </Typography>
        </Grid>
      </Grid>
      <Paper className={classes.container}>
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
                value={tableGlobalFilter}
                onChange={handleChangeFilter}
              />
            </Box>
          </Grid>
        </Grid>

        <DataTable columns={columns} data={tableData} paginate={false} />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableCount}
          rowsPerPage={tablePageSize}
          page={tablePage}
          onChangePage={(event, page) => setTablePage(page)}
          onChangeRowsPerPage={(e) => setTablePageSize(e.target.value)}
        />
      </Paper>

      <DialogRemove
        dialogRemoveOpen={state.dialogRemoveOpen}
        handleClickRemoveCancel={handleClickRemoveCancel}
        handleClickRemoveConfirm={handleClickRemoveConfirm}
      />
    </>
  );
};

export default TaskList;
