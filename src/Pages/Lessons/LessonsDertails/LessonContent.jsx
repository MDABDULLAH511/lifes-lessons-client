import React from "react";
import FeaturedImagePlaceholder from "../../../assets/lessonPlaceholder.png";
import { BsCalendar2Date } from "react-icons/bs";
import { MdCreate } from "react-icons/md";
import FavoriteButton from "./FavoriteButton";
import { FaShareAlt } from "react-icons/fa";

const LessonContent = ({ lesson }) => {
  console.log(lesson);
  return (
    <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
      {/* Lesson Title and date*/}
      <div>
        <h2 className="font-bold text-xl md:text-3xl mb-2">
          {lesson.lessonTitle}
        </h2>

        {/* Creation and Last update Date */}
        <div className="flex justify-center md:justify-start flex-wrap gap-3 text-xs md:text-sm  font-medium capitalize bg-indigo-100 text-indigo-600 px-2 py-1 md:px-3 md:py-2 w-fit rounded-sm">
          {/* Update */}
          <span className="flex gap-2 items-center numberFont">
            <MdCreate /> Last Update:{" "}
            {lesson.lastUpdatedDate
              ? new Date(lesson.lastUpdatedDate).toDateString()
              : "Not update yet!"}
          </span>

          {/* create */}
          <span className="flex gap-2 items-center numberFont">
            <BsCalendar2Date /> Created:{" "}
            {new Date(lesson.createdAt).toDateString()}
          </span>
        </div>
      </div>

      {/* Lesson Featured Image */}
      <div>
        <img
          src={
            lesson.lessonImage ? lesson.lessonImage : FeaturedImagePlaceholder
          }
          alt=""
          className="w-full h:40 md:h-125 rounded-lg"
        />
      </div>

      {/* Category | Emotional Tone |  Visibility  */}
      <div className="flex flex-wrap gap-1.5 md:gap-3 text-xs md:text-sm  font-medium capitalize">
        <span className="px-2 py-1 md:px-3 md:py-2 bg-blue-100 text-blue-600 rounded-sm">
          Category: {lesson.category}
        </span>
        <span className="px-2 py-1 md:px-3 md:py-2 bg-purple-100 text-purple-600 rounded-sm">
          Emotional Tone: {lesson.emotionalTone}
        </span>
        <span className="px-2 py-1 md:px-3 md:py-2 bg-green-100 text-green-600 rounded-sm">
          Visibility: {lesson.privacy}
        </span>
      </div>

      {/* Lesson Description */}
      <div>
        <h2 className="font-bold text-xl md:text-2xl mb-2">Description:</h2>
        <p>{lesson.lessonDesc}</p>
      </div>

      {/* Interaction Buttons */}
      <div className="mt-10 flex flex-wrap justify-between gap-5">
        <FavoriteButton />

        {/* Like Button */}
        <button className="flex items-center gap-2 px-5 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 shadow-sm transition">
          <span className="text-lg">❤️</span>
          <span className="font-medium">Like</span>
        </button>

        {/* Report Button */}
        <button className="flex items-center gap-2 px-5 py-1 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 shadow-sm transition">
          <span className="text-lg">🚩</span>
          <span className="font-medium">Report</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 shadow-sm transition">
          <FaShareAlt className="text-lg" />
          <span className="font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
