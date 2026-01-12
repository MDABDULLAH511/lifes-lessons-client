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
    setValue,
    formState: { errors },
  } = useForm();
  const { setUser, singInUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Demo users
  const demoUser = {
    email: "demouser@example.com",
    password: "demouser@E11",
  };

  const demoAdmin = {
    email: "demoadmin@example.com",
    password: "demoadmin@E11",
  };

  // Demo login handlers
  const handleDemoLogin = (user) => {
    // Fill form fields
    setValue("email", user.email);
    setValue("password", user.password);

    singInUser(user.email, user.password)
      .then((result) => {
        setUser(result.user);
        toast.success(
          ` ${user === demoUser ? "Demo User" : "Demo Admin"} login successful!`
        );
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(" Demo login failed. Please try again.");
        console.error(error);
        setLoading(false);
      });
  };

  const handleLogin = (data) => {
    singInUser(data.email, data.password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error("❌ Login failed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <Container>
      <div className="flex flex-col lg:flex-row justify-between items-center py-5 lg:py-0">
        {/* Login Form */}
        <div className="py-20 flex-1 items-center">
          <div className="max-w-sm mx-auto">
            <div className="mb-8 text-center">
              <h2 className="font-semibold text-3xl lg:text-[42px]">
                Welcome <span className="text-primary">Back!</span>
              </h2>
              <p>Please sign in to continue to your dashboard.</p>
            </div>

            {/* Login With Google */}
            <SocialLogin />

            {/* Demo Buttons */}
            <div className="flex gap-3 justify-between mb-8">
              <button
                type="button"
                onClick={() => handleDemoLogin(demoUser)}
                className="py-2 px-4 rounded-sm text-[16px] bg-gray-500 font-bold cursor-pointer text-white hover:bg-gray-600 transition"
              >
                Demo User Login
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin(demoAdmin)}
                className="py-2 px-4 rounded-sm text-[16px] bg-blue-500 font-bold cursor-pointer text-white hover:bg-blue-600 transition"
              >
                Demo Admin Login
              </button>
            </div>

            {/* Normal Login Form */}
            <form onSubmit={handleSubmit(handleLogin)} className="mt-4">
              <fieldset className="fieldset text-[16px]">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}

                <label className="label mt-2">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500">Password is required</p>
                )}

                <Link className="underline mt-2 inline-block">
                  Forget Password?
                </Link>

                <button
                  type="submit"
                  className="py-3 px-4 rounded-lg mt-4 text-[16px] bg-primary font-bold cursor-pointer text-white w-full"
                >
                  Login
                </button>

                <p className="mt-3">
                  Don't have any account?
                  <Link
                    state={location?.state}
                    className="text-primary font-bold ml-1"
                    to="/register"
                  >
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>

        {/* Login Page Image */}
        <div className="flex-1">
          <img src={loginPageImage} alt="Login Page" className="w-full" />
        </div>
      </div>
    </Container>
  );
};

export default Login;
