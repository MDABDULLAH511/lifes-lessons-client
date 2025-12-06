import React from "react";
import logo from "../assets/life's_lessons_logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flax items-center gap-3">
      <Link to="/" className="flex justify-start items-center gap-3">
        <img src={logo} alt="" className="w-10 md:w-[50px] lg:w-[50px]" />
        <p className="text-secondary text-[18px] md:text-[22px] font-extrabold">
          Life's <span className="text-primary">Lessons</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;
