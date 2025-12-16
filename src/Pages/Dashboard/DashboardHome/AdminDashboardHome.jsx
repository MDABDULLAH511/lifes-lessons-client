import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiUser,
  FiBookOpen,
  FiAlertCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { SiReaddotcv } from "react-icons/si";
import AdminDashboardChart from "./AdminDashboardChart";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Load total users and their created lesson count
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  // load all lessons
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  // Fetch reported lessons
  const { data: reportedLessons = [], isLoading: reportedLoading } = useQuery({
    queryKey: ["reportedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  if (usersLoading || lessonsLoading || reportedLoading) {
    return <LoadingSpinner />;
  }

  // Compute most active contributors
  const contributors = users
    .map((user) => ({
      name: user.displayName || user.email,
      totalLessons: user.totalLessons || 0,
      photo: user.photoURL,
      email: user.email,
    }))
    .sort((a, b) => b.totalLessons - a.totalLessons)
    .slice(0, 3);

  // Today’s new lessons
  const today = new Date().toLocaleDateString();
  const newLessonsToday = lessons.filter(
    (lesson) => new Date(lesson.createdAt).toLocaleDateString() === today
  );

  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl">
      {/* Page Title */}
      <div className="text-center mb-8 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-xl md:text-4xl mb-2">
          Admin Dashboard Overview
        </h2>
        <p className="font-semibold">
          Welcome back, Admin! Monitor the platform activity, track lessons,
          users, and manage content efficiently.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {/* Manage User */}
        <div className="stat bg-white shadow rounded-xl p-4">
          <div className="stat-figure text-secondary">
            <FiUser size={35} />
          </div>
          <div className="stat-title text-sm font-semibold">Total Users</div>
          <div className="stat-value numberFont my-2">{users.length}</div>
          <div className="stat-actions">
            <Link
              to="/dashboard/admin/manage-users"
              className="btn btn-sm btn-primary shadow"
            >
              Manage Users
            </Link>
          </div>
        </div>

        {/* Total Lessons */}
        <div className="stat bg-white shadow rounded-xl p-4">
          <div className="stat-figure text-secondary">
            <SiReaddotcv size={35} />
          </div>
          <div className="stat-title text-sm font-semibold">Total Lessons</div>
          <div className="stat-value numberFont my-2">{lessons.length}</div>
          <div className="stat-actions">
            <Link
              to="/dashboard/admin/manage-lessons"
              className="btn btn-sm btn-primary shadow"
            >
              Manage Lessons
            </Link>
          </div>
        </div>

        {/* Reported Lessons */}
        <div className="stat bg-white shadow rounded-xl p-4">
          <div className="stat-figure text-secondary">
            <FiAlertCircle size={35} />
          </div>
          <div className="stat-title text-sm font-semibold">
            Reported Lessons
          </div>
          <div className="stat-value numberFont my-2">
            {reportedLessons.length}
          </div>
          <div className="stat-actions">
            <Link
              to="/dashboard/admin/reported-lessons"
              className="btn btn-sm btn-primary shadow"
            >
              Review Reports
            </Link>
          </div>
        </div>

        {/* New Lessons Today */}
        <div className="stat bg-white shadow rounded-xl p-4">
          <div className="stat-figure text-secondary">
            <FiTrendingUp size={35} />
          </div>
          <div className="stat-title text-sm font-semibold">
            New Lessons Today
          </div>
          <div className="stat-value numberFont my-2">
            {newLessonsToday.length}
          </div>
          <div className="stat-actions">
            <Link
              to="/dashboard/admin/manage-lessons"
              className="btn btn-sm btn-primary shadow"
            >
              Manage Lessons
            </Link>
          </div>
        </div>
      </div>

      {/* Most Active Contributors */}
      <div className="my-20 text-center">
        <h2 className="font-bold text-xl md:text-2xl mb-5">
          Most Active Contributors
        </h2>
        <ul className="flex justify-around items-center">
          {contributors.map((bestUser, ind) => (
            <li key={ind} className="text-center">
              <Link to={`/profile/${bestUser.email}`}>
                <img
                  src={bestUser.photo}
                  alt=""
                  className="w-30 h-30 rounded-full"
                />
              </Link>
              <p className="font-semibold mt-5">{bestUser.name} </p>
              <h4 className="">
                Created Lessons:{" "}
                <span className="text-xl font-semibold">
                  {bestUser.totalLessons}
                </span>{" "}
              </h4>
            </li>
          ))}
        </ul>
      </div>

      <div></div>

      {/* Weekly Analytics Chart */}
      <div className="my-10">
        <h2 className="font-bold text-xl md:text-2xl mb-5 text-center">
          Platform-wide overview & activity monitoring
        </h2>
        <AdminDashboardChart />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
