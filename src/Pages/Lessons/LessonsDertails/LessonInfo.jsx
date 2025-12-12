import React from "react";
import lessonAds from "../../../assets/lessonAds.png";
import creatorPlaceholderImage from "../../../assets/user2.png";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";

const LessonInfo = ({ lesson }) => {
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

  console.log(user[0]?._id);

  // Load lesson by creator
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", createdBy],
    queryFn: async () => {
      const res = await axiosInstance.get(`/lessons?email=${createdBy}`);
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
              <strong>Likes:</strong> 870
            </li>
            <li className="numberFont">
              <strong>Favorites:</strong> 220
            </li>
            <li className="numberFont">
              <strong>Views:</strong> 5.4k
            </li>
            <li>
              <strong>Visibility:</strong> Public
            </li>
            <li>
              <strong>Access Level:</strong> Free
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
