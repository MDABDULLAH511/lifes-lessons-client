import React from "react";
import Container from "../../../Components/Container";
import FeaturedImagePlaceholder from "../../../assets/lessonPlaceholder.png";
import lessonAds from "../../../assets/lessonAds.png";
import { BsCalendar2Date } from "react-icons/bs";
import { MdCreate } from "react-icons/md";
import { useParams } from "react-router";
import FavoriteButton from "./FavoriteButton";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import LessonCard from "../LessonCard";

const LessonDetails = () => {
  const axiosInstance = useAxios();

  const { id } = useParams();
  console.log(id);

  //Load All Public Lesson
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/lessons?privacy=public`);
      return res.data;
    },
  });

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-15 md:py-20 grid grid-cols-12 gap-y-5 md:gap-10">
          {/* Left Side  */}
          <div className="col-span-12 lg:col-span-8 space-y-5 md:space-y-10">
            {/* Lesson Details */}
            <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
              {/* Lesson Title and date*/}
              <div>
                <h2 className="font-bold text-xl md:text-3xl mb-2">
                  Healing Takes Time, Not Deadlines
                </h2>

                {/* Creation and Last update Date */}
                <div className="flex justify-center md:justify-start flex-wrap gap-3 text-xs md:text-sm  font-medium capitalize bg-indigo-100 text-indigo-600 px-2 py-1 md:px-3 md:py-2 w-fit rounded-sm">
                  {/* Update */}
                  <span class="flex gap-2 items-center numberFont">
                    <MdCreate /> Last Update: 10/23/4040
                  </span>

                  {/* create */}
                  <span class="flex gap-2 items-center numberFont">
                    <BsCalendar2Date /> Created: 10/23/4040
                  </span>
                </div>
              </div>

              {/* Lesson Featured Image */}
              <div>
                <img
                  src={FeaturedImagePlaceholder}
                  alt=""
                  className="w-full h:40 md:h-125 rounded-lg"
                />
              </div>

              {/* Category | Emotional Tone |  Visibility  */}
              <div class="flex flex-wrap gap-1.5 md:gap-3 text-xs md:text-sm  font-medium capitalize">
                <span class="px-2 py-1 md:px-3 md:py-2 bg-blue-100 text-blue-600 rounded-sm">
                  Category: personal Growth
                </span>
                <span class="px-2 py-1 md:px-3 md:py-2 bg-purple-100 text-purple-600 rounded-sm">
                  Emotional Tone: motivational
                </span>
                <span class="px-2 py-1 md:px-3 md:py-2 bg-green-100 text-green-600 rounded-sm">
                  Visibility: Public
                </span>
              </div>

              {/* Lesson Description */}
              <div>
                <h2 className="font-bold text-xl md:text-2xl mb-2">
                  Description:
                </h2>
                <p>
                  I kept telling myself to “move on quickly,” but emotions don’t
                  work like that. Healing is not linear—some days feel light,
                  others feel heavy. The moment I stopped rushing myself, the
                  process became more natural. Time doesn’t heal everything, but
                  patience makes it easier.
                </p>
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

            {/* Lesson Comment Section  */}
            <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5 ">
              <div>
                <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
                  Leave a comment
                </h2>
              </div>

              {/* Comment Box */}
              <div>
                <form class="w-full p-4 bg-white rounded-xl shadow">
                  {/* <!-- Input Box --> */}
                  <div class="rounded-lg p-3">
                    <textarea
                      name="message"
                      class="w-full h-20 outline-none resize-none text-gray-800"
                      placeholder="Write your reply..."
                      required
                    ></textarea>

                    {/* <!-- Action Row --> */}
                    <div class="flex items-center justify-between mt-3">
                      {/* <!-- Icons --> */}
                      <div class="flex items-center gap-4 text-gray-500 text-lg">
                        <button type="button" class="font-bold cursor-pointer">
                          B
                        </button>
                        <button type="button" class="italic cursor-pointer">
                          I
                        </button>
                        <button type="button" class="underline cursor-pointer">
                          U
                        </button>
                        <button
                          type="button"
                          class="line-through cursor-pointer"
                        >
                          S
                        </button>
                        <button type="button" class="text-xl cursor-pointer">
                          😊
                        </button>
                      </div>

                      {/* <!-- Submit Button --> */}
                      <button
                        type="submit"
                        class="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow"
                      >
                        <IoIosSend size={22} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div>
                <h2 className="mt-10 font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
                  Others comment
                </h2>
              </div>

              {/* Each Comment */}
              <div className="flex flex-col gap-5">
                <div class="flex items-start gap-3">
                  <div class="relative">
                    {/* comment user */}
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser size={20} />
                    </div>

                    <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>

                  <div class="flex-1">
                    <div class="flex justify-between items-center">
                      <h3 class="text-sm font-medium">Yassine Zanina</h3>
                      <span class="text-xs text-gray-500">
                        Wednesday, March 13th at 2:45pm
                      </span>
                    </div>

                    <p class="text-sm text-gray-700 mt-1">
                      I've been using this product for a few days now and I'm
                      really impressed! The interface is intuitive and easy to
                      use, and the features are exactly what I need to
                      streamline my workflow.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="relative">
                    {/* comment user */}
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser size={20} />
                    </div>

                    <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>

                  <div class="flex-1">
                    <div class="flex justify-between items-center">
                      <h3 class="text-sm font-medium">Yassine Zanina</h3>
                      <span class="text-xs text-gray-500">
                        Wednesday, March 13th at 2:45pm
                      </span>
                    </div>

                    <p class="text-sm text-gray-700 mt-1">
                      I've been using this product for a few days now and I'm
                      really impressed! The interface is intuitive and easy to
                      use, and the features are exactly what I need to
                      streamline my workflow.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="relative">
                    {/* comment user */}
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser size={20} />
                    </div>

                    <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>

                  <div class="flex-1">
                    <div class="flex justify-between items-center">
                      <h3 class="text-sm font-medium">Yassine Zanina</h3>
                      <span class="text-xs text-gray-500">
                        Wednesday, March 13th at 2:45pm
                      </span>
                    </div>

                    <p class="text-sm text-gray-700 mt-1">
                      I've been using this product for a few days now and I'm
                      really impressed! The interface is intuitive and easy to
                      use, and the features are exactly what I need to
                      streamline my workflow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-span-12 lg:col-span-4 space-y-5 md:space-y-10">
            <div className="sticky top-24 space-y-5 md:space-y-10">
              {/* Stats & Engagement */}
              <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
                <div>
                  <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
                    Stats & Engagement
                  </h2>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="numberFont">
                      <strong>Likes:</strong> 870
                    </li>
                    <li className="numberFont">
                      <strong>Favorites:</strong> 220
                    </li>
                    <li className="numberFont">
                      <strong>Views:</strong> 5.4k
                    </li>
                    <li>
                      <strong>Visibility:</strong> Public
                    </li>
                    <li>
                      <strong>Access Level:</strong> Free
                    </li>
                  </ul>
                </div>
              </div>

              {/* Author Info */}
              <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5">
                <div>
                  <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
                    Author Info
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100?img=18"
                    className="w-18 h-18 rounded-lg shadow"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Alex Johnson</p>
                    <p className="text-gray-500 text-sm numberFont">
                      Total Lessons Created:
                    </p>
                    <button className="text-blue-600 hover:underline text-sm mt-1">
                      View all lessons →
                    </button>
                  </div>
                </div>
              </div>

              {/* Lesson Ads Image */}
              <div>
                <img
                  src={lessonAds}
                  alt=""
                  className="w-full rounded-lg shadow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* related 6 lessons */}
        <div className="pb-15 md:pb-20">
          <div>
            <h2 className="font-bold text-xl md:text-2xl mb-5 pb-1 border-b border-gray-300">
             Similar Lessons by Category
            </h2>
          </div>
          {/* All Public Lesson Card Item */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4   gap-6">
            {lessons.map((lesson, ind) => (
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

export default LessonDetails;
