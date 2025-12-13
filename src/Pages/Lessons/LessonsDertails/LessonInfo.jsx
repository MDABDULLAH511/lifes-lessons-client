import React from "react";
import lessonAds from "../../../assets/lessonAds.png";
import creatorPlaceholderImage from "../../../assets/user2.png";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";

//Make random number for views
const views = Math.floor(Math.random() * 10000);
const formattedViews = views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views;

const LessonInfo = ({ lesson, favorites }) => {
  const axiosInstance = useAxios();
  const { createdBy } = lesson;

  //Load Creator Data
  const { data: user = [] } = useQuery({
    queryKey: ["users", createdBy],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${createdBy}`);
      return res.data;
    },
  });

  // Load all public Lesson by Creator
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons-by-email", createdBy],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons?email=${createdBy}&privacy=public`
      );
      return res.data;
    },
  });

  return (
    <div className="sticky top-24 space-y-5 md:space-y-10">
      {/* Stats & Engagement */}
      <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
            Stats & Engagement
          </h2>
        </div>
        <div>
          <ul className="space-y-2 text-gray-700">
            <li className="numberFont">
              <strong>Likes:</strong> {lesson.likesCount}k
            </li>
            <li className="numberFont">
              <strong>Favorites:</strong> {favorites.length}
            </li>
            <li className="numberFont">
              <strong>Views:</strong> {formattedViews}
            </li>
            <li className="capitalize">
              <strong>Visibility:</strong> {lesson.privacy}
            </li>
            <li className="capitalize">
              <strong>Access Level:</strong> {lesson.accessLevel}
            </li>
          </ul>
        </div>
      </div>

      {/* Author Info */}
      <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
            Author Info
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={user[0]?.photoURL ? user[0].photoURL : creatorPlaceholderImage}
            className="w-18 h-18 rounded-lg shadow"
          />
          <div>
            <p className="font-semibold text-gray-900">
              {user[0]?.displayName ? user[0].displayName : "Unknown"}
            </p>
            <p className="text-gray-500 text-sm numberFont">
              Total Lessons Created: {lessons.length}
            </p>
            <Link
              to={`/profile/${createdBy}`}
              className="text-blue-600 hover:underline text-sm mt-1"
            >
              View all lessons →
            </Link>
          </div>
        </div>
      </div>

      {/* Lesson Ads Image */}
      <div>
        <img src={lessonAds} alt="" className="w-full rounded-lg shadow" />
      </div>
    </div>
  );
};

export default LessonInfo;
