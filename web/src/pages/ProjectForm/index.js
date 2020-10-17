/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Breadcrumbs,
  Link,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import history from "../../services/history";

const initialState = {
  snackBar: {
    open: false,
    type: "error",
    message: "",
  },
};

const initialForm = {
  title: "",
  description: "",
  type: "web",
  active: true,
};

const schema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const ProjectForm = () => {
  const [state, setState] = useState(initialState);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`projects/${id}`);
      formik.setValues(response.data);
    };
    if (id) fetchData();
  }, []);

  const formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (id) values = { ...values, id };

        await api.post("projects/store", values);

        setState({
          ...state,
          snackBar: {
            ...state.snackBar,
            open: true,
            type: "success",
            message: "Project save with success!",
          },
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setState({
              ...state,
              snackBar: {
                ...state.snackBar,
                open: true,
                type: "error",
                message: "Erro at in save",
              },
            });
          }
        }
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, snackBar: { ...state.snackBar, open: false } });
  };

  const handleClickCancel = () => {
    history.push("/projects");
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box p={4} pt={6} mt={2}>
            <Grid item xs={12}>
              <Box mb={5}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="/">
                    Home
                  </Link>
                  <Link color="inherit" href="/getting-started/installation/">
                    Projects
                  </Link>
                  <Typography color="textPrimary">New Project</Typography>
                </Breadcrumbs>
                <Typography variant="h5" gutterBottom>
                  New Project
                </Typography>
              </Box>
            </Grid>
            <Paper>
              <Box p={4}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid>
                    <Grid item md={6}>
                      <TextField
                        name="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        error={!!formik.touched.title && !!formik.errors.title}
                        helperText={formik.errors.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                      />
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={
                          !!formik.touched.description &&
                          !!formik.errors.description
                        }
                        helperText={formik.errors.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      />
                    </Grid>
                    <Grid container md={12}>
                      <Grid item md={3}>
                        <FormControl
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        >
                          <InputLabel id="type">Type</InputLabel>
                          <Select
                            labelId="type"
                            id="type"
                            name="type"
                            label="Type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Web">Web</MenuItem>
                            <MenuItem value="Desktop">Desktop</MenuItem>
                            <MenuItem value="Mobile">Mobile</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.active}
                          value={formik.values.active}
                          onChange={formik.handleChange}
                          name="active"
                          color="primary"
                        />
                      }
                      label="Active"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box mt={8} mb={2} display="flex">
                      <Box mr={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Save
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          variant="contained"
                          onClick={() => handleClickCancel()}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={state.snackBar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <MuiAlert severity={state.snackBar.type}>
          {state.snackBar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ProjectForm;
