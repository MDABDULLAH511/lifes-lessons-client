import React from "react";
import lessonPlaceholderImage from "../../assets/lessonPlaceholder.png";
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../../Components/LoadingSpinner";

const MostSavedLessonCard = ({ lesson }) => {
  const axiosInstance = useAxios();
  const {
    _id,
    lessonImage,
    lessonTitle,
    lessonDesc,
    createdAt,
    createdBy,
    favoritesCount,
  } = lesson;

  //Load Creator Data
  const { data: user = [], isLoading } = useQuery({
    queryKey: ["users", createdBy],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${createdBy}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Make a user Friendly  (Control Lesson Description length)
  const limitWords = (text, words) => {
    return text?.length > words ? text.slice(0, words) + "..." : text;
  };

  return (
    <div className="relative bg-white shadow rounded-xl w-full border border-gray-50">
      <img
        src={lessonImage ? lessonImage : lessonPlaceholderImage}
        className="w-full h-50 object-cover object-center rounded-t-lg "
      />

      <div className="p-4">
        <div className="mt-3 flex flex-wrap gap-2 text-xs capitalize ">
          <span className="bg-blue-100 text-blue-600  px-2 py-1 rounded-sm flex gap-2 items-center text-[16px] numberFont">
            <IoMdHeart size={22} color="red" /> favorites {favoritesCount}
          </span>
        </div>

        <Link to={`/lessons/${_id}`}>
          <h3 className="text-lg font-bold mt-3">
            {limitWords(lessonTitle, 20)}
          </h3>
        </Link>
        <p className="text-secondary/60 text-sm mt-1">
          {limitWords(lessonDesc, 80)}
        </p>

        <div className="flex justify-between gap-3 items-center my-4 pt-4 border-t border-gray-200">
          <p className="font-semibold text-secondary text-sm">
            {user[0]?.displayName ? user[0].displayName : "Admin"}
          </p>
          <p className="text-secondary/60 text-sm numberFont">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MostSavedLessonCard;
