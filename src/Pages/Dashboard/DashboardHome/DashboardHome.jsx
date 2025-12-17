import React from "react";
import useUserStatus from "../../../Hooks/useUserStatus";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import useAuth from "../../../Hooks/UseAuth";

const DashboardHome = () => {
  const { role, userLoading } = useUserStatus();
  const { loading } = useAuth();

  if (userLoading || loading) {
    return <LoadingSpinner />;
  }

  if (role === "admin") {
    return <AdminDashboardHome />;
  } else {
    return <UserDashboardHome />;
  }
};

export default DashboardHome;
