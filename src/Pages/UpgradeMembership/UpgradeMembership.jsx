import React from "react";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Container from "../../Components/Container";
import { FiCheck, FiX, FiStar, FiZap } from "react-icons/fi";

const UpgradeMembership = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: users = [] } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handlePayment = async () => {
    const userInfo = {
      email: users[0].email,
      _id: users[0]._id,
    };

    // Then send it
    const res = await axiosSecure.post("/create-checkout-session", userInfo);
    window.location.assign(res.data.url);
  };

  return (
    <section className="py-10 md:py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-10 lg:w-8/12 mx-auto">
          <h2 className="font-bold text-xl md:text-4xl">
            Simple & Transparent Pricing
          </h2>
          <p className="font-semibold my-3">
            Start for free and upgrade once for lifetime access to premium
            lessons and exclusive features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
            <p className="text-gray-500 mb-4 text-sm">
              Perfect for exploring life lessons.
            </p>

            <div className="text-3xl font-bold mb-6 numberFont">৳0</div>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Read public lessons
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Save favorite lessons
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Create limited lessons
              </li>
              <li className="flex items-center gap-2">
                <FiX className="text-red-400" />
                Premium lesson creation
              </li>
              <li className="flex items-center gap-2">
                <FiX className="text-red-400" />
                Priority listing
              </li>
              <li className="flex items-center gap-2">
                <FiX className="text-red-400" />
                Ad-free experience
              </li>
            </ul>

            <button
              disabled
              className="mt-6 w-full py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            {/* Badge */}
            <div className="absolute -top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <FiStar size={14} /> Best Value
            </div>

            <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>
            <p className="text-indigo-100 mb-4 text-sm">
              Full access to everything, forever.
            </p>

            <div className="text-3xl font-bold mb-1 numberFont">৳1500</div>
            <p className="text-sm text-indigo-200 mb-6">
              One-time payment · Lifetime access
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiCheck />
                Unlimited lesson creation
              </li>
              <li className="flex items-center gap-2">
                <FiCheck />
                Create premium lessons
              </li>
              <li className="flex items-center gap-2">
                <FiCheck />
                Priority listing on homepage
              </li>
              <li className="flex items-center gap-2">
                <FiCheck />
                Ad-free experience
              </li>
              <li className="flex items-center gap-2">
                <FiCheck />
                Advanced analytics & insights
              </li>
              <li className="flex items-center gap-2">
                <FiCheck />
                Early access to new features
              </li>
            </ul>

            {/* Stripe Button */}
            <button
              onClick={handlePayment}
              className="mt-6 w-full py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiZap /> Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Secure payment powered by Stripe. No recurring charges.
        </p>
      </Container>
    </section>
  );
};

export default UpgradeMembership;
