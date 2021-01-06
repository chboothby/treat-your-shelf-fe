import "./App.css";
import React, { Component } from "react";
// import ErrorHandling from "./Components/ErrorHandling";
import { AuthProvider } from "./Contexts/UserAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import Bookshelf from "./Components/Bookshelf";
import SimpleBottomNavigation from "./Components/SimpleBottomNavigation";
import Scanner from "./Components/Scanner";
import BookDetails from "./Components/BookDetails";
import Messages from "./Components/Messages";
import Search from "./Components/Search";
import Help from "./Components/Help";
import Account from "./Components/Account";
import ButtonAppBar from "./Components/ButtonAppBar";

class App extends Component {
  state = {
    loggedInUser: null,
  };

  render() {
    const { loggedInUser } = this.state;

    return (
      <div className="App">
        {/* <Header></Header> */}

        <Router>
          <AuthProvider>
            <ButtonAppBar></ButtonAppBar>
            <Switch>
              <PrivateRoute exact path="/" component={Bookshelf} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/forgot-password" component={ForgotPassword} />

              <Router primary={false}>
                <Route path="/messages" component={Messages} />
                <Route path="/scan" component={Scanner} />
                <Route path="/book" component={BookDetails} />
                <Route path="/search" component={Search} />
                <Route path="/help" component={Help} />
                <Route path="/account" component={Account} />
              </Router>
            </Switch>
            <SimpleBottomNavigation></SimpleBottomNavigation>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
