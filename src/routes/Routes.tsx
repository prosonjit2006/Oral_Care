import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Service = lazy(() => import("../pages/Service"));
const Team = lazy(() => import("../pages/Team"));
const Subscription = lazy(() => import("../pages/Subscription"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const NotFound = lazy(() => import("../pages/NotFound"));
import HomeWrapper from "../layout/user/HomeWrapper";
import ErrorBoundary from "../pages/ErrorBoundary";

// fallback UI
const Loader = () => (
  <div className="h-screen flex items-center justify-center">Loading...</div>
);

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeWrapper />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/services",
        element: (
          <Suspense fallback={<Loader />}>
            <Service />
          </Suspense>
        ),
      },
      {
        path: "/team",
        element: (
          <Suspense fallback={<Loader />}>
            <Team />
          </Suspense>
        ),
      },
      {
        path: "/subscription",
        element: (
          <Suspense fallback={<Loader />}>
            <Subscription />
          </Suspense>
        ),
      },
      {
        path: "/contactus",
        element: (
          <Suspense fallback={<Loader />}>
            <ContactUs />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default Routes;
