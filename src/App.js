import "./App.css";
import React, { Component } from "react";
// import ErrorHandling from "./Components/ErrorHandling";
import { AuthProvider } from "./Contexts/UserAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Bookshelf from "./Components/Bookshelf";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";

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

    {
      /* value={{ loggedInUser, login: this.login, logout: this.logout }} */
    }

    return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Bookshelf} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
