import React from "react";
import { NavLink } from "react-router";

const MyNavLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-primary text-[16px] hover:bg-transparent font-semibold  p-0"
          : `${className} text-secondary text-[16px] hover:text-primary hover:bg-transparent font-semibold p-0  duration-300`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyNavLink;
