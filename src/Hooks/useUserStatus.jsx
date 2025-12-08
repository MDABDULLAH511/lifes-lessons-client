import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: userLoading, data: userStatus } = useQuery({
    queryKey: ["userStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/status`);
      return res.data;
    },
  });

  const isPremium = userStatus?.isPremium || false;
  const role = userStatus?.role || "user";

  return { isPremium, role, userLoading };
};

export default useUserStatus;
