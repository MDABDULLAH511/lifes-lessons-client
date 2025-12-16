import React from "react";
import { Link } from "react-router";
import { FiCheckCircle, FiHome } from "react-icons/fi";

const Settings = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg m-auto text-center bg-white rounded-2xl shadow-lg p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-green-500">
          <FiCheckCircle className="text-6xl mx-auto mb-4" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          All Set!
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl font-semibold mb-4">
          No Settings Needed
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Everything is already configured and working perfectly.
          There’s nothing you need to adjust at the moment.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition"
        >
          <FiHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Settings;
