import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const UserProfile = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>User Profile {user.displayName}</h2>
    </div>
  );
};

export default UserProfile;
