import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Link } from "@reach/router";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
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
  );
}