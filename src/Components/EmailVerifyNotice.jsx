import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    minWidth: 275,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    textTransform: "none",
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Email Verification
        </Typography>
        <Grid container justify="center">
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="body1" component="p">
                Thank you for creating an account with us!
              </Typography>
              <p></p>
              <Typography variant="body1" component="p">
                Please check your inbox for an email which contains a
                verification link.
              </Typography>
            </CardContent>
          </Card>
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            href="/"
          >
            Take me to my bookshelf!
          </Button>
        </Grid>
      </div>
    </Container>
  );
}
