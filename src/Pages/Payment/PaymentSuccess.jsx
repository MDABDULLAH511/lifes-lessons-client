import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth";
import { FiCheckCircle, FiHome } from "react-icons/fi";
import Container from "../../Components/Container";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });

          queryClient.invalidateQueries(["userStatus", user.email]);
        });
    }
  }, [sessionId, axiosSecure, queryClient, user]);

  return (
    <section className="py-10 md:py-20 flex items-center justify-center h-[90vh]">
      <Container>
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md m-auto text-center">
          <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

          <h1 className="text-2xl font-bold mb-3">Payment Successful 🎉</h1>

          <p className="text-gray-600 text-sm mb-6">
            Thank you for upgrading to{" "}
            <span className="font-semibold">Premium</span>. You now have
            lifetime access to all premium lessons and features.
          </p>

          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition"
            >
              <FiHome /> Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PaymentSuccess;
