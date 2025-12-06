import React from "react";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";

const UpgradeMembership = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: users = [] } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handlePayment = async () => {
    const userInfo = {
      email: users[0].email,
      _id: users[0]._id,
    };
    console.log("Hello User", userInfo);
    // Then send it
    const res = await axiosSecure.post("/create-checkout-session", userInfo);
    window.location.assign(res.data.url);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={handlePayment} className="btn btn-primary text-white">
        Upgrade to Premium
      </button>
    </div>
  );
};

export default UpgradeMembership;
