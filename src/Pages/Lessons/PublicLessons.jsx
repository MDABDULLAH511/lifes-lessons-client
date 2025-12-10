import React from "react";
import heroBG from "../../assets/public_lesson_hero_bg.jpg";
import Container from "../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { BiSearchAlt2 } from "react-icons/bi";
import LessonCard from "./LessonCard";

const PublicLessons = () => {
  const axiosInstance = useAxios();

  //Load All Public Lesson
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/lessons?privacy=public`);
      return res.data;
    },
  });

  console.log(lessons);
  return (
    <div>
      {/* Public lesson page Banner */}
      <div
        className="relative w-full h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBG})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <h2 className="font-bold text-xl md:text-4xl">All Public Lessons</h2>
          <p className="font-semibold my-3">
            Discover meaningful life lessons shared by people from around the
            world.
          </p>
        </div>
      </div>

      <Container>
        <div className="py-20 space-y-10">
          {/* Total Number of lesson and Search Lessons by name */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="font-bold text-xl md:text-2xl mb-2">
              Public Lessons{" "}
              <span className="numberFont">
                ({lessons.length < 10 ? `0${lessons.length}` : lessons.length})
              </span>
            </h2>

            <label className="input">
              <BiSearchAlt2 size={18} />

              <input type="search" required placeholder="Search" />
            </label>
          </div>

          {/* All Public Lesson Card Item */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4   gap-6">
            {lessons.map((lesson, ind) => (
              <LessonCard key={ind} lesson={lesson} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PublicLessons;

// Lesson Title
// Short Description Preview
// Category
// Emotional Tone
// Creator Info (name + photo)
// Access level
// Created Date
// See Details Button → (opens full Life Lesson Details page)
