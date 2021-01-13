import React, { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import "../CSS/Account.css";
import { useAuth } from "../Contexts/UserAuth";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function Account() {
  const [error, setError] = useState("");
  const [avatarChange, setAvatarChange] = useState(false);
  const [usernameChange, setUsernameChange] = useState(false);
  const { currentUser, logout, changeDisplayName, changePhotoURL } = useAuth();
  const usernameRef = useRef();
  const avatarRef = useRef();
  const history = useHistory();

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
    <Grid className="account-container">
      <div className="account-header">
        {error && <Alert severity="error">{error}</Alert>}
        <h2>{currentUser.displayName}'s Profile</h2>
        {currentUser.photoURL ? (
          <img src={currentUser.photoURL} alt="User avatar"></img>
        ) : (
          <img
            alt="stock profile"
            src={
              "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
            }
          ></img>
        )}

        <FormControlLabel
          style={{ background: "white", margin: "3%" }}
          control={
            <Button variant="outlined" onClick={handleAvatarDrop}>
              Change Avatar
            </Button>
          }
        />
        <Grid container>
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
                style={{ background: "white", margin: "3%" }}
                variant="outlined"
                onClick={handleChangeAvatar}
              >
                Update
              </Button>
            </Collapse>
          </Grid>
        </Grid>
      </div>
      <Grid container className="account-body" justify="center">
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
        <Grid item xs={12}>
          <Collapse in={usernameChange} collapsedHeight={0}>
            <TextField
              style={{ background: "white", margin: "3%" }}
              name="username"
              variant="outlined"
              id="username"
              label="Username"
              size="small"
              defaultValue={currentUser.displayName}
              inputRef={usernameRef}
            />
            <Button
              style={{ background: "white", margin: "3%" }}
              variant="outlined"
              onClick={handleChangeUsername}
            >
              Update
            </Button>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{ background: "white", margin: "3%" }}
            variant="outlined"
            component={RouterLink}
            to="/password-reset"
          >
            Change Password
          </Button>
        </Grid>
        <Grid item xs={12}>
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
