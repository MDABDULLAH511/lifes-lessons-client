import React from "react";
import useAuth from "../Hooks/UseAuth";
import useUserStatus from "../Hooks/useUserStatus";
import NotFound from "../Pages/Error/NotFound";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, userLoading } = useUserStatus();

  if (loading || userLoading) {
    return <LoadingSipper />;
  }

  if (role !== "admin") {
    return <NotFound/>
  }
  return children;
};

export default AdminRoute;
