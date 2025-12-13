import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { setUser, signUpWithGoogle, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);

        //Create user on database
        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        axiosSecure
          .post("/users", userInfo)
          .then(() => {
            navigate(location?.state || "/");
            toast.success("Logged in with Google! 🎉");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        // Custom error messages based on error.code
        switch (error.code) {
          case "auth/popup-closed-by-user":
            toast.error("🙋‍♂️ You closed the Google popup before signing in!");
            break;

          case "auth/cancelled-popup-request":
            toast.error("❌ Google sign-in was cancelled. Try again!");
            break;

          case "auth/network-request-failed":
            toast.error("🌐 Network error! Check your internet connection.");
            break;

          case "auth/account-exists-with-different-credential":
            toast.error(
              "⚠️ An account already exists with a different credential."
            );
            break;

          default:
            toast.error("🐾 Google sign-in failed. Please try again!");
        }
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
