import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./theme/Theme";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Toaster position="top-right" richColors closeButton />
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </>
  );
};

export default App;
