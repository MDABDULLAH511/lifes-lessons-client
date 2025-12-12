import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const LessonComment = () => {
  return (
    <div className=" p-3 md:p-5 lg:p-10 shadow rounded-xl bg-white space-y-5 ">
      <div>
        <h2 className="font-bold text-xl md:text-2xl mb-2 pb-1 border-b border-gray-300">
          Leave a comment
        </h2>
      </div>

      {/* Comment Box */}
      <div>
        <form className="w-full p-4 bg-white rounded-xl shadow">
          {/* <!-- Input Box --> */}
          <div className="rounded-lg p-3">
            <textarea
              name="message"
              className="w-full h-20 outline-none resize-none text-gray-800"
              placeholder="Write your reply..."
              required
            ></textarea>

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
        <div className="flex items-start gap-3">
          <div className="relative">
            {/* comment user */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser size={20} />
            </div>

            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Yassine Zanina</h3>
              <span className="text-xs text-gray-500">
                Wednesday, March 13th at 2:45pm
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              I've been using this product for a few days now and I'm really
              impressed! The interface is intuitive and easy to use, and the
              features are exactly what I need to streamline my workflow.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="relative">
            {/* comment user */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser size={20} />
            </div>

            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Yassine Zanina</h3>
              <span className="text-xs text-gray-500">
                Wednesday, March 13th at 2:45pm
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              I've been using this product for a few days now and I'm really
              impressed! The interface is intuitive and easy to use, and the
              features are exactly what I need to streamline my workflow.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="relative">
            {/* comment user */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser size={20} />
            </div>

            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Yassine Zanina</h3>
              <span className="text-xs text-gray-500">
                Wednesday, March 13th at 2:45pm
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              I've been using this product for a few days now and I'm really
              impressed! The interface is intuitive and easy to use, and the
              features are exactly what I need to streamline my workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonComment;
