import "./App.css";
import React, { Component } from "react";

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
          <Nav-bar />
          <Router>
            <ErrorHandling
              default
              errorMsg="This isn't the page you're looking for..."
            />
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
