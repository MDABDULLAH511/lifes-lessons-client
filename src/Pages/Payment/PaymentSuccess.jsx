import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth";

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

  return <div>Payment Success : {paymentInfo.transactionId}</div>;
};

export default PaymentSuccess;
