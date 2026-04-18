import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: '#f9a825"',
      // paper: "#ffeb3b",
    },
  },
  typography: {
    // fontFamily: 'cursive',
    h4: {
      fontWeight: "bold",
    },
  },
  shape: {
    borderRadius: "7px",
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#fff",
          borderColor: "rgba(255,255,255,0.2)",
        },
        head: {
          color: "#fff",
          fontWeight: 600,
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        },
      },
    },
  },
});

export default Theme;
