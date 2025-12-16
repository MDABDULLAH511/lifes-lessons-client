import React from "react";
import { Link } from "react-router";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg m-auto text-center bg-white rounded-2xl shadow-lg p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-red-500">
          <FiAlertTriangle className="text-6xl mx-auto mb-4" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>

        {/* Subtitle */}
        <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for doesn’t exist or may have been
          moved. Please check the URL or return to the homepage.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition"
        >
          <FiHome />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
