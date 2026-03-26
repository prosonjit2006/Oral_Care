import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Service from "../pages/Service";
import Team from "../pages/Team";
import Subscription from "../pages/Subscription";
import ContactUs from "../pages/ContactUs";
import HomeWrapper from "../layout/Home/HomeWrapper";
import ErrorBoundary from "../pages/ErrorBoundary";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeWrapper />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Service />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
    ],
  },
  
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/err",
    element: <ErrorBoundary />,
    
  }
]);

export default Routes;
