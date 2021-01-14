import React, { useState, useRef } from "react";
import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import { useAuth } from "../Contexts/UserAuth";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  accountContainer: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
  },
  title: { fontSize: "30px", margin: "2%", color: theme.palette.primary.dark },
  displayName: {
    color: theme.palette.primary.main,
    fontSize: "28px",
    margin: "2%",
  },
  accountHeader: {
    padding: "2%",
    margin: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "8px",
    background: theme.palette.secondary.light,
  },
  accountBody: {
    textAlign: "center",
    background: theme.palette.primary.light,
    padding: "3%",
    width: "90%",
    borderRadius: "5px",
    margin: "0 auto",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  img: {
    maxWidth: "150px",
    maxHeight: "150px",
    borderRadius: "5px",
    padding: "2%",
    margin: "2%",
    objectFit: "contain",
  },
  avatarUpdate: {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    margin: "3%",
  },
  userUpdate: {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    margin: "3%",
  },
}));

export default function Account() {
  const [error, setError] = useState("");
  const [avatarChange, setAvatarChange] = useState(false);
  const [usernameChange, setUsernameChange] = useState(false);
  const { currentUser, logout, changeDisplayName, changePhotoURL } = useAuth();
  const usernameRef = useRef();
  const avatarRef = useRef();
  const history = useHistory();
  const classes = useStyles();

  const handleAvatarDrop = () => {
    setAvatarChange((prev) => !prev);
  };

  const handleUsernameDrop = () => {
    setUsernameChange((prev) => !prev);
  };

  async function handleChangeAvatar() {
    setError("");

    try {
      await changePhotoURL(avatarRef.current.value);
      history.push("/account");
    } catch {
      setError("Avatar update failed");
    }
  }

  async function handleChangeUsername() {
    setError("");

    const userRegEx = new RegExp("^[a-zA-Z0-9_-]{5,}[a-zA-Z]+[0-9]*$");

    if (!userRegEx.test(usernameRef.current.value)) {
      return setError(
        "Your username must include at least one letter and may only contain alphanumeric characters, underscores or hyphens"
      );
    }

    try {
      await changeDisplayName(usernameRef.current.value);
      history.push("/account");
    } catch {
      setError("Username update failed");
    }
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Log out failed");
    }
  }

  return (
    <Grid className={classes.accountContainer}>
      <div id="account-header" className={classes.accountHeader}>
        {error && <Alert severity="error">{error}</Alert>}
        <Box id="title" className={classes.title}>
          Your Profile
        </Box>
        <Box id="display-name" className={classes.displayName}>
          {currentUser.displayName}
        </Box>
        <div id="profile-pic">
          {currentUser.photoURL === null ? (
            <img
              className={classes.img}
              alt="stock profile"
              src={
                "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
              }
            ></img>
          ) : (
            <img
              className={classes.img}
              src={currentUser.photoURL}
              alt={`${currentUser.displayName}'s avatar`}
            ></img>
          )}
        </div>
        <FormControlLabel
          style={{ background: "white", margin: "3%" }}
          control={
            <Button variant="outlined" onClick={handleAvatarDrop}>
              Change Avatar
            </Button>
          }
        />
        <Grid container id="avatar-info">
          <Grid item xs={12}>
            <Collapse in={avatarChange} collapsedHeight={0}>
              <TextField
                style={{ background: "white", margin: "3%" }}
                name="avatar-url"
                variant="outlined"
                id="avatar-url"
                label="Avatar URL"
                size="small"
                defaultValue={currentUser.photoURL}
                inputRef={avatarRef}
              />
              <Button
                className={classes.avatarUpdate}
                variant="outlined"
                onClick={handleChangeAvatar}
              >
                Update
              </Button>
            </Collapse>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        id="account-body"
        className={classes.accountBody}
        justify="center"
      >
        <Grid item xs={12}>
          <FormControlLabel
            style={{ background: "white", margin: "3%" }}
            control={
              <Button variant="outlined" onClick={handleUsernameDrop}>
                Change Username
              </Button>
            }
          />
        </Grid>
        <Grid id="username" item xs={12}>
          <Collapse in={usernameChange} collapsedHeight={0}>
            <TextField
              style={{ background: "white", margin: "3%" }}
              name="username"
              variant="outlined"
              id="username"
              size="small"
              defaultValue={currentUser.displayName}
              inputRef={usernameRef}
            />
            <Button
              className={classes.userUpdate}
              variant="outlined"
              onClick={handleChangeUsername}
            >
              Update
            </Button>
          </Collapse>
        </Grid>
        <Grid id="pass-reset" item xs={12}>
          <Button
            style={{ background: "white", margin: "3%" }}
            variant="outlined"
            component={RouterLink}
            to="/password-reset"
          >
            Change Password
          </Button>
        </Grid>
        <Grid id="logout" item xs={12}>
          <Button
            style={{ background: "white", margin: "3%" }}
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
