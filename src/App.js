import "./App.css";
import React, { Component } from "react";
import { Router } from "@reach/router";
import ErrorHandling from "./Components/Error-handling";
import { UserContext } from "../src/Contexts/User";

class App extends Component {
  state = {
    loggedInUser: null,
  };

  login = (user) => {
    this.setState({ loggedInUser: user });
  };

  logout = () => {
    this.setState({ loggedInUser: null });
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <UserContext.Provider
        value={{ loggedInUser, login: this.login, logout: this.logout }}
      >
        <div className="App">
          {/* <Router>
            <ErrorHandling default errorMsg="ERROR" />
          </Router> */}
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
