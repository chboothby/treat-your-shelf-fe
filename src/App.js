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

import Header from "./Components/Header";
import Bookshelf from "./Components/Bookshelf";
import SimpleBottomNavigation from "./Components/SimpleBottomNavigation";
import { Router } from "@reach/router";
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
            <Switch>
              <PrivateRoute exact path="/" component={Bookshelf} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
      <ButtonAppBar></ButtonAppBar>
        <Router primary={false}>
          <Bookshelf path="/"></Bookshelf>
          <Scanner path="/scan"></Scanner>
          <BookDetails path="/book"></BookDetails>
          <Messages path="/messages"></Messages>
          <Search path="/search"></Search>
          <Help path="/help"></Help>
          <Account path="/account"></Account>
        </Router>
        <SimpleBottomNavigation></SimpleBottomNavigation>
            </Switch>
          </AuthProvider>
        </Router>

      </div>
    );
  }
}

export default App;
