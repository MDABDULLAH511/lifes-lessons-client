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
import UserProfile from "../Pages/Dashboard/DashboardProfile/UserProfile";

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
    ],
  },

  //============================= Dashboard Router
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
        path: "my-lessons",
        Component: MyLessons,
      },
      {
        path: "my-favorites",
        Component: MyFavorites,
      },
      {
        path: "user-profile",
        Component: UserProfile,
      },
    ],
  },
]);

export default router;
