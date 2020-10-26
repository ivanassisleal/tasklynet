/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useContext, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Box,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as Yup from "yup";

import { TaskContext } from "../../context/TaskContext";

import api from "../../../../services/api";

const initalState = {
  projects: [],
};

const initialForm = {
  title: "",
  description: "",
  projectId: "",
  done: false,
};

const schema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  projectId: Yup.string().required("Required"),
});

const TaskForm = () => {
  const [state, setState] = useState(initalState);

  const taskContext = useContext(TaskContext);

  const formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await api.post("tasks/store", values);
        taskContext.setRefreshList();
        taskContext.closeModalForm();
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
          }
        }
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("projects");

      setState({ ...state, projects: response.data });
    };
    if (taskContext?.state.formModal) fetchData();
  }, [taskContext?.state.formModal]);

  useEffect(() => {
    const fetchData = async () => {
      const { selectedTask } = taskContext?.state;
      if (selectedTask) {
        const response = await api.get(`tasks/${selectedTask.id}`);
        formik.setValues(response.data);
        taskContext.openModalForm();
      } else {
        formik.resetForm();
      }
    };
    fetchData();
  }, [taskContext.state.selectedTask]);

  const handleClickClose = useCallback(() => {
    taskContext.closeModalForm();
  }, []);

  return (
    <>
      <Dialog
        open={taskContext.state.formModal}
        onClose={handleClickClose}
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title">{"Add New Task"}</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item md={12}>
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
              <Grid item md={12}>
                <FormControl
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={
                    !!formik.touched.projectId && !!formik.errors.projectId
                  }
                >
                  <InputLabel id="project">Project</InputLabel>
                  <Select
                    labelId="project"
                    id="project"
                    name="projectId"
                    label="Project"
                    value={formik.values.projectId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {state?.projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={!!formik.touched.project && !!formik.errors.project}
                  >
                    {formik.errors.project}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  error={
                    !!formik.touched.description && !!formik.errors.description
                  }
                  helperText={formik.errors.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
              </Grid>
              <Grid item md={12}>
                <Box m={1}>
                  <FormControlLabel
                    margin="normal"
                    control={
                      <Checkbox
                        checked={formik.values.done}
                        value={formik.values.done}
                        onChange={formik.handleChange}
                        name="done"
                        color="primary"
                      />
                    }
                    label="Done"
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Box m={2} display="flex">
              <Box mr={1}>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Box>
              <Button variant="contained" onClick={handleClickClose}>
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TaskForm;
