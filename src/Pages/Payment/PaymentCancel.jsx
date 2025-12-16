import React from "react";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import Container from "../../Components/Container";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <section className="py-10 md:py-20 flex items-center justify-center h-[90vh]">
      <Container>
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md m-auto text-center">
          <FiAlertCircle className="text-yellow-500 text-6xl mx-auto mb-4" />

          <h1 className="text-2xl font-bold mb-3">Payment Cancelled</h1>

          <p className="text-gray-600 text-sm mb-6">
            Your payment was not completed. No charges were made. You can try
            again anytime to unlock Premium features.
          </p>

          <div className="space-y-3">
            <Link
              to="/upgrade-membership"
              className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Try Again
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition"
            >
              <FiArrowLeft /> Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PaymentCancel;
