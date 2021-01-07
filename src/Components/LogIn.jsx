import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../Contexts/UserAuth";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Treat Yo Shelf
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#1A5AFF",
      },
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#FFFFFF",
    backgroundColor: "#1A5AFF",
  },
  link: {
    color: "#1A5AFF",
  },
  checkbox: {},
}));

export default function LogIn() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Log in failed");
    }

    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Log In
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid item xs={12}>
            {currentUser && currentUser.email}
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={loading}
          >
            Log In
          </Button>
          <Grid container justify="center" spacing={3}>
            <Grid item>
              <Link
                href="/forgot-password"
                variant="body2"
                className={classes.link}
              >
                Forgot your password?
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              Don't have an account?{" "}
              <Link
                type="link"
                href="/signup"
                variant="body2"
                className={classes.link}
              >
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
