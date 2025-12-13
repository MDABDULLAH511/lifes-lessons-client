import React from "react";
import Container from "../../Components/Container";
import SocialLogin from "./SocialLogin";
import registerPageImage from "../../assets/registerpageimg.jpg";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/UseAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { setUser, registerUser, updateUserProfile, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const navigate = useNavigate();

  // react Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImage = data.photo && data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        //store the image and get the Photo url
        const formData = new FormData();
        formData.append("image", profileImage);
        const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(imageAPI_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          //Create user on database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure
            .post("/users", userInfo)
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });

          // Update User Profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              toast.success("Account created successfully! 🎉");
              navigate(location.state || "/");
            })
            .catch((error) => {
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("📧 This email is already registered. Try logging in!");
            break;

          case "auth/invalid-email":
            toast.error("❌ The email address format looks invalid.");
            break;

          case "auth/missing-password":
            toast.error("⚠️ Please enter your password before continuing.");
            break;

          case "auth/user-not-found":
            toast.error(
              "🙈 No account found with this email. Please sign up first."
            );
            break;

          case "auth/wrong-password":
            toast.error("🚫 Incorrect password. Please try again!");
            break;

          case "auth/too-many-requests":
            toast.error(
              "🕒 Too many attempts! Please wait and try again later."
            );
            break;

          case "auth/network-request-failed":
            toast.error(
              "🌐 Network error. Please check your internet connection."
            );
            break;

          case "auth/invalid-credential":
            toast.error(
              "❗Invalid credentials. Please check your email and password."
            );
            break;

          case "auth/popup-closed-by-user":
            toast.error("🙋‍♂️ Login popup closed before finishing. Try again!");
            break;

          case "auth/operation-not-allowed":
            toast.error(
              "🚷 This sign-in method is not allowed. Contact support."
            );
            break;

          default:
            toast.error("🐾 Something went wrong. Please try again later!");
        }
        setLoading(false);
      });
  };

  return (
    <Container>
      <div className="flex flex-col lg:flex-row justify-between items-center py-5 lg:py-0">
        {/* Login Form */}
        <div className="py-20 flex-1">
          <div className="max-w-sm mx-auto">
            <div className="mb-8 text-center">
              <h2 className="font-semibold text-3xl lg:text-[42px]">
                Create<span className="text-primary"> Account.</span>
              </h2>
              <p>
                Join us and begin capturing your life lessons with clarity and
                purpose.
              </p>
            </div>

            {/* Login With Google Button */}
            <SocialLogin />

            <form onSubmit={handleSubmit(handleRegistration)}>
              <fieldset className="fieldset text-[16px]">
                {/* Image */}
                <label className="label">Image</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input w-full  file:bg-primary  file:text-white"
                  placeholder="photo"
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-600">Photo is required</p>
                )}

                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input w-full"
                  placeholder="Name"
                />

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input w-full"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600">Email is required</p>
                )}

                {/* Password */}
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\;:'",.<>/?`~]).{6,}$/,
                  })}
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password?.type == "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    {" "}
                    Password must include uppercase, lowercase, number & special
                    character (min 6 chars)
                  </p>
                )}

                <button className="py-3 px-4 rounded-lg mt-4 text-[16px] bg-primary font-semibold cursor-pointer text-white mb-3">
                  Register
                </button>

                <div>
                  <p>
                    Already have an account?
                    <Link
                      state={location.state}
                      className="text-primary font-bold"
                      to="/login"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>

        {/* Login Page Image */}
        <div className="flex-1">
          <img src={registerPageImage} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Register;
