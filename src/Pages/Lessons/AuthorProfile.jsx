import React from "react";
import { useParams } from "react-router";
import Container from "../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import userIcon from "../../assets/user.png";
import { FaCrown } from "react-icons/fa";
import LessonCard from "./LessonCard";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AuthorProfile = () => {
  const { email } = useParams();
  const axiosInstance = useAxios();

  // Load Creator Data
  const { data: user = {}, isLoading: currentUserLoading } = useQuery({
    queryKey: ["user-by-email", email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${email}`);
      return res.data[0];
    },
    enabled: !!email,
  });

  // Load all public Lesson by Creator
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons-by-email", email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons?email=${email}&privacy=public`
      );
      return res.data;
    },
  });

  if (currentUserLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-15 md:py-20 grid grid-cols-12 gap-y-5 md:gap-10">
          {/* Left Side (Profile)*/}

          <div className="col-span-12 lg:col-span-4 space-y-5 md:space-y-10">
            <div className="sticky top-24 space-y-5 md:space-y-10">
              <div className="p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5 flex flex-col items-center gap-5">
                {/* Author Image */}
                <div>
                  <img
                    tabIndex={0}
                    src={user.photoURL ? user.photoURL : userIcon}
                    alt=""
                    className={`w-35 h-35 rounded-full bg-primary cursor-pointer${
                      user.photoURL ? "p-0.5" : "p-1.5"
                    }`}
                  />
                </div>
                {/* User Type */}
                <div>
                  {user.isPremium === true ? (
                    <span class="flex gap-2 items-center font-bold text-secondary/80">
                      <FaCrown size={20} color="#4681f7" />
                      Premium User
                    </span>
                  ) : (
                    <span className="font-bold text-secondary/80 text-center">
                      Free User
                    </span>
                  )}
                </div>

                {/* Name, Total Lesson, About */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between font-semibold">
                    <h5>Name:</h5>
                    <h5>{user.displayName}</h5>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <h5>Total created lesson:</h5>
                    <h5 className="numberFont">{lessons.length}</h5>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">About User</h5>
                    {user.profileBio ? (
                      <p>{user.profileBio}</p>
                    ) : (
                      <p>
                        This user is an active member of our learning community.
                        They share insights, explore new lessons, and continue
                        to grow through meaningful learning experiences.
                        Depending on their activity and contributions, their
                        profile may include published lessons, saved favorites,
                        feedback, and other interactions within the platform.
                        Whether they are a learner, creator, or both, this
                        profile represents their journey of knowledge,
                        creativity, and personal development.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side  (Lessons)*/}
          <div className="col-span-12 lg:col-span-8 space-y-5 md:space-y-10">
            <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5 ">
              <div>
                <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1">
                  All created lesson
                </h2>
              </div>

              {/* All Lesson created by this Author */}
              <div className="grid md:grid-cols-2  gap-6">
                {lessons.map((lesson, index) => (
                  <LessonCard key={index} lesson={lesson} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthorProfile;
