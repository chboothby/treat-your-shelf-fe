import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../Contexts/UserAuth";
import { useHistory } from "react-router-dom";
import Geocode from "react-geocode";
import { geocodeApi } from "../api";
Geocode.setApiKey(geocodeApi);
Geocode.setRegion("gb");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: theme.palette.primary,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.primary,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const confirmPasswordRef = useRef();
  const cityRef = useRef();
  const postCodeRef = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const userRegEx = new RegExp("^[a-zA-Z0-9_-]{1,}[a-zA-Z]+[0-9]*$");

    if (!userRegEx.test(usernameRef.current.value)) {
      return setError(
        "Your username must include at least one letter and may only contain alphanumeric characters, underscores or hyphens"
      );
    }

    const passRegEx = new RegExp(
      "(?:(?:(?=.*?[0-9])(?=.*?[-!@#$%&*ˆ+=_])|(?:(?=.*?[0-9])|(?=.*?[A-Z])|(?=.*?[-!@#$%&*ˆ+=_])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%&*ˆ+=_]))[A-Za-z0-9-!@#$%&*ˆ+=_]{6,20}"
    );

    if (!passRegEx.test(passwordRef.current.value)) {
      return setError(
        "Please ensure that your password is between 6-20 characters and includes at least 1 capital letter and 1 number"
      );
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    if (!cityRef.current.value || !postCodeRef.current.value) {
      return setError("Please enter a city and first part of your postcode");
    }

    try {
      setError("");
      setLoading(true);

      await signUp(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        cityRef.current.value,
        postCodeRef.current.value
      );
      history.push("/email-verify");
    } catch {
      setError("Account creation failed");
    }

    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={usernameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="city"
                label="City"
                name="email"
                autoComplete="city"
                inputRef={cityRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="postcode"
                label="First section of post-code (e.g M16)"
                name="postcode"
                inputRef={postCodeRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                inputRef={confirmPasswordRef}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={loading}
            // style={{backgroundColor="blue"}}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              Already have an account?{" "}
              <Link href="/login" variant="body2" className={classes.link}>
                Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
