import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { Link } from "react-router";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [filters, setFilters] = useState({
    category: "",
    visibility: "",
    flagged: "",
  });

  //Load all lesson and filtering data
  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["lessons", filters],
    queryFn: async () => {
      let query = "";
      if (filters.category) query += `category=${filters.category}&`;
      if (filters.visibility) query += `privacy=${filters.visibility}&`;
      if (filters.flagged) query += `flagged=${filters.flagged}&`;

      const res = await axiosSecure.get(`/lessons?${query}`);
      return res.data;
    },
  });

  // Handle reset filter
  const handleResetFilters = () => {
    setFilters({
      category: "",
      visibility: "",
      flagged: "",
    });
  };

  if (isLoading) return <LoadingSpinner />;

  // ===== Admin Actions =====
  //handle featured toggle
  const handleToggleFeatured = async (lesson) => {
    const newStatus = !lesson.featured;
    const res = await axiosSecure.patch(
      `/admin/lessons/${lesson._id}/featured`,
      {
        featured: newStatus,
      }
    );
    if (res.data.modifiedCount) {
      refetch();
      toast.success(
        `Lesson ${newStatus ? "marked as Featured" : "unfeatured"}`
      );
    }
  };

  // Handle mark reviewed
  const handleMarkReviewed = async (lesson) => {
    const newStatus = !lesson.reviewed;
    const res = await axiosSecure.patch(
      `/admin/lessons/${lesson._id}/reviewed`,
      {
        reviewed: newStatus,
      }
    );
    if (res.data.modifiedCount) {
      refetch();
      toast.success(
        `Lesson marked as ${newStatus ? "Reviewed" : "Not Reviewed"}`
      );
    }
  };

  //Handle delete lesson
  const handleDeleteLesson = async (lessonId) => {
    Swal.fire({
      title: "Delete this lesson?",
      text: "This will permanently remove the lesson, all reports, and related favorites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/lessons/${lessonId}`);
        if (res.data.lessonDeleted) {
          refetch();
          Swal.fire("Deleted!", "Lesson removed successfully.", "success");
        }
      }
    });
  };

  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl">
      {/* Page Title & Stats */}
      <div className="text-center mb-10 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-2xl md:text-4xl">Manage Lessons</h2>
        <p className="my-3 font-semibold">
          Admin dashboard to moderate lessons and keep the platform clean.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          className="select select-bordered"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="personalGrowth">Personal Growth</option>
          <option value="career">Career</option>
          <option value="relationships">Relationships</option>
          <option value="mindset">Mindset</option>
          <option value="mistakesLearned">Mistakes Learned</option>
        </select>

        <select
          className="select select-bordered"
          value={filters.visibility}
          onChange={(e) =>
            setFilters({ ...filters, visibility: e.target.value })
          }
        >
          <option value="">All Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          className="select select-bordered"
          value={filters.flagged}
          onChange={(e) => setFilters({ ...filters, flagged: e.target.value })}
        >
          <option value="">All Lessons</option>
          <option value="flagged">Flagged</option>
        </select>

        {(filters.category || filters.visibility || filters.flagged) && (
          <button
            onClick={handleResetFilters}
            className=" flex items-center gap-2 cursor-pointer px-5 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-[#eef5f3] border-[#d9e7e3] hover:bg-[#e7f0ff] hover:border-[#4582f3] hover:text-[#4582f3]"
          >
            <FiRefreshCcw size={14} />
            Clear Filter
          </button>
        )}
      </div>

      {/* Lessons Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full my-custom-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Featured</th>
              <th>Reports</th>
              <th>Reviewed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="hover:underline"
                  >
                    {lesson.lessonTitle}
                  </Link>
                </td>
                <td className="capitalize">{lesson.category}</td>
                <td className="capitalize"> {lesson.privacy}</td>
                {/* Featured */}
                <td>
                  <button
                    onClick={() => handleToggleFeatured(lesson)}
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={18}
                      color={lesson.featured ? "gold" : "gray"}
                    />
                  </button>
                </td>
                <td className="numberFont">{lesson.reportsCount || 0}</td>

                <td>{lesson.reviewed ? "Yes" : "No"}</td>

                {/* Reviewed & Delete*/}
                <td className="flex gap-2">
                  <button
                    onClick={() => handleMarkReviewed(lesson)}
                    className="btn btn-xs bg-[#02a952] border-none text-white shadow-none"
                  >
                    Mark Reviewed
                  </button>

                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="btn btn-xs bg-red-600 border-none text-white shadow-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
