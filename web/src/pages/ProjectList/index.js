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
  TextField,
  TablePagination,
} from "@material-ui/core";

import { Edit, Delete, Check, Close } from "@material-ui/icons";

import history from "../../services/history";
import api from "../../services/api";
import { DataTable } from "../../components/DataTable";
import useStyles from "./styles";
import TableColumnCheckBox from "../../components/DataTable/components/DataListTypes/TypeTable/components/ColumnCheckBox";
import DialogRemove from "../../components/DialogRemove";

const ProjectList = () => {
  const initalState = {
    dialogRemoveOpen: false,
    selectedRecord: {},
  };

  const classes = useStyles();

  const [state, setState] = useState(initalState);

  const [tableData, setTableData] = useState([]);
  const [tableCount, setTableCount] = useState(0);
  const [tablePage, setTablePage] = useState(0);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [tableGlobalFilter, setTableGlobalFilter] = useState("");
  const [tableSelectedRows, setTableSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.post(`projects`, {
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
  }, [tableGlobalFilter, tablePage, tablePageSize]);

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
    setTableData(
      tableData.filter(function (item) {
        return item !== state.selectedRecord;
      })
    );
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
          paginate={false}
        />

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

export default ProjectList;
