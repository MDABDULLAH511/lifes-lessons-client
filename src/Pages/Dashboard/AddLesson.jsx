import React, { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useUserStatus from "../../Hooks/useUserStatus";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const AddLesson = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isPremium, userLoading } = useUserStatus();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate();
  const [viewImage, setViewImage] = useState();

  if (userLoading || loading) {
    return <LoadingSpinner />;
  }

  const handleAddLesson = async (data) => {
    //store the image and get the Photo url
    let lessonImage = "";
    const selectedFile = data.lessonImg?.[0];

    // Upload only if image exists
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      await axios.post(imageAPI_URL, formData).then((res) => {
        const photoURL = res.data.data.url;
        lessonImage = photoURL;
      });
    }

    // Save the Lesson to the data base

    const lessonData = {
      ...data,
      lessonImage,
      createdBy: user.email,
    };

    await axiosSecure.post("/lessons", lessonData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Lesson Created Successfully");
      }
    });

    // Reset the form
    reset();
    setViewImage(null);
  };

  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl ">
      {/* Page Title */}
      <div className=" text-center mb-8 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-xl md:text-4xl mb-2">Add A Lesson</h2>
        <p className="font-semibold">
          Create a meaningful lesson from your life and turn your experiences
          into guidance for others.
        </p>
      </div>

      {/* Form to create a lesson */}
      <form onSubmit={handleSubmit(handleAddLesson)} className="text-black!">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
          {/* Left Side Lesson Title And Description */}
          <div>
            <fieldset className="fieldset">
              {/* Lesson Tile */}
              <label className="label label2">Lesson Tile</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Type your lesson title"
                {...register("lessonTitle", { required: true })}
              />
              {errors.lessonTitle?.type === "required" && (
                <p className="text-red-500">Add a lesson title</p>
              )}

              {/* Category  */}
              <label className="label label2">Category</label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("category", { required: true })}
              >
                <option value="" disabled={true}>
                  Select Category
                </option>
                <option value="personalGrowth"> Personal Growth </option>
                <option value="career"> Career </option>
                <option value="relationships"> Relationships </option>
                <option value="mindset"> Mindset </option>
                <option value="mistakesLearned"> Mistakes Learned </option>
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500">Select a category</p>
              )}

              {/* Emotional Tone  */}
              <label className="label label2">Emotional Tone</label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("emotionalTone", { required: true })}
              >
                <option value="" disabled={true}>
                  Select A Emotional Tone
                </option>
                <option value="sad"> Sad </option>
                <option value="gratitude"> Gratitude </option>
                <option value="motivational"> Motivational </option>
                <option value="realization"> Realization </option>
              </select>
              {errors.emotionalTone?.type === "required" && (
                <p className="text-red-500">Select a emotional tone</p>
              )}

              {/*Lesson Privacy   */}
              <label className="label label2">Lesson Privacy</label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("privacy", { required: true })}
              >
                <option value="" disabled={true}>
                  Select Lesson Privacy
                </option>
                <option value="public"> Public </option>
                <option value="private">Private</option>
              </select>
              {errors.privacy?.type === "required" && (
                <p className="text-red-500">Select lesson privacy</p>
              )}

              {/*Access Level */}
              <label className="label label2">Access Level </label>
              <select
                defaultValue=""
                className="select w-full"
                {...register("accessLevel", { required: true })}
              >
                <option value="" disabled={true}>
                  Select Access Level
                </option>
                <option value="free">Free</option>
                <option
                  value="paid"
                  disabled={!isPremium}
                  className={!isPremium ? "tooltip tooltip-right" : ""}
                  data-tip={
                    !isPremium
                      ? "Upgrade to Premium to create paid lessons."
                      : ""
                  }
                >
                  Paid
                </option>
              </select>
              {errors.accessLevel?.type === "required" && (
                <p className="text-red-500">Select access level </p>
              )}
            </fieldset>
          </div>

          {/* Right Side Lesson others Filed */}
          <div>
            <fieldset className="fieldset flex flex-col-reverse md:flex-col">
              {/*Lesson Images Input and show */}
              <div className="flex flex-col md:flex-row mt-6 gap-5 items-center">
                {/* Lesson Image */}
                <div>
                  <label className="labelFileImg">
                    <IoCloudUploadOutline size={40} />

                    <p>Select an image to visually represent your lesson.</p>
                    {/* <input
                      className="inputImg"
                      type="file"
                      {...register("lessonImg")}
                    /> */}
                    <input
                      type="file"
                      className="inputImg"
                      {...register("lessonImg", {
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
                <div>
                  {viewImage && (
                    <img
                      src={viewImage}
                      alt=""
                      className="h-50 w-50 object-cover object-center rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Lesson Description  */}
              <div>
                <label className="label label2">Lesson Description</label>
                <textarea
                  className="textarea h-50! w-full"
                  placeholder="Type your story"
                  {...register("lessonDesc", { required: true })}
                />
                {errors.lessonDesc?.type === "required" && (
                  <p className="text-red-500">Write your story</p>
                )}
              </div>
            </fieldset>
          </div>
        </div>
        {/* Form Submit Button */}
        <div className="text-center">
          <input
            type="submit"
            value="Create a new life lesson"
            className="button-main"
          />
        </div>
      </form>
    </div>
  );
};

export default AddLesson;
