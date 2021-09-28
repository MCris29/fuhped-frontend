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
    success: {
      main: "#4CAF50",
    },
    background: {
      default: "#FCFAFC",
      main: "#222329",
    },
    text: {
      main: "#222329",
      second: "#FCFAFC",
    },
  },
  border: {
    default: "10px",
    image: "5px",
  },
  opacity: {
    buttonHover: "0.8",
  },
  shadow: {
    default: "0 16px 40px -24px rgba(0, 0, 0, 0.15)",
  },
});

export default theme;
