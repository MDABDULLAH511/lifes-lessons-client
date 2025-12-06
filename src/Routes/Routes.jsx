import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import LoadingSpinner from "../Components/LoadingSpinner";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddLesson from "../Pages/Lessons/AddLesson";
import UpgradeMembership from "../Pages/UpgradeMembership/UpgradeMembership";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";

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
        path: "add-lesson",
        element: (
          <PrivateRoutes>
            <AddLesson />
          </PrivateRoutes>
        ),
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
]);

export default router;
