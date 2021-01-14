import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import { Link } from "react-router-dom";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useAuth } from "../Contexts/UserAuth";
const useStyles = makeStyles({
  root: {
    width: "100vw",
    maxWidth: "1200px",
    position: "fixed",
    bottom: 0,
    margin: "0 auto",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { currentUser } = useAuth();
  console.log(currentUser === null);

  return (
    <>
      {currentUser === null ? (
        <> </>
      ) : (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Bookshelf"
            icon={<MenuBookIcon />}
          />

          <BottomNavigationAction
            component={Link}
            to="/search"
            label="Search"
            icon={<SearchIcon />}
          />

          <BottomNavigationAction
            component={Link}
            to="/exchanges"
            label="Exchanges"
            icon={<AutorenewIcon />}
          />

          <BottomNavigationAction
            component={Link}
            to="/messages"
            label="Messages"
            icon={<ChatIcon />}
          />
          {/* <BottomNavigationAction
        component={Link}
        to="/help"
        label="Help"
        icon={<HelpOutlineIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/account"
        label="Account"
        icon={<AccountBoxIcon />}
      /> */}
        </BottomNavigation>
      )}
    </>
  );
}
