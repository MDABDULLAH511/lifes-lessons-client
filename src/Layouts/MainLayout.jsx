import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "../Components/Footer";
import LoadingSpinner from "../Components/LoadingSpinner";

const MainLayout = () => {
  const { state } = useNavigate;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        {state == "Loading" ? <LoadingSpinner /> : <Outlet></Outlet>}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
