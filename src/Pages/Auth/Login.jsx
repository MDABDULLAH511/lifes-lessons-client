import React from "react";
import Container from "../../Components/Container";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import loginPageImage from "../../assets/loginpageimg.jpg";
import useAuth from "../../Hooks/UseAuth";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, singInUser, setLoading } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    singInUser(data.email, data.password)
      .then((result) => {
        setUser(result.user);
        toast.success("✅ Login successful!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("❌ Please enter a valid email address.");
            break;

          case "auth/user-not-found":
            toast.error("🙁 No account found with this email.");
            break;

          case "auth/wrong-password":
          case "auth/invalid-credential":
          case "auth/invalid-login-credentials":
            toast.error("❌ Invalid email or password. Please try again.");
            break;

          case "auth/too-many-requests":
            toast.error("🚫 Too many attempts. Try again later.");
            break;

          default:
            toast.error("⚠️ Login failed. Please try again.");
        }
        setLoading(false);
      });
  };

  return (
    <Container>
      <div className="flex justify-between items-center">
        {/* Login Form */}
        <div className="py-20 flex-1 items-center">
          <div className="max-w-sm mx-auto">
            <div className="mb-8 text-center">
              <h2 className="font-semibold text-[42px]">
                Welcome <span className="text-primary">Back!</span>
              </h2>
              <p>Please sign in to continue to your dashboard.</p>
            </div>

            {/* Login With Google Button */}
            <SocialLogin />

            <form onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset text-[16px]">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input w-full"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}

                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}

                {/* Submit Button */}
                <div>
                  <Link className="underline">Forget Password?</Link>
                </div>

                <button className="py-3 px-4 rounded-lg mt-4 text-[16px] bg-primary font-bold cursor-pointer text-white mb-3">
                  Login
                </button>

                {/* Go to register */}
                <div>
                  <p>
                    Don't have any account?
                    <Link
                      state={location?.state}
                      className="text-primary font-bold"
                      to="/register"
                    >
                      {" "}
                      Register
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>

        {/* Login Page Image */}
        <div className="flex-1">
          <img src={loginPageImage} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Login;
