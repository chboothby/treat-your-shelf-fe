import React, { useState } from "react";
import { Button } from "@material-ui/core";
import stockProfileImage from "../stockProfileImage.jpg";
import "./Account.css";
import { useAuth } from "../Contexts/UserAuth";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function Account() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/loggedout");
    } catch {
      setError("Log out failed");
    }
  }

  return (
    <div className="account-container">
      <div className="account-header">
        <h2>{currentUser.displayName}'s Profile</h2>
        <img src={stockProfileImage}></img>
        <Button
          style={{ background: "white", margin: "3%" }}
          variant="outlined"
        >
          Change Avatar
        </Button>
      </div>
      <div className="account-settings">
        <Button
          style={{ background: "white", margin: "3%" }}
          variant="outlined"
        >
          Change Username
        </Button>
        <Button
          style={{ background: "white", margin: "3%" }}
          variant="outlined"
          component={RouterLink}
          to="/password-reset"
        >
          Change Password
        </Button>
        <Button
          style={{ background: "white", margin: "3%" }}
          variant="outlined"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
