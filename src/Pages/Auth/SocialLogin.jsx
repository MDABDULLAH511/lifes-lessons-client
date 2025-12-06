import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { setUser, signUpWithGoogle } = useAuth();
  //   const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast("login successfully!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <button
          onClick={handleSignInWithGoogle}
          className="py-3 px-4 rounded-lg mt-4 text-[16px] font-semibold bg-gray-200 text-black border border-[#e5e5e5]  w-full flex justify-center items-center gap-5 hover:bg-gray-300 duration-400 cursor-pointer"
        >
          <FcGoogle />
          Login with google
        </button>
      </div>

      <div class="flex justify-between items-center gap-2 py-10">
        <span class="h-0.5 w-full bg-secondary/50 block flex-1"></span>
        <span class=" text-center text-nowrap">OR</span>
        <span class="h-0.5 w-full bg-secondary/50 block flex-1"></span>
      </div>
    </div>
  );
};

export default SocialLogin;
