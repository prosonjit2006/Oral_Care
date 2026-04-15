import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    background: {
      default: '#f9a825"',
      // paper: "#ffeb3b",
    },
  },
  typography: {
    // fontFamily: 'cursive',
    h4: {
      fontWeight: 'bold'
    }
  },
  shape: {
    borderRadius: '7px'
  },
  components: {
    MuiContainer: {
      
    },
  },
});

export default Theme;
