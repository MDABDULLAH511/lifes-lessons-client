import React from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const LessonComment = ({ lesson }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //Load Comment for this Lesson (by id)
  const { refetch, data: comments = [] } = useQuery({
    queryKey: ["comments", lesson._id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments?lessonId=${lesson._id}`);
      return res.data;
    },
  });

  // Handle Post a Comment
  const handleAddLesson = async (data) => {
    // Save comment to the database
    if (user) {
      const commentText = {
        ...data,
        lessonId: lesson._id,
        commenterName: user.displayName,
        commenterPhoto: user.photoURL,
        data: new Date(),
      };
      await axiosSecure.post("/comments", commentText).then((res) => {
        if (res.data.insertedId) {
          refetch();
          toast("Comment post Successfully 🎉");
          reset();
        }
      });
    } else {
      toast.warn("Please log in to post a comment.", {
        position: "top-left",
        theme: "dark",
      });
      reset();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5 ">
      <div>
        <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
          Leave a comment
        </h2>
      </div>

      {/* Comment Box */}
      <div>
        <form
          onSubmit={handleSubmit(handleAddLesson)}
          className="w-full p-4 bg-white rounded-xl shadow"
        >
          {/* <!-- Input Box --> */}
          <div className="rounded-lg p-3">
            <textarea
              name="message"
              className="w-full h-20 outline-none resize-none text-gray-800"
              placeholder="Write your reply..."
              {...register("comment", { required: true })}
            ></textarea>
            {errors.comment?.type === "required" && (
              <p className="text-red-500">Type you comment</p>
            )}

            {/* <!-- Action Row --> */}
            <div className="flex items-center justify-between mt-3">
              {/* <!-- Icons --> */}
              <div className="flex items-center gap-4 text-gray-500 text-lg">
                <button type="button" className="font-bold cursor-pointer">
                  B
                </button>
                <button type="button" className="italic cursor-pointer">
                  I
                </button>
                <button type="button" className="underline cursor-pointer">
                  U
                </button>
                <button type="button" className="line-through cursor-pointer">
                  S
                </button>
                <button type="button" className="text-xl cursor-pointer">
                  😊
                </button>
              </div>

              {/* <!-- Submit Button --> */}
              <button
                type="submit"
                className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow"
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
        {comments.length == 0 && (
          <h3 className="text-sm font-medium">
            No comments yet. Be the first to comment!
          </h3>
        )}

        {comments.map((comment, ind) => (
          <div className="flex items-start gap-3" key={ind}>
            {/* comment user */}
            <div className="relative">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {comment.commenterPhoto ? (
                  <img
                    src={comment.commenterPhoto}
                    alt=""
                    className="rounded-full w-10 h-10"
                  />
                ) : (
                  <FaUser size={20} />
                )}
              </div>

              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>

            {/* commenter name and date */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row itms-stat justify-between md:items-center">
                <h3 className="text-sm font-medium">
                  {comment.commenterName ? comment.commenterName : "Unknown"}
                </h3>
                {/* date */}
                <span className="text-xs text-gray-500 numberFont flex flex-wrap gap-2">
                  <span className="border-r-2 border-gray-300 pr-2">
                    {new Date(comment.data).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(comment.data).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </span>
              </div>

              <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonComment;
