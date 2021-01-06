import "./App.css";
import React, { Component } from "react";

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

  login = (user) => {
    this.setState({ loggedInUser: user });
  };

  logout = () => {
    this.setState({ loggedInUser: null });
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        {/* <Header></Header> */}
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

        {/* // <UserContext.Provider
        //   value={{ loggedInUser, login: this.login, logout: this.logout }}
        // >
        //   <div className="App">
        //     <Nav-bar />
        //     <Router>
        //       <ErrorHandling
        //         default
        //         errorMsg="This isn't the page you're looking for..."
        //       />
        //     </Router>
        //   </div>
        // </UserContext.Provider> */}
      </div>
    );
  }
}

export default App;
