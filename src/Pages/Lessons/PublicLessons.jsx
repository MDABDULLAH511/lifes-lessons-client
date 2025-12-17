import React, { useEffect, useState } from "react";
import heroBG from "../../assets/public_lesson_hero_bg.jpg";
import Container from "../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiRefreshCcw } from "react-icons/fi";
import LessonCard from "./LessonCard";
import LoadingSpinner from "../../Components/LoadingSpinner";

const PublicLessons = () => {
  const axiosInstance = useAxios();
  // Filters
  const [filters, setFilters] = useState({
    category: "",
    emotionalTone: "",
  });
  // Search
  const [searchText, setSearchText] = useState("");
  // Sort
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // Pagination
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);

  //  Fetch lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons", filters, searchText, sort, order, skip, limit],

    queryFn: async () => {
      let query = `privacy=public&sort=${sort}&order=${order}`;

      if (filters.category) {
        query += `&category=${filters.category}`;
      }

      if (filters.emotionalTone) {
        query += `&emotionalTone=${filters.emotionalTone}`;
      }

      if (searchText) {
        query += `&search=${searchText}`;
      }
      if (limit) {
        query += `&limit=${limit}`;
      }
      if (skip) {
        query += `&skip=${skip}`;
      }

      const res = await axiosInstance.get(`/lessons?${query}`);
      return res.data;
    },
  });

  const { data: countData = 0 } = useQuery({
    queryKey: ["lesson-count"],
    queryFn: async () => {
      const res = await axiosInstance.get("/lessons/count?privacy=public");
      return res.data.count;
    },
  });

  const totalPages = Math.ceil(countData / limit);
  const currentPage = Math.floor(skip / limit);

  //  Reset filters
  const handleResetFilters = () => {
    setFilters({ category: "", emotionalTone: "" });
    setSearchText("");
    setSort("createdAt");
    setOrder("desc");
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Public lesson page Banner */}
      <div
        className="relative w-full h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBG})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <h2 className="font-bold text-xl md:text-4xl">All Public Lessons</h2>
          <p className="mt-3 text-center max-w-xl">
            Discover meaningful life lessons shared by people around the world.
          </p>
        </div>
      </div>

      <Container>
        <div className="py-20 space-y-10">
          {/* Total Number of lesson and Search Lessons by name */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="font-bold text-xl md:text-2xl mb-2">
              Public Lessons{" "}
              <span className="numberFont">
                ({lessons.length < 10 ? `0${lessons.length}` : lessons.length})
              </span>
            </h2>

            <label className="input input-bordered flex items-center gap-2 w-full md:w-80">
              <BiSearchAlt2 size={18} />
              <input
                type="search"
                placeholder="Search lessons..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full"
              />
            </label>
          </div>

          {/*  Filters & Sort */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-4 flex-1">
              {/* Category */}
              <select
                className="select select-bordered"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">All Categories</option>
                <option value="personalGrowth">Personal Growth</option>
                <option value="career">Career</option>
                <option value="relationships">Relationships</option>
                <option value="mindset">Mindset</option>
                <option value="mistakesLearned">Mistakes Learned</option>
              </select>
              {/* Emotional Tone */}
              <select
                className="select select-bordered"
                value={filters.emotionalTone}
                onChange={(e) =>
                  setFilters({ ...filters, emotionalTone: e.target.value })
                }
              >
                <option value="">All Emotions</option>
                <option value="sad">Sad</option>
                <option value="gratitude">Gratitude</option>
                <option value="motivational">Motivational</option>
                <option value="realization">Realization</option>
              </select>

              {/* Reset */}
              {(filters.category || filters.emotionalTone || searchText) && (
                <button
                  onClick={handleResetFilters}
                  className=" flex items-center gap-2 cursor-pointer px-5 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-[#eef5f3] border-[#d9e7e3] hover:bg-[#e7f0ff] hover:border-[#4582f3] hover:text-[#4582f3]"
                >
                  <FiRefreshCcw size={14} />
                </button>
              )}
            </div>

            {/*  Sort */}
            <div>
              <select
                className="select select-bordered"
                value={`${sort}-${order}`}
                onChange={(e) => {
                  const [s, o] = e.target.value.split("-");
                  setSort(s);
                  setOrder(o);
                }}
              >
                <option value="createdAt-desc">Newest</option>
                <option value="createdAt-asc">Oldest</option>
                <option value="favoritesCount-desc">Most Saved</option>
                <option value="favoritesCount-asc">Least Saved</option>
              </select>
            </div>
          </div>

          {/*  Empty State */}
          {lessons.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">
                No lessons found 😕
              </h3>
              <p className="text-gray-600">
                Try changing or resetting your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className=" flex items-center gap-2 cursor-pointer px-5 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-[#eef5f3] border-[#d9e7e3] hover:bg-[#e7f0ff] hover:border-[#4582f3] hover:text-[#4582f3] m-auto mt-5"
              >
                <FiRefreshCcw size={14} /> Clear All Filter
              </button>
            </div>
          )}

          {/*  Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, ind) => (
              <LessonCard key={ind} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
            {/* Prev */}
            <button
              disabled={currentPage === 0}
              onClick={() => setSkip((prev) => prev - limit)}
              className="px-3 py-1.5 border rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => setSkip(page * limit)}
                className={`px-3 py-1.5 border rounded cursor-pointer ${
                  currentPage === page ? "bg-primary text-white" : "bg-white"
                }`}
              >
                {page + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => setSkip((prev) => prev + limit)}
              className="px-3 py-1.5 border rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PublicLessons;
