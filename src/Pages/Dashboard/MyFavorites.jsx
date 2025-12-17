import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaTrashCan } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FiRefreshCcw } from "react-icons/fi";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [emotionalTone, setEmotionalTone] = useState("");

  // Load Favorites data with Lesson details using aggregate API Also filter by  category and emotionalTone
  const { refetch, data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email, category, emotionalTone],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`, {
        params: {
          category,
          emotionalTone,
        },
      });
      return res.data;
    },
  });

  // Make a user Friendly table (Control Lesson Tile length)
  const limitWords = (text) => {
    return text?.length > 20 ? text.slice(0, 30) + "..." : text;
  };

  // Handle delete item from favorites
  const favoritesDelete = (lessonId) => {
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
        axiosSecure
          .delete("/favorites", {
            data: { lessonId, userEmail: user.email },
          })
          .then((res) => {
            refetch();
            toast("Removed from favorites");
          });
      }
    });
  };

  // Handle reset filder
  const handleResetFilters = () => {
    setCategory("");
    setEmotionalTone("");
  };

  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl">
      {/* Page Title */}
      <div className=" text-center mb-10 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-xl md:text-4xl">My Favorites</h2>
        <p className="font-semibold my-3">
          Your personal collection of life lessons you’ve saved to revisit
          anytime. You can remove a lesson from favorites anytime without
          affecting the original content.
        </p>
        {favorites.length != 0 ? (
          <h4 className="text-xl font-semibold">
            You’ve added
            <span className="numberFont font-bold text-white mx-2 h-5 w-5 bg-primary px-2 rounded-sm">
              {favorites.length}
            </span>{" "}
            lessons. Nice choices!
          </h4>
        ) : (
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mt-10">
              You haven’t saved any lessons yet.
            </h4>

            <Link to={"/public-lessons"} className="button-main">
              Browse Public Lessons
            </Link>
          </div>
        )}
      </div>

      <div className="flex gap-4 max-w-2xl mb-10">
        {/* Category */}
        <select
          className="select w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Category </option>
          <option value="personalGrowth"> Personal Growth </option>
          <option value="career"> Career </option>
          <option value="relationships"> Relationships </option>
          <option value="mindset"> Mindset </option>
          <option value="mistakesLearned"> Mistakes Learned </option>
        </select>

        {/* Emotional Tone */}
        <select
          className="select w-full"
          value={emotionalTone}
          onChange={(e) => setEmotionalTone(e.target.value)}
        >
          <option value="">All Emotions</option>
          <option value="sad"> Sad </option>
          <option value="gratitude"> Gratitude </option>
          <option value="motivational"> Motivational </option>
          <option value="realization"> Realization </option>
        </select>

        {(category || emotionalTone) && (
          <button
            onClick={handleResetFilters}
            className=" flex items-center gap-2 cursor-pointer px-5 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-[#eef5f3] border-[#d9e7e3] hover:bg-[#e7f0ff] hover:border-[#4582f3] hover:text-[#4582f3]"
          >
            <FiRefreshCcw size={14} />
            Reset
          </button>
        )}
      </div>

      {/* Page Content */}
      <div className="overflow-x-auto">
        <table className="table table-zebra my-custom-zebra">
          {/* Table head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson Name</th>
              <th>Category</th>
              <th>Emotional</th>
              <th>Visibility </th>
              <th>Access Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Lesson Item */}
            {favorites.map((item, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <Link
                  to={`/lessons/${item.lesson._id}`}
                  className="hover:underline"
                >
                  {limitWords(item.lesson.lessonTitle)}
                </Link>
                <td className="capitalize">{item.lesson.category}</td>
                <td className="capitalize">{item.lesson.emotionalTone}</td>
                <td className="capitalize">{item.lesson.privacy}</td>
                <td className="capitalize">{item.lesson.accessLevel}</td>

                {/* View / Delete */}
                <td className="flex gap-3">
                  {/* view */}
                  <Link
                    to={`/lessons/${item.lesson._id}`}
                    className="actionBtn tooltip"
                    data-tip="View Details"
                  >
                    <TbReportSearch size={18} />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => favoritesDelete(item.lessonId)}
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
    </div>
  );
};

export default MyFavorites;
