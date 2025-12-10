import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import LoadingSpinner from "../Components/LoadingSpinner";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddLesson from "../Pages/Dashboard/AddLesson";
import UpgradeMembership from "../Pages/UpgradeMembership/UpgradeMembership";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MyLessons from "../Pages/Dashboard/MyLessons";
import MyFavorites from "../Pages/Dashboard/MyFavorites";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile/DashboardProfile";
import ManageUsers from "../Pages/Dashboard/OnlyAdmin/ManageUsers";
import ManageLessons from "../Pages/Dashboard/OnlyAdmin/ManageLessons";
import ReportedLessons from "../Pages/Dashboard/OnlyAdmin/ReportedLessons";
import Settings from "../Pages/Dashboard/Settings";
import PublicLessons from "../Pages/Lessons/PublicLessons";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },
      {
        path: "upgrade-membership",
        element: (
          <PrivateRoutes>
            <UpgradeMembership />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "public-lessons",
        Component: PublicLessons,
      },
    ],
  },

  //========== Dashboard Router ====================//
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },

      {
        path: "add-lesson",
        Component: AddLesson,
      },

      {
        path: "profile",
        Component: DashboardProfile,
      },
      {
        path: "my-lessons",
        Component: MyLessons,
      },
      {
        path: "my-favorites",
        Component: MyFavorites,
      },
      {
        path: "settings",
        Component: Settings,
      },

      /* ========== Admin Access Only ========== */
      {
        path: "admin/manage-users",
        Component: ManageUsers,
      },
      {
        path: "admin/manage-lessons",
        Component: ManageLessons,
      },
      {
        path: "admin/reported-lessons",
        Component: ReportedLessons,
      },
    ],
  },
]);

export default router;
