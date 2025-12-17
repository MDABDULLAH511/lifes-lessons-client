import React, { useRef, useState } from "react";
import userIcon from "../../../assets/user.png";
import { useQuery } from "@tanstack/react-query";
import { FaCrown } from "react-icons/fa";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Container from "../../../Components/Container";
import LessonCard from "../../Lessons/LessonCard";
import useUserStatus from "../../../Hooks/useUserStatus";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AdminProfile = () => {
  const { user, setUser, updateUserProfile, setLoading } = useAuth();
  const { isPremium } = useUserStatus();
  const axiosSecure = useAxiosSecure();
  const updateModal = useRef();
  const [viewImage, setViewImage] = useState();

  // react Hook Form
  const { register, handleSubmit } = useForm();

  // Load User
  const {
    refetch,
    data: currentUsers = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  const currentUser = currentUsers[0];

  // Load all Lesson by current User
  const { data: lessons = [], isLoading: currentUserLoading } = useQuery({
    queryKey: ["lessons-by-email", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);
      return res.data;
    },
  });

  // Load total saved (Favorites) by User
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?userEmail=${user.email}`);
      return res.data;
    },
  });

  //Update profile Modal Open Handler
  const openUpdateProfileModal = () => {
    setViewImage(currentUser.photoURL);
    updateModal.current.showModal();
  };

  // Update Profile Handler
  const handleUpdateProfile = async (data) => {
    //store the image and get the Photo url
    let profileImage = "";
    const selectedFile = data.profileImg?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      await axios.post(imageAPI_URL, formData).then((res) => {
        const photoURL = res.data.data.url;
        profileImage = photoURL;
      });
    }

    const profilePhoto = profileImage || currentUser.photoURL;

    const updateProfileData = {
      displayName: data.name,
      photoURL: profilePhoto,
      profileBio: data.profileBio,
    };

    updateUserProfile(updateProfileData)
      .then(() => {
        setUser({ ...user, displayName: data.name, photoURL: profilePhoto });
        axiosSecure
          .patch(`/users?email=${user.email}`, updateProfileData)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: "Your profile has been updated successfully.",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
              });
            }
          });
      })
      .catch((error) => {
        setLoading(false);
      });

    updateModal.current.close();
  };

  if (isLoading || currentUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-15 md:py-20 grid grid-cols-12 gap-y-5 md:gap-10">
          {/* Left Side (Profile)*/}

          <div className="col-span-12 lg:col-span-4 space-y-5 md:space-y-10">
            <div className="sticky top-24 space-y-5 md:space-y-10">
              <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5 flex flex-col items-center gap-5">
                {/* Author Image */}
                <div className="relative">
                  <img
                    tabIndex={0}
                    src={currentUser.photoURL ? currentUser.photoURL : userIcon}
                    alt=""
                    className={`w-35 h-35 rounded-full bg-primary cursor-pointer${
                      user.photoURL ? "p-0.5" : "p-1.5"
                    }`}
                  />

                  <button
                    onClick={openUpdateProfileModal}
                    className="cursor-pointer absolute -bottom-1 -right-2 "
                  >
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip="Edit Profile"
                    >
                      <BiSolidMessageSquareEdit size={30} color="#f6b900" />
                    </div>
                  </button>
                </div>

                {/* User Type */}
                <div>
                  {isPremium === true ? (
                    <span class="flex gap-2 items-center font-bold text-secondary/80">
                      <FaCrown size={20} color="#4681f7" />
                      Premium User
                    </span>
                  ) : (
                    <span className="font-bold text-secondary/80 text-center">
                      Free User
                    </span>
                  )}
                </div>

                {/* Name, Email, Total Lesson, Total Favorites, About */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between font-semibold">
                    <h5>Name:</h5>
                    <h5>{currentUser.displayName}</h5>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <h5>Email:</h5>
                    <h5>{currentUser.email}</h5>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <h5>Total created lesson:</h5>
                    <h5 className="numberFont">{lessons.length}</h5>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <h5>Total favorites lesson:</h5>
                    <h5 className="numberFont">{favorites.length}</h5>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2 mt-5">About Me:</h5>
                    {currentUser.profileBio ? (
                      <p>{currentUser.profileBio}</p>
                    ) : (
                      <p>
                        This user is an active member of our learning community.
                        They share insights, explore new lessons, and continue
                        to grow through meaningful learning experiences.
                        Depending on their activity and contributions, their
                        profile may include published lessons, saved favorites,
                        feedback, and other interactions within the platform.
                        Whether they are a learner, creator, or both, this
                        profile represents their journey of knowledge,
                        creativity, and personal development.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side  (Lessons)*/}
          <div className="col-span-12 lg:col-span-8 space-y-5 md:space-y-10">
            <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5 ">
              <div>
                <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1">
                  All created lesson
                </h2>
              </div>

              {/* All Lesson created by this Author */}
              <div className="grid md:grid-cols-2  gap-6">
                {lessons.map((lesson, index) => (
                  <LessonCard key={index} lesson={lesson} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/*Update profile popup modal */}
      <dialog ref={updateModal} className="modal modal-middle">
        <div className="modal-box  max-w-xl">
          <div className="bg-accent/5  p-2 md:p-5 rounded-xl ">
            {/* Page Title */}
            <div className=" text-center mb-8">
              <h2 className="font-bold text-xl md:text-2xl mb-2">
                Update Profile
              </h2>
            </div>

            {/* Form to Update profile */}
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <fieldset className="fieldset text-[16px]">
                {/* Image */}
                {/* <label className="label">Image</label>
                <input
                  type="file"
                  {...register("photo")}
                  className="file-input w-full  file:bg-primary  file:text-white"
                  placeholder="photo"
                /> */}

                {/* Profile Image */}
                <div className="flex flex-col md:flex-row mt-6 gap-5 items-center relative">
                  <div>
                    <label className="labelFileImgPro">
                      <IoCloudUploadOutline
                        size={30}
                        className="bg-white p-1 rounded-full"
                      />

                      <input
                        type="file"
                        className="inputImgPro "
                        {...register("profileImg", {
                          onChange: (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setViewImage(URL.createObjectURL(file));
                            }
                          },
                        })}
                      />
                    </label>
                  </div>

                  {/* Show selected Img */}
                  <div className="absolute -z-1">
                    {viewImage && (
                      <img
                        src={viewImage}
                        alt=""
                        className="h-[150px] w-[150px] rounded-full object-cover object-center"
                      />
                    )}
                  </div>
                </div>

                {/* Name */}
                <label className="label mt-5">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input w-full"
                  defaultValue={currentUser.displayName}
                  placeholder="Name"
                />

                {/* Profile Bio */}
                <label className="label mt-5">Profile Bio</label>
                <textarea
                  className="textarea h-30! w-full"
                  defaultValue={currentUser.profileBio}
                  placeholder="Type your story"
                  {...register("profileBio")}
                />

                <button className="py-3 px-4 rounded-lg mt-6 text-[16px] bg-primary font-semibold cursor-pointer text-white mb-3">
                  Update
                </button>
              </fieldset>
            </form>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn border-0 shadow bg-[#e03233] text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminProfile;
