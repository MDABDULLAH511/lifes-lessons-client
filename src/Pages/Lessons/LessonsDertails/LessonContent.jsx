import React, { useEffect, useState } from "react";
import FeaturedImagePlaceholder from "../../../assets/lessonPlaceholder.png";
import { BsCalendar2Date } from "react-icons/bs";
import { MdCreate } from "react-icons/md";
import FavoriteButton from "./FavoriteButton";
import { FaShareAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/UseAuth";
import useAxios from "../../../Hooks/useAxios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const LessonContent = ({ lesson, refetch }) => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  //Like
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (!user) {
      setIsLiked(false);
      return;
    }

    // Check current user has liked the lesson
    const liked = lesson.likes?.includes(user.uid) || false;

    if (liked !== isLiked) {
      setIsLiked(liked);
    }
  }, [user, lesson.likes, lesson.likesCount, isLiked]);

  if (loading) {
    return <LoadingSpinner />;
  }
  
  // Handle Likes Lesson
  const handleToggleLike = async () => {
    if (!user) {
      toast.warn("Please log in to like", {
        position: "top-left",
        autoClose: 2000,
        theme: "dark",
      });
    }

    const res = await axiosSecure.patch(`/lessons/${lesson._id}/like`, {
      userId: user.uid,
    });

    if (res.data.modifiedCount) {
      setIsLiked(res.data.liked);
      refetch();
    }
  };

  // Handle Lesson Report
  const handleLessonReport = async (lessonId) => {
    //Check user
    if (!user) {
      return Swal.fire({
        title: "Login Required",
        text: "You must be logged in to report a lesson.",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });
    }

    //Get Confirmation
    const confirm = await Swal.fire({
      title: "Report this lesson?",
      text: "Are you sure you want to report this content?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Report",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    // Select Reason
    const { value: reason } = await Swal.fire({
      title: "Select a reason",
      input: "select",
      inputOptions: {
        inappropriate: "Inappropriate Content",
        hate: "Hate Speech or Harassment",
        misleading: "Misleading or False Information",
        spam: "Spam or Promotional Content",
        sensitive: "Sensitive or Disturbing Content",
        other: "Other",
      },
      inputPlaceholder: "Choose a reason",
      showCancelButton: true,
      confirmButtonText: "Submit Report",
    });

    if (!reason) return;

    //Create Data for database
    const reportData = {
      lessonId,
      reporterEmail: user.email,
      reason,
      timestamp: new Date(),
    };

    try {
      await axiosInstance.post("/reports", reportData);

      Swal.fire({
        title: "Report Submitted",
        text: "Thank you. Our team will review this lesson.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      const message = error.response?.data?.message;

      //Show backend message on frontend
      if (message === "You already reported this lesson.") {
        return Swal.fire({
          title: "Already Reported",
          text: "You already reported this lesson.",
          icon: "info",
          confirmButtonText: "OK",
          timer: 2000,
          timerProgressBar: true,
        });
      }

      // For all other errors
      Swal.fire({
        title: "Error",
        text: "Could not submit report. Try again later.",
        icon: "error",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
      {/* Lesson Title and date*/}
      <div>
        <h2 className="font-bold text-xl md:text-3xl mb-2">
          {lesson.lessonTitle}
        </h2>

        {/* Creation and Last update Date */}
        <div className="flex justify-center md:justify-start flex-wrap gap-3 text-xs md:text-sm  font-medium capitalize bg-indigo-100 text-indigo-600 px-2 py-1 md:px-3 md:py-2 w-fit rounded-sm">
          {/* Update */}
          <span className="flex gap-2 items-center numberFont">
            <MdCreate /> Last Update:{" "}
            {lesson.lastUpdatedDate
              ? new Date(lesson.lastUpdatedDate).toDateString()
              : "Not update yet!"}
          </span>

          {/* create */}
          <span className="flex gap-2 items-center numberFont">
            <BsCalendar2Date /> Created:{" "}
            {new Date(lesson.createdAt).toDateString()}
          </span>
        </div>
      </div>

      {/* Lesson Featured Image */}
      <div>
        <img
          src={
            lesson.lessonImage ? lesson.lessonImage : FeaturedImagePlaceholder
          }
          alt=""
          className="w-full h:40 md:h-125 rounded-lg"
        />
      </div>

      {/* Category | Emotional Tone |  Visibility  */}
      <div className="flex flex-wrap gap-1.5 md:gap-3 text-xs md:text-sm  font-medium capitalize">
        <span className="px-2 py-1 md:px-3 md:py-2 bg-blue-100 text-blue-600 rounded-sm">
          Category: {lesson.category}
        </span>
        <span className="px-2 py-1 md:px-3 md:py-2 bg-purple-100 text-purple-600 rounded-sm">
          Emotional Tone: {lesson.emotionalTone}
        </span>
        <span className="px-2 py-1 md:px-3 md:py-2 bg-green-100 text-green-600 rounded-sm">
          Visibility: {lesson.privacy}
        </span>
      </div>

      {/* Lesson Description */}
      <div>
        <h2 className="font-bold text-xl md:text-2xl mb-2">Description:</h2>
        <p>{lesson.lessonDesc}</p>
      </div>

      {/* Interaction Buttons */}
      <div className="mt-10 flex flex-wrap justify-between gap-5 items-center ">
        <FavoriteButton lesson={lesson} />

        {/* Like Button */}
        <button
          onClick={handleToggleLike}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 shadow-sm transition cursor-pointer"
        >
          {<span className="text-2xl">{isLiked ? "❤️" : "🤍"} </span>}
          <span className="font-medium numberFont">
            Like {lesson.likesCount}
          </span>
        </button>

        {/* Report Button */}
        <button
          onClick={() => handleLessonReport(lesson._id)}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 shadow-sm transition cursor-pointer"
        >
          <span className="text-lg">🚩</span>
          <span className="font-medium">Report</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 shadow-sm transition">
          <FaShareAlt className="text-lg" />
          <span className="font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
