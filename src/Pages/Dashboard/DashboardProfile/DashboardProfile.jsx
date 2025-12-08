import React from "react";
import useUserStatus from "../../../Hooks/useUserStatus";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";

const DashboardProfile = () => {
  const { role, userLoading } = useUserStatus();

  if (userLoading) {
    return <LoadingSpinner />;
  }
  if (role === "admin") {
    return <AdminProfile />;
  } else {
    return <UserProfile />;
  }
};

export default DashboardProfile;
