import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Container from "../../Components/Container";
import MostSavedLessonCard from "./MostSavedLessonCard";
import { FiStar } from "react-icons/fi";
import LoadingSpinner from "../../Components/LoadingSpinner";
const MostSavedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lesson/most-saved");
      return res.data;
    },
  });


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-10 lg:w-8/12 mx-auto">
            <h2 className="font-bold text-xl md:text-4xl">
              Most saved Lessons
            </h2>
            <p className="font-semibold my-3">
              Explore the most saved lessons—insights that have inspired and
              guided our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lessons.map((lesson, ind) => (
              <MostSavedLessonCard
                key={ind}
                lesson={lesson}
              ></MostSavedLessonCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MostSavedLessons;
