import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AdminDashboardHome = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h2>Admin Dashboard Home {user.displayName}</h2>
    </div>
  );
};

export default AdminDashboardHome;
