import React from "react";
import lessonPlaceholderImage from "../../assets/lessonPlaceholder.png";
import creatorPlaceholderImage from "../../assets/user2.png";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useUserStatus from "../../Hooks/useUserStatus";
import LoadingSpinner from "../../Components/LoadingSpinner";

const LessonCard = ({ lesson }) => {
  const axiosInstance = useAxios();
  const { isPremium, userLoading } = useUserStatus();
  const {
    _id,
    lessonImage,
    lessonTitle,
    lessonDesc,
    category,
    emotionalTone,
    accessLevel,
    createdAt,
    createdBy,
  } = lesson;

  //Load Creator Data
  const { data: user = [] } = useQuery({
    queryKey: ["users", createdBy],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${createdBy}`);
      return res.data;
    },
  });

  // Make a user Friendly  (Control Lesson Description length)
  const limitWords = (text, words) => {
    return text?.length > words ? text.slice(0, words) + "..." : text;
  };

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative bg-white shadow rounded-xl p-4 w-full border border-gray-50">
      {/* Premium Blur Overlay  */}
      {isPremium === false && accessLevel === "paid" && (
        <div
          className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-10"
          aria-hidden="true"
        >
          <span className="text-gray-700 font-semibold flex flex-col items-center gap-2">
            {/* <p>Premium Lesson – Upgrade to view</p> */}
            <Link to={"/upgrade-membership"} class="buttonMembership">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
              </svg>
              Upgrade Membership
            </Link>
          </span>
        </div>
      )}

      <img
        src={lessonImage ? lessonImage : lessonPlaceholderImage}
        className="w-full h-50 object-cover object-center rounded-lg"
      />
      <div className="mt-3 flex flex-wrap gap-2 text-xs capitalize">
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-sm">
          {category}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-sm">
          {emotionalTone}
        </span>
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-sm">
          {accessLevel}
        </span>
      </div>
      <h3 className="text-lg font-bold mt-3">{limitWords(lessonTitle, 20)}</h3>
      <p className="text-secondary/60 text-sm mt-1">
        {limitWords(lessonDesc, 80)}
      </p>
      <div className="flex gap-3 items-center my-4 pt-4 border-t border-gray-200">
        <img
          src={user[0]?.photoURL ? user[0].photoURL : creatorPlaceholderImage}
          className="w-12 h-12 rounded-sm border border-primary"
        />
        <div>
          <p className="font-semibold text-secondary text-sm">
            {user[0]?.displayName ? user[0].displayName : "Admin"}
          </p>
          <p className="text-secondary/60 text-sm numberFont">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Link
        to={`/lessons/${_id}`}
        className="mt-4 w-full block text-center bg-primary text-white font-medium py-2 rounded-sm hover:bg-[#225ccf] duration-300"
      >
        See Details
      </Link>
    </div>
  );
};

export default LessonCard;
