import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";
import LessonCard from "../Lessons/LessonCard";
import Container from "../../Components/Container";

const FeaturedLessons = () => {
  const axiosInstance = useAxios();

  //Load All Public Lesson
  const limit = 3;
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", limit],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons?privacy=public&featured=true&limit=${limit}`
      );
      return res.data;
    },
  });

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-10 lg:w-8/12 mx-auto">
            <h2 className="font-bold text-xl md:text-4xl">
              Featured Life Lessons
            </h2>
            <p className="font-semibold my-3">
              Explore lessons carefully selected to inspire, motivate, and guide
              you through life’s journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lessons.map((lesson, ind) => (
              <LessonCard key={ind} lesson={lesson}></LessonCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedLessons;
