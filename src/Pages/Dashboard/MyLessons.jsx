import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import useUserStatus from "../../Hooks/useUserStatus";

const MyLessons = () => {
  const { user } = useAuth();
  const { isPremium } = useUserStatus();
  const axiosSecure = useAxiosSecure();
  const lessonModalRef = useRef();
  const [viewImage, setViewImage] = useState();
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load Lesson from DB
  const { refetch, data: lessons = [] } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);
      return res.data;
    },
  });

  // Make a user Friendly table (Control Lesson Tile length)
  const limitWords = (text) => {
    return text.length > 20 ? text.slice(0, 30) + "..." : text;
  };

  //Delete Lesson Handler
  const handleDeleteLesson = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
          if (res.data.deletedCount) {
            //Update the Data in UI
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your lesson has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  //Update Lesson Modal Open Handler
  const openUpdateLessonModal = (lesson) => {
    setSelectedLessonId(lesson._id);
    reset({
      lessonTitle: lesson.lessonTitle,
      category: lesson.category,
      emotionalTone: lesson.emotionalTone,
      privacy: lesson.privacy,
      accessLevel: lesson.accessLevel,
      lessonImage: lesson.lessonImage,
      lessonDesc: lesson.lessonDesc,
    });
    setViewImage(lesson.lessonImage);
    lessonModalRef.current.showModal();
  };

  //Update Lesson Handler
  const handleUpdateLesson = (data) => {
    const updateLessonData = {
      lessonTitle: data.lessonTitle,
      category: data.category,
      emotionalTone: data.emotionalTone,
      privacy: data.privacy,
      accessLevel: data.accessLevel,
      lessonImage: data.lessonImage,
      lessonDesc: data.lessonDesc,
    };

    axiosSecure
      .patch(`/lessons/${selectedLessonId}`, updateLessonData)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Updated!",
            text: "Your lesson has been updated successfully.",
            icon: "success",
          });
        }
      });
    lessonModalRef.current.close();
  };

  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl">
      {/* Page Title */}
      <div className=" text-center mb-10 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-xl md:text-4xl">My Lessons</h2>
        <p className="font-semibold my-3">
          Manage all the life lessons you've created. Edit, update visibility,
          change access levels, or delete lessons directly from here. Stay
          organized and keep your reflections up-to-date.
        </p>
        {lessons.length != 0 ? (
          <h4 className="text-xl font-semibold">
            You’ve created a total of{" "}
            <span className="numberFont font-bold text-white mx-2 h-5 w-5 bg-primary px-2 rounded-sm">
              {lessons.length}
            </span>{" "}
            lessons. Keep going!
          </h4>
        ) : (
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mt-10">
              No lessons found. Add a new lesson to get started.
            </h4>

            <Link to={"/dashboard/add-lesson"} className="button-main">
              Add A Lesson
            </Link>
          </div>
        )}
      </div>

      {/* Page Content */}
      <div className="overflow-x-auto">
        <table className="table table-zebra my-custom-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson Name</th>
              <th>Category</th>
              <th>Visibility </th>
              <th>Access Level</th>
              <th>Stats </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Lesson Item */}
            {lessons.map((lesson, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{limitWords(lesson.lessonTitle)}</td>
                <td className="capitalize">{lesson.category}</td>
                <td>{lesson.privacy}</td>
                <td>{lesson.accessLevel}</td>
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-3">
                  {/* view */}
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="actionBtn tooltip"
                    data-tip="View Details"
                  >
                    <TbReportSearch size={18} />
                  </Link>
                  {/* Update */}
                  <button
                    onClick={() => openUpdateLessonModal(lesson)}
                    className="actionBtn tooltip"
                    data-tip="Edit"
                  >
                    <FiEdit size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="actionBtn tooltip"
                    data-tip="Delete"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Update Lesson popup modal */}
      <dialog ref={lessonModalRef} className="modal modal-middle">
        <div className="modal-box  max-w-5xl">
          <div className="bg-accent/5  p-2 md:p-5 rounded-xl ">
            {/* Page Title */}
            <div className=" text-center mb-8">
              <h2 className="font-bold text-xl md:text-2xl mb-2">
                Update Lesson
              </h2>
            </div>

            {/* Form to create a lesson */}
            <form
              onSubmit={handleSubmit(handleUpdateLesson)}
              className="text-black!"
            >
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
                      <option value="mistakesLearned"> Mistakes Learned</option>
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

                          <p>
                            Select an image to visually represent your lesson.
                          </p>
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
                  value="Update Your lesson"
                  className="button-main"
                />
              </div>
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

export default MyLessons;
