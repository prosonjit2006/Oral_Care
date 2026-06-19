import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// * User pages
const Home = lazy(() => import("../pages/user/Home"));
const Service = lazy(() => import("../pages/user/Service"));
const Team = lazy(() => import("../pages/user/Team"));
const Subscription = lazy(() => import("../pages/user/Subscription"));
const ContactUs = lazy(() => import("../pages/user/ContactUs"));
const Profile = lazy(() => import("../pages/user/Profile"));
const Booking = lazy(() => import("../pages/user/Booking"));

// * Misc pages
const NotFound = lazy(() => import("../pages/NotFound"));
const Payments = lazy(() => import("../pages/Payments"));

// * Admin pages
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const PlanManage = lazy(() => import("../pages/admin/PlanManage"));
const Patient = lazy(() => import("../pages/admin/Patient"));
const ServicesManage = lazy(() => import("../pages/admin/ServicesManage"));
const AppointmentManage = lazy(
  () => import("../pages/admin/AppointmentManage"),
);
const UsersManage = lazy(() => import("../pages/admin/UsersManage"));
const SystemSettings = lazy(() => import("../pages/admin/SystemSettings"));
const Feedback = lazy(() => import("../pages/admin/Feedback"));
const Query = lazy(() => import("../pages/admin/Query"));
const Doctor = lazy(() => import("../pages/admin/Doctor"));

// * Layouts / wrappers / guards (kept eager — small and needed immediately)
import ErrorBoundary from "../pages/ErrorBoundary";
import UserWrapper from "../layout/user/UserWrapper";
import AdminWrapper from "../layout/admin/AdminWrapper";
import ScrollToTop from "../components/ScrollToTop";
import AdminProtected from "../components/AdminProtected";
import UserProtected from "../components/UserProtected";
import PaymentProtected from "../components/PaymentProtected";
import Loading from "../pages/Loading";
import PaymentSuccess from "../pages/PaymentSuccess";

// * Small helper so every lazy route gets the same fallback consistently
const withLoading = (element: React.ReactNode) => (
  <Suspense fallback={<Loading />}>{element}</Suspense>
);

const Routes = createBrowserRouter([
  {
    path: "/payment",
    element: <PaymentProtected />,
    children: [
      {
        index: true,
        element: withLoading(<Payments />),
      },
    ],
  },
  {
    path: "paymentsuccess",
    element: withLoading(<PaymentSuccess />),
  },
  {
    path: "/booking",
    element: <PaymentProtected />,
    children: [
      {
        index: true,
        element: withLoading(<Booking />),
      },
    ],
  },
  {
    path: "/profile",
    element: <UserProtected />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: withLoading(<Profile />),
      },
    ],
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
            path: "dashboard",
            element: withLoading(<Dashboard />),
          },
          {
            path: "patient",
            element: withLoading(<Patient />),
          },
          {
            path: "servicesmanage",
            element: withLoading(<ServicesManage />),
          },
          {
            path: "appointmentmanage",
            element: withLoading(<AppointmentManage />),
          },
          {
            path: "planmanage",
            element: withLoading(<PlanManage />),
          },
          {
            path: "doctor",
            element: withLoading(<Doctor />),
          },
          {
            path: "usersmanage",
            element: withLoading(<UsersManage />),
          },
          {
            path: "feedback",
            element: withLoading(<Feedback />),
          },
          {
            path: "query",
            element: withLoading(<Query />),
          },
          {
            path: "systemsettings",
            element: withLoading(<SystemSettings />),
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
        element: withLoading(<Home />),
      },
      {
        path: "/services",
        element: withLoading(<Service />),
      },
      {
        path: "/team",
        element: withLoading(<Team />),
      },
      {
        path: "/subscription",
        element: withLoading(<Subscription />),
      },
      {
        path: "/contactus",
        element: withLoading(<ContactUs />),
      },
    ],
  },
  {
    path: "*",
    element: withLoading(<NotFound />),
  },
]);

export default Routes;
