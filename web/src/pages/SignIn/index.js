import React, { useCallback, useContext, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Snackbar,
  Container,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";

import * as sessionService from "../../services/sessionService";
import useStyles from "./styles";
import Copyright from "../../components/Copyright";
import { AuthContext } from "../../contexts/AuthContext";

const initialFormState = {
  email: "",
  password: "",
  remember: true,
};

const initialComponentState = {
  snackBarOpen: false,
};

const formikValidationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Must be 6 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const SignInForm = () => {
  const classes = useStyles();

  //states
  const [state, setState] = useState(initialComponentState);

  // hooks
  const authContext = useContext(AuthContext);

  const formik = useFormik({
    initialValues: initialFormState,
    validationSchema: formikValidationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await sessionService.signIn(values);
        const { token } = response;
        authContext.signIn(token);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setState({ ...state, snackBarOpen: true });
          }
        }
      }
    },
  });

  // functions
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, snackBarOpen: false });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        error={!!formik.touched.email && !!formik.errors.email}
        name="email"
        label="E-mail"
        helperText={formik.errors.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <TextField
        error={!!formik.touched.password && !!formik.errors.password}
        type="password"
        name="password"
        label="Password"
        helperText={formik.errors.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <FormControlLabel
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="remember"
        checked={formik.values.remember}
        value={formik.values.remember}
        control={<Checkbox color="primary" />}
        label="Remember me"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Snackbar
        open={state.snackBarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <MuiAlert severity="error">User or Password invalid</MuiAlert>
      </Snackbar>
    </form>
  );
};

const SignIn = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
