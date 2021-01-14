import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2C4A41",
      dark: "#18331D",
      light: "#6A8680",
      contrastText: "#F0EFEB",
    },
    secondary: {
      main: "#FAF9F4",
      contrastText: "#2C4A41",
    },
  },
});

export default theme;
