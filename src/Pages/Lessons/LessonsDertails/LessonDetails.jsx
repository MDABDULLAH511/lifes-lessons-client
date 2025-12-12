import React from "react";
import Container from "../../../Components/Container";
import LessonCard from "../LessonCard";
import LessonComment from "./LessonComment";
import LessonContent from "./LessonContent";
import LessonInfo from "./LessonInfo";
import RelatedLesson from "./RelatedLesson";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

const LessonDetails = () => {
  // Load Lesson
  const axiosInstance = useAxios();
  const { id } = useParams();

  //Load Lesson by ID
  const { data: lesson = [] } = useQuery({
    queryKey: ["lessons", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/lessons/${id}`);
      return res.data;
    },
  });

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-15 md:py-20 grid grid-cols-12 gap-y-5 md:gap-10">
          {/* Left Side  */}
          <div className="col-span-12 lg:col-span-8 space-y-5 md:space-y-10">
            {/* Lesson Basic Details */}
            <LessonContent lesson={lesson} />

            {/* Lesson Comment Section  */}
            <LessonComment lesson={lesson} />
          </div>

          {/* Right Side */}
          <div className="col-span-12 lg:col-span-4 space-y-5 md:space-y-10">
            <LessonInfo lesson={lesson} />
          </div>
        </div>

        {/* Related lessons */}
        <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
          <RelatedLesson lesson={lesson} />
        </div>
      </Container>
    </div>
  );
};

export default LessonDetails;
