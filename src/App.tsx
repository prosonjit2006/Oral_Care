import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Service from "./pages/Service";
// import Team from "./pages/Team";
// import Subscription from "./pages/Subscription";
// import ContactUs from "./pages/ContactUs";
import {ThemeProvider} from "@mui/material"

const App = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={Routes} />
      </ThemeProvider>
      {/* <BrowserRouter>
        <Navbar />
        <Footer />
      </BrowserRouter> */}

      {/* <Home /> */}
      {/* <Service /> */}
      {/* <Team /> */}
      {/* <Subscription /> */}
      {/* <ContactUs /> */}
    </>
  );
};

export default App;
