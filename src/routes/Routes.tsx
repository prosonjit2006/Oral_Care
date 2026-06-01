import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/user/Home"));
const Service = lazy(() => import("../pages/user/Service"));
const Team = lazy(() => import("../pages/user/Team"));
const Subscription = lazy(() => import("../pages/user/Subscription"));
const ContactUs = lazy(() => import("../pages/user/ContactUs"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Booking = lazy(() => import("../pages/user/Booking"));

const PlanManage = lazy(() => import("../pages/admin/PlanManage"));
const Patient = lazy(() => import("../pages/admin/Patient"));
const ServicesManage = lazy(() => import("../pages/admin/ServicesManage"));

import ErrorBoundary from "../pages/ErrorBoundary";
import UserWrapper from "../layout/user/UserWrapper";
import AdminWrapper from "../layout/admin/AdminWrapper";
import Dashboard from "../pages/admin/Dashboard";
// import ServicesManage from "../pages/admin/ServicesManage";
import AppointmentManage from "../pages/admin/AppointmentManage";
// import PlanManage from "../pages/admin/PlanManage";
import UsersManage from "../pages/admin/UsersManage";
import SystemSettings from "../pages/admin/SystemSettings";
import ScrollToTop from "../components/ScrollToTop";
import AdminProtected from "../components/AdminProtected";
// import Patient from "../pages/admin/Patient";
import Feedback from "../pages/admin/Feedback";
import Query from "../pages/admin/Query";
import Doctor from "../pages/admin/Doctor";
import Profile from "../pages/user/Profile";
// import Signup from "../pages/Signup";
// import Login from "../pages/Login";
// import Booking from "../pages/user/Booking";
// import AuthRedirectGuards from "../components/AuthRedirectGuards";

// fallback UI
const Loader = () => (
  <div className="h-screen flex items-center justify-center text-red-600">
    Loading...
  </div>
);

const Routes = createBrowserRouter([
  // {
  //   path: "/signup",
  //   element: <AuthRedirectGuards />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Signup />,
  //     },
  //   ],
  //   errorElement: <ErrorBoundary />,
  // },
  // {
  //   path: "/login",
  //   element: <AuthRedirectGuards />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Login />,
  //     },
  //   ],
  //   errorElement: <ErrorBoundary />,
  // },

  // {
  //   path: "/booking",
  //   element: <Booking />,
  //   errorElement: <ErrorBoundary />,
  // },
  {
    path: "/booking",
    element: (
      <Suspense fallback={<Loader />}>
        <Booking />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/admin",
        element: <AdminWrapper />,
        children: [
          {
            // index: true,
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "patient",
            element: (
              <Suspense fallback={<Loader />}>
                <Patient />
              </Suspense>
            ),
          },
          {
            path: "servicesmanage",
            element: (
              <Suspense fallback={<Loader />}>
                <ServicesManage />
              </Suspense>
            ),
          },
          {
            path: "appointmentmanage",
            element: <AppointmentManage />,
          },
          {
            path: "planmanage",
            element: (
              <Suspense fallback={<Loader />}>
                <PlanManage />
              </Suspense>
            ),
          },
          // {
          //   path: "planmanage",
          //   element: <PlanManage />,
          // },
          {
            path: "doctor",
            element: <Doctor />,
          },
          {
            path: "usersmanage",
            element: <UsersManage />,
          },
          {
            path: "feedback",
            element: <Feedback />,
          },
          {
            path: "query",
            element: <Query />,
          },
          {
            path: "systemsettings",
            element: <SystemSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <UserWrapper />
        <ScrollToTop />
      </>
    ),
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
