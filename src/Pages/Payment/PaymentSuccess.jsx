import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return <div>Payment Success : {paymentInfo.transactionId}</div>;
};

export default PaymentSuccess;
