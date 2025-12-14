import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { SiReaddotcv } from "react-icons/si";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RiHeartAdd2Line } from "react-icons/ri";
import LessonCard from "../../Lessons/LessonCard";
import { FiPlusCircle, FiStar, FiBookOpen, FiUser } from "react-icons/fi";
import WeeklyAnalyticsChart from "./WeeklyAnalyticsChart";

const UserDashboardHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load all Lesson by current User
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons-by-email", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);
      return res.data;
    },
  });

  //Load 2 Recent Lessons
  const limit = 2;
  const { data: recentLessons = [] } = useQuery({
    queryKey: ["lessons", user.email, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons?email=${user.email}&limit=${limit}`
      );
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

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl ">
      {/* Page Title */}
      <div className=" text-center mb-8 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-xl md:text-4xl mb-2">
          Dashboard Overview
        </h2>
        <p className="font-semibold">
          Welcome back! This is your personal dashboard where you can track your
          lesson activity, manage your saved favorites, and quickly access
          important actions.
        </p>
      </div>

      {/*User  Stat */}
      <div className="max-w-xl rounded-xl flex flex-col md:flex-row shadow mx-auto my-5">
        {/* Total lessons created */}
        <div className="stat ">
          <div className="stat-figure text-secondary">
            <SiReaddotcv size={35} />
          </div>

          <div className="stat-title text-sm font-semibold ">
            Total Lessons Created
          </div>
          <div className="stat-value numberFont my-2">{lessons.length}</div>
          <div className="stat-actions">
            <Link
              to={"/dashboard/my-lessons"}
              className="px-2 py-1 md:px-3 md:py-2 bg-green-600 text-white rounded-sm cursor-pointer hover:bg-green-800 duration-300"
            >
              All Lesson
            </Link>
          </div>
        </div>

        {/* Total saved (favorites) */}
        <div className="stat ">
          <div className="stat-figure text-secondary">
            <RiHeartAdd2Line size={35} />
          </div>

          <div className="stat-title text-sm font-semibold ">
            Total Added Favorites
          </div>
          <div className="stat-value numberFont my-2">{favorites.length}</div>
          <div className="stat-actions">
            <Link
              to={"/dashboard/my-favorites"}
              className="px-2 py-1 md:px-3 md:py-2 bg-green-600 text-white rounded-sm cursor-pointer hover:bg-green-800 duration-300"
            >
              All Favorites
            </Link>
          </div>
        </div>
      </div>

      {/* Quick shortcuts  */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {/* Create Lesson */}
        <Link
          to="/dashboard/add-lesson"
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white hover:bg-primary/5 transition shadow-sm"
        >
          <FiPlusCircle size={26} className="text-primary" />
          <span className="font-semibold text-sm">Create Lesson</span>
        </Link>

        {/* Favorites */}
        <Link
          to="/dashboard/my-favorites"
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white hover:bg-primary/5 transition shadow-sm"
        >
          <FiStar size={26} className="text-primary" />
          <span className="font-semibold text-sm">Favorites</span>
        </Link>

        {/* My Lessons */}
        <Link
          to="/dashboard/my-lessons"
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white hover:bg-primary/5 transition shadow-sm"
        >
          <FiBookOpen size={26} className="text-primary" />
          <span className="font-semibold text-sm">My Lessons</span>
        </Link>

        {/* Profile */}
        <Link
          to="/dashboard/profile"
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white hover:bg-primary/5 transition shadow-sm"
        >
          <FiUser size={26} className="text-primary" />
          <span className="font-semibold text-sm">Profile</span>
        </Link>
      </div>

      {/* Recenty Lesson and Chart */}
      <div className="flex flex-col lg:flex-row gap-5 md:gap-10 mt-10">
        {/* Recent Lessons */}
        <div className="flex-1">
          <div>
            <h2 className="font-bold text-xl md:text-2xl mb-5 pb-1">
              Recent Lessons
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {recentLessons.map((lesson, ind) => (
              <LessonCard key={ind} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* weekly analytics  */}
        <div className="flex-1">
          <div>
            <h2 className="font-bold text-xl md:text-2xl mb-5 pb-1">
              Weekly Analytics
            </h2>
          </div>

          <div className="">
            <WeeklyAnalyticsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
