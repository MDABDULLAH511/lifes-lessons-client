import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AdminProfile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h2>Admin Profile {user.displayName}</h2>
    </div>
  );
};

export default AdminProfile;
