import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const UserDashboardHome = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h2>User Dashboard Home {user.displayName}</h2>
    </div>
  );
};

export default UserDashboardHome;
