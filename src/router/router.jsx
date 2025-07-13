import { createBrowserRouter } from "react-router";
import RootLayOut from "../layouts/RootLayOut";
import Home from "../pages/home/Home";
import AuthLayOut from "../layouts/AuthLayOut";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Apartment from "../pages/apartment/Apartment";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../Dashboard/MyProfile";
import DashboardHome from "../Dashboard/DashboardHome";
import Announcements from "../Dashboard/Announcements";
import Forbidden from "../forbidden-page/Forbidden";
import AdminProfile from "../Dashboard/Admin/AdminProfile";
import ManageMembers from "../Dashboard/Admin/ManageMembers";
import MakeAnnouncement from "../Dashboard/Admin/MakeAnnouncement";
import AgreementRequests from "../Dashboard/Admin/AgreementRequests";
import ManageCoupons from "../Dashboard/Admin/ManageCoupons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "apartment",
        element: <Apartment />,
      },
      {
        path:"forbidden",
        Component:Forbidden
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayOut />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path:"manageMembers",
        element:<ManageMembers />
      },
      {
        path:"agreementRequests",
        element:<AgreementRequests />
      },
      {
        path:"makeAnnouncement",
        element:<MakeAnnouncement />
      },
      {
        path:"manageCoupons",
        element:<ManageCoupons />
      },
      {
        path:"adminProfile",
        element:<AdminProfile />
      }
    ],
  },
]);
