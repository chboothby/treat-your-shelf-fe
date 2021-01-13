import "./CSS/App.css";
import React from "react";
import { AuthProvider } from "./Contexts/UserAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import PasswordReset from "./Components/PasswordReset";
import Bookshelf from "./Components/Bookshelf";
import SimpleBottomNavigation from "./Components/SimpleBottomNavigation";
import Scanner from "./Components/Scanner";
import BookDetails from "./Components/BookDetails";
import Messages from "./Components/Messages";
import Search from "./Components/Search";
import Help from "./Components/Help";
import Account from "./Components/Account";
import ButtonAppBar from "./Components/ButtonAppBar";
import LogOutPage from "./Components/LogOutPage";
import EmailVerifyNotice from "./Components/EmailVerifyNotice";
import IndividualChat from "./Components/IndividualChat";
import { ThemeProvider } from "@material-ui/core";
import theme from "./Contexts/Theme";
import Exchanges from "./Components/Exchanges";

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <ButtonAppBar></ButtonAppBar>
            <Switch>
              <PrivateRoute exact path="/" component={Bookshelf} />
              <Route
                path="/users/:owner_id/books"
                component={Bookshelf}
              ></Route>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/password-reset" component={PasswordReset} />
              <PrivateRoute path="/messages" component={Messages} />
              <PrivateRoute path="/message" component={IndividualChat} />
              <PrivateRoute path="/scan" component={Scanner} />
              <Route path="/books/:book_id" component={BookDetails} />
              <Route path="/search" component={Search} />
              <Route path="/help" component={Help} />
              <PrivateRoute path="/account" component={Account} />
              <Route path="/loggedout" component={LogOutPage}></Route>
              <PrivateRoute path="/exchanges" component={Exchanges} />
              <PrivateRoute
                path="/email-verify"
                component={EmailVerifyNotice}
              ></PrivateRoute>
            </Switch>
            <SimpleBottomNavigation></SimpleBottomNavigation>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}
