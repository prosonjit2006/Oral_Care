import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./theme/Theme";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { Store } from "./store/store";

const App = () => {
  return (
    <>
      <Provider store={Store}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Toaster position="top-right" richColors closeButton />
          <RouterProvider router={Routes} />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
