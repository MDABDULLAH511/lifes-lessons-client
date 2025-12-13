import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios";
import LessonCard from "../LessonCard";

const RelatedLesson = ({ lesson }) => {
  const { category, emotionalTone } = lesson;
  const axiosInstance = useAxios();
  const limit = 4;

  //Load 4 Lesson By Category
  const { data: catLessons = [] } = useQuery({
    queryKey: ["lessons", category, limit],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons?category=${category}&privacy=public&limit=${limit}`
      );
      return res.data;
    },
  });

  //Load 4 Lesson By Emotional Tone
  const { data: toneLessons = [] } = useQuery({
    queryKey: ["lessons", emotionalTone, limit],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons?emotionalTone=${emotionalTone}&privacy=public&limit=${limit}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <div className="pb-15 md:pb-20">
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-5 pb-1 border-b border-gray-300">
            Similar Lessons by Category
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4   gap-6">
          {catLessons.map((lesson, ind) => (
            <LessonCard key={ind} lesson={lesson} />
          ))}
        </div>
      </div>
      {/* related 6 lessons */}

      <div className="pb-15 md:pb-20">
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-5 pb-1 border-b border-gray-300">
            Lessons with a Similar Emotional Tone
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4   gap-6">
          {toneLessons.map((lesson, ind) => (
            <LessonCard key={ind} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedLesson;
