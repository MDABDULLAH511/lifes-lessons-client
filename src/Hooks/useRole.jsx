import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: isPremium = false } = useQuery({
    queryKey: ["user-isPremium", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user.email}/isPremium`);
      return result.data?.isPremium || false;
    },
  });

  return { isPremium, roleLoading };
};

export default useRole;
