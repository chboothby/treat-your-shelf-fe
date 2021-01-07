import { Button } from "@material-ui/core";
import React from "react";
import stockProfileImage from "../stockProfileImage.jpg";
import "./Account.css";

const Account = () => {
  return (
    <div className="account-container">
      <div className="account-header">
        <h4>Username</h4>
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
        >
          Change Password
        </Button>
        <Button
          style={{ background: "white", margin: "3%" }}
          variant="outlined"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
