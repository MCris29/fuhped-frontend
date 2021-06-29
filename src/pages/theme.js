import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#AD92B8",
      second: "#855E96",
      third: "#544160",
    },
    secondary: {
      main: "#DC6C41",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FCFAFC"',
    },
    text: {
      main: "#222329",
    },
  },
});

export default theme;
