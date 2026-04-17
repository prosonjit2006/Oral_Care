import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Service = lazy(() => import("../pages/Service"));
const Team = lazy(() => import("../pages/Team"));
const Subscription = lazy(() => import("../pages/Subscription"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const NotFound = lazy(() => import("../pages/NotFound"));

import ErrorBoundary from "../pages/ErrorBoundary";
import UserWrapper from "../layout/user/UserWrapper";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AdminWrapper from "../layout/admin/AdminWrapper";
import Dashboard from "../pages/admin/Dashboard";
import ServicesManage from "../pages/admin/ServicesManage";
import AppointmentManage from "../pages/admin/AppointmentManage";
import PlanManage from "../pages/admin/PlanManage";
import UsersManage from "../pages/admin/UsersManage";
import SystemSettings from "../pages/admin/SystemSettings";

// fallback UI
const Loader = () => (
  <div className="h-screen flex items-center justify-center text-red-600">
    Loading...
  </div>
);

const Routes = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin",
    element: <AdminWrapper />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        // index: true,
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "servicesmanage",
        element: <ServicesManage />,
      },
      {
        path: "appointmentmanage",
        element: <AppointmentManage />,
      },
      {
        path: "planmanage",
        element: <PlanManage />,
      },
      {
        path: "usersmanage",
        element: <UsersManage />,
      },
      {
        path: "systemsettings",
        element: <SystemSettings />,
      },
    ],
  },
  {
    path: "/",
    element: <UserWrapper />,
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
